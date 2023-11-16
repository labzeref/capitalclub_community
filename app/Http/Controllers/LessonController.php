<?php

namespace App\Http\Controllers;

use App\Enums\QuizTypeEnum;
use App\Http\Requests\StoreLessonNoteRequest;
use App\Http\Requests\SubmitQuizRequest;
use App\Http\Requests\UpdateLessonProgressRequest;
use App\Http\Resources\CourseResource;
use App\Http\Resources\Lesson\LessonResource;
use App\Http\Resources\ModuleResource;
use App\Http\Resources\QuizResource;
use App\Models\Lesson;
use App\Models\LessonWatchTime;
use App\Models\Module;
use App\Models\Quiz;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Response;
use Inertia\ResponseFactory;

class LessonController extends Controller
{
    /**
     * Show the lesson play screen
     *
     * @return Response|ResponseFactory
     */
    public function play(Lesson $lesson)
    {
        $user = _user();
        $user->load('enrolledLessons');

        $course = $lesson->course()->with([
            'lessons' => fn($query) => $query->orderBy('serial_number')->with([
                'resources',
                'enrolledUsers',
                'note' => fn($query) => $query->where('user_id', _user()->id),
            ]),
        ])->first();

        if (! $user->hasEnrolledInCourse($course->id)) {
            $user->enrolledInCourse($course);
        }

        $showGuestName = $course->title == 'MONEY TALKS';

        if (!$course->strict) {
            $user->updateLastVisitLessonData(courseId: $course->id, lessonId: $lesson->id);
        }

        $modules = ModuleResource::collection($course->modules);

        $lesson = new LessonResource($course->lessons->where('id', $lesson->id)->first());
        $course = new CourseResource($course);

        $takeReview = $user->hasCompletedCourse($course->id) && !$course->hasReviewForUser($user->id);

        return inertia('Academy/Lesson', compact(['course', 'lesson', 'takeReview', 'modules', 'showGuestName']));
    }

    /**
     * Store the notes for the lessons
     *
     * @return JsonResponse
     */
    public function storeNote(StoreLessonNoteRequest $request, Lesson $lesson)
    {
        $lesson->note()->updateOrCreate([
            'user_id' => _user()->id,
        ], $request->validated());

        return $this->sendResponse([]);
    }

    /**
     * Completing the lesson if quiz is not exist
     * otherwise redirect to quiz
     *
     * @return RedirectResponse|Response|ResponseFactory
     */
    public function complete(Lesson $lesson)
    {
        $user = _user();
        $nextLesson = $lesson->nextLesson();

        if (!$lesson->course->strict) {
            if ($nextLesson) {
                return to_route('lessons.play', $nextLesson->id);
            } else {
                return back();
            }
        }

        if (!$nextLesson && $lesson->quizzes()->doesntExist()) {
            $lesson->complete($user->id);
            $lesson->course()->setEagerLoads([])->first()->updateProgressForUser($user);

            return back()->with('success', __('Course is completed'));
        } elseif ($nextLesson && $lesson->quizzes()->doesntExist()) {
            $lesson->complete($user->id);
            $user->enrolledInLesson($nextLesson->id, $nextLesson->course->id);

            return to_route('lessons.play', $nextLesson->id);
        }

        $lessonNumber = $lesson->getNumber();

        $quiz = QuizResource::collection(
            $lesson->quizzes()->with('answers')->get()
        );

        $lesson = new LessonResource($lesson);

        return inertia('Academy/Quiz', compact(['quiz', 'lesson', 'lessonNumber']));
    }

    /**
     * If the quiz is skip able then redirect to the next lesson
     *
     * @return RedirectResponse
     */
    public function skipQuiz(Lesson $lesson)
    {
        $user = _user();
        $course = $lesson->course()->setEagerLoads([])->first();
        $nextLesson = $lesson->nextLesson();

        if (!$lesson->quiz_skipable) {
            return back()->with('info', __('Quiz is not skip able.'));
        }

        $lesson->complete($user->id);
        $lesson->updateQuizResultForUser($user->id, null, true);
        $course->updateProgressForUser($user);

        if ($nextLesson) {
            $user->enrolledInLesson($nextLesson->id, $course->id);

            return to_route('lessons.play', $nextLesson->id)
                ->with('success', __('Quiz skipped and new lesson unlocked.'));
        }

        return to_route('lessons.play', $lesson)
            ->with('success', __('Course is completed.'));
    }

