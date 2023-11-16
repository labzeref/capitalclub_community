<?php

namespace App\Http\Controllers;

use App\Enums\QuizTypeEnum;
use App\Http\Requests\StoreLessonNoteRequest;
use App\Http\Requests\SubmitQuizRequest;
use App\Http\Requests\UpdateLessonProgressRequest;
use App\Http\Resources\CourseResource;
use App\Http\Resources\Lesson\LessonResource;
use App\Http\Resources\QuizResource;
use App\Models\Lesson;
use App\Models\Quiz;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class LessonController extends Controller
{
    public function play(Lesson $lesson)
    {
        $user = _user();
        $user->load('enrolledLessons');

        $course = $lesson->course()->with([
            'lessons' => fn ($query) => $query->orderBy('id')->with([
                'enrolledUsers',
                'note' => fn ($query) => $query->where('user_id', _user()->id),
            ]),
        ])->first();

        $lesson = new LessonResource($course->lessons->where('id', $lesson->id)->first());
        $course = new CourseResource($course);

        $takeReview = $user->hasCompletedCourse($course->id) && ! $course->hasReviewForUser($user->id);

        return inertia('Academy/Lesson', compact(['course', 'lesson', 'takeReview']));
    }

    public function storeNote(StoreLessonNoteRequest $request, Lesson $lesson)
    {
        $lesson->note()->updateOrCreate([
            'user_id' => _user()->id,
        ], $request->validated());

        return back();
    }

    public function complete(Lesson $lesson)
    {
        $user = _user();
        $nextLesson = $lesson->nextLesson();

        if (! $nextLesson && $lesson->quizzes()->doesntExist()) {
            $lesson->complete($user->id);
            $lesson->course()->setEagerLoads([])->first()->updateProgressForUser($user);

            return back()->with('success', __('Course is completed'));
        } elseif ($nextLesson && $lesson->quizzes()->doesntExist()) {
            return to_route('lessons.play', $nextLesson->id);
        }

        $lessonNumber = $lesson->getNumber();

        $quiz = QuizResource::collection(
            $lesson->quizzes()->with('answers')->get()
        );

        $lesson = new LessonResource($lesson);

        return inertia('Academy/Quiz', compact(['quiz', 'lesson', 'lessonNumber']));
    }

    public function skipQuiz(Lesson $lesson)
    {
        $user = _user();
        $course = $lesson->course()->setEagerLoads([])->first();
        $nextLesson = $lesson->nextLesson();

        if (! $lesson->quiz_skipable) {
            return back()->with('info', __('Quiz is not skip able.'));
        }

        $lesson->complete($user->id);
        logActivity(
            causedBy: $user,
            performedOn: $lesson,
            log: 'You have complete the lesson .'
        );
        $course->updateProgressForUser($user);

        if ($nextLesson) {
            $user->enrolledInLesson($nextLesson->id, $course->id);
            logActivity(
                causedBy: $user,
                performedOn: $nextLesson,
                log: "You have enrolled in lesson <span class='activity-text'>$lesson->title</span>."
            );

            return to_route('lessons.play', $nextLesson->id)
                ->with('success', __('Quiz skipped and new lesson unlocked.'));
        }

        logActivity(
            causedBy: $user,
            performedOn: $course,
            log: "You have completed the course, <span class='activity-text'>$course->title</span>."
        );

        return to_route('lessons.play', $lesson)
            ->with('success', __('Course is completed.'));
    }

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
                logActivity(
                    causedBy: $user,
                    performedOn: $lesson,
                    log: "You have completed the lesson <span class='activity-text'>$lesson->title</span>."
                );
                $course->updateProgressForUser($user);

                if ($nextLesson) {
                    $user->enrolledInLesson($nextLesson->id, $course->id);
                    logActivity(
                        causedBy: $user,
                        performedOn: $nextLesson,
                        log: "You have enrolled in lesson <span class='activity-text'>$lesson->title</span>."
                    );
                } else {
                    logActivity(
                        causedBy: $user,
                        performedOn: $course,
                        log: "You have completed the course <span class='activity-text'>$course->title</span>."
                    );
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

    public function quizResult()
    {
        /**
         * User will land here from submitQuiz function otherwise session will be null,
         * and we will show 404 page
         */
        $data = session('quizResult');

        if (! $data) {
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

    public function updateProgress(UpdateLessonProgressRequest $request, Lesson $lesson)
    {
        $user = _user();

        $enrolledLesson = $user->enrolledLessons()->find($lesson->id);

        if ($enrolledLesson->pivot->progress < $request->progress) {
            $user->enrolledLessons()->syncWithPivotValues($lesson->id, ['progress' => $request->progress]);
        }

        return $this->sendResponse();
    }
}