    /**
     * Calculating the quiz result if not pass then redirect back and
     * if pass then redirect to the next lesson and store result
     *
     * @return RedirectResponse
     */
    public function submitQuiz(SubmitQuizRequest $request, Lesson $lesson)
    {
        DB::beginTransaction();

        try {
            $user = _user();
            $course = $lesson->course()->setEagerLoads([])->first();
            $nextLesson = $lesson->nextLesson();
            $quizIds = Arr::pluck($request->quiz_answers, 'quiz_id');
            $quizzes = Quiz::whereIn('id', $quizIds)->get();

            /**
             * Given correct answers count
             */
            $correctAnswers = 0;

            /**
             * Creating poll if quiz type is poll and calculating correct answer
             */
            foreach ($request->quiz_answers as $quizAnswer) {
                $quiz = $quizzes->where('id', $quizAnswer['quiz_id'])->first();

                /**
                 * If quiz type is poll we will not consider it correct answer
                 * else we will calculate correct answer
                 */
                if ($quiz->type == QuizTypeEnum::poll) {
                    $quiz->polling()->updateOrCreate(
                        ['user_id' => $user->id],
                        ['answer_id' => $quizAnswer['answer_id']]
                    );

                    $quiz->updateAnswersPollPercentage();
                } else {
                    if ($quizAnswer['answer_id'] == $quiz->correct_answer_id) {
                        $correctAnswers++;
                    }
                }
            }

            $totalQuiz = $quizzes->where('type', QuizTypeEnum::multiple_choice)->count();

            /**
             * Checking for if all questions were type poll so make it successful
             */
            if ($totalQuiz >= 1) {
                $percentage = round(($correctAnswers / $totalQuiz) * 100);
                $lesson->updateQuizResultForUser($user->id, $percentage);
                $success = $lesson->passing_marks_percentage <= $percentage;
            } else {
                $success = true;
                $lesson->updateQuizResultForUser($user->id, 100);
            }

            if ($success) {
                $lesson->complete($user->id);
                $course->updateProgressForUser($user);

                if ($nextLesson) {
                    $user->enrolledInLesson($nextLesson->id, $course->id);

                } else {

                }
            }

            if ($success && $nextLesson) {
                $backToLessonUrl = route('lessons.play', $nextLesson->id);
            } else {
                $backToLessonUrl = route('lessons.play', $lesson->id);
            }

            $data = [
                'success' => $success,
                'totalQuiz' => $totalQuiz,
                'correctAnswers' => $correctAnswers,
                'backToLessonUrl' => $backToLessonUrl,
            ];

            /**
             * Storing data in session for quiz result page because it is post request
             * can not render a page here
             */
            session(['quizResult' => $data]);
        } catch (\Throwable $throwable) {
            DB::rollBack();

            return back()->with('error', _serverErrorMessage());
        }

        DB::commit();

        if ($nextLesson) {
            return to_route('lesson.quiz-result');
        }

        if ($success) {
            return to_route('lesson.quiz-result')->with('success', __('Course is completed'));
        }

        return to_route('lesson.quiz-result');
    }

    /**
     * Show the quiz result screen
     *
     * @return Response|ResponseFactory
     */
    public function quizResult()
    {
        /**
         * User will land here from submitQuiz function otherwise session will be null,
         * and we will show 404 page
         */
        $data = session('quizResult');

        if (!$data) {
            abort(404);
        }

        $success = $data['success'];
        $totalQuiz = $data['totalQuiz'];
        $correctAnswers = $data['correctAnswers'];
        $backToLessonUrl = $data['backToLessonUrl'];

        return inertia('Academy/Result', compact([
            'success',
            'totalQuiz',
            'correctAnswers',
            'backToLessonUrl',
        ]));
    }

    /**
     * This run after each 5 sec while user watching lesson video,
     * and we save the progress of the video
     *
     * @return JsonResponse
     */
    public function updateProgress(UpdateLessonProgressRequest $request, Lesson $lesson)
    {
        $user = _user();

        LessonWatchTime::updateOrCreate([
            'user_id' => $user->id,
            'lesson_id' => $lesson->id,
        ], [
            'progress' => $request->progress
        ]);

        return $this->sendResponse();
    }
}
