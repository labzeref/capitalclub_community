<?php

use App\Http\Controllers\AcademyController;
use App\Http\Controllers\Chat\ConversationController;
use App\Http\Controllers\Chat\MessageController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseDiscussionController;
use App\Http\Controllers\DiscussionController;
use App\Http\Controllers\InstructorProfileShowController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\LiveSeriesController;
use App\Http\Controllers\LiveStreamController;
use App\Http\Controllers\LiveTrainingController;
use App\Http\Controllers\MarketplaceController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PostCommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PreferenceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SiteLockAuthenticateController;
use App\Http\Controllers\StreamMessageController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\ThreadCommentController;
use App\Http\Controllers\ThreadController;
use App\Http\Controllers\ToggleBookmarkController;
use App\Http\Controllers\ToggleFollowController;
use App\Http\Controllers\ToggleReactionController;
use App\Http\Controllers\UploadMediaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WebhookController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::post('/webhook', WebhookController::class);

Route::post('/site-lock', SiteLockAuthenticateController::class)->name('site-lock.authenticate');

Route::middleware('site-lock')->group(function () {
    require __DIR__.'/auth.php';

    Route::middleware('guest')->group(function () {
        Route::inertia('/', 'Welcome')->name('welcome');
    });

    Route::middleware(['auth', 'destroyDeactivateUserSession'])->group(function () {

        Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');

        Route::controller(SubscriptionController::class)->prefix('/payment')
            ->name('subscription.')->group(function () {
                Route::get('/', 'index')->name('index');
                Route::post('/', 'store')->name('store');
            });

        Route::middleware('shouldHasSubscription')->group(function () {
            Route::controller(UploadMediaController::class)->prefix('/filepond')->group(function () {
                Route::post('/process', 'postUpload');
                Route::patch('/process', 'patchUpload');
                Route::delete('/process', 'revert');
            });

            Route::redirect('/profile', '/profile/progress')->name('profile');

            Route::controller(ProfileController::class)
                ->prefix('/profile')->name('profile.')->group(function () {

                    Route::get('/progress', 'progress')->name('progress');

                    Route::get('/personal', 'personal')->name('personal');
                    Route::put('/personal', 'updatePersonal')->name('personal.update');

                    Route::get('/payment', 'payment')->name('payment');
                    Route::get('/payment/invoices/{invoice}/download', 'invoiceDownload')
                        ->name('payment.invoices.download');

                    Route::post('/payment/create-portal-session', 'createPortalSession')
                        ->name('payment.create-portal-session');

                    Route::inertia('/account', 'Profile/Account')->name('account');
                    Route::put('/account', 'updateAccount')->name('account.update');

                    Route::delete('/account', 'deactivateAccount')->name('account.deactivate');

                    Route::get('/activity', 'activity')->name('activity');
                    Route::get('/activity/list', 'activityList')->name('activity.list');
                });

            Route::controller(PreferenceController::class)
                ->prefix('/preference')->name('preference.')->group(function () {
                    Route::inertia('/glitch-id', 'Preference/GlitchId')->name('glitch-id');
                });

            Route::controller(UserController::class)->prefix('/users/{user}')
                ->name('users.')->group(function () {
                    Route::get('/profile', 'profile')->name('profile');
                    Route::get('/message', 'message')->name('message');
                });

            Route::prefix('/academy')->group(function () {
                Route::get('/instructors/{instructor}', InstructorProfileShowController::class)
                    ->name('instructors.show');

                Route::get('/', AcademyController::class)->name('academy');

                Route::prefix('/courses/{course}')->name('courses.')->group(function () {
                    Route::controller(CourseController::class)->group(function () {
                        Route::get('/preview', 'preview')->name('preview');
                        Route::get('/enrol', 'enrol')->name('enrol');
                        Route::get('/play', 'play')->name('play')
                            ->middleware('shouldEnrolledInCourse');
                    });

                    Route::get('/discussion', [CourseDiscussionController::class, 'index'])
                        ->name('discussion');
                });

                Route::controller(ThreadController::class)->group(function () {
                    Route::middleware('shouldEnrolledInCourse')->prefix('/courses/{course}')
                        ->name('courses.')->group(function () {
                            Route::get('/threads', 'index')->name('threads');
                            Route::post('/threads', 'store')->name('threads.store');
                        });

                    Route::get('/threads/{thread}', 'view')->name('threads.view');
                });

                Route::controller(ToggleFollowController::class)->prefix('/toggle-follow')
                    ->name('toggle-follow.')->group(function () {
                        Route::post('/threads/{thread}', 'thread')->name('threads');
                        Route::post('/users/{user}', 'user')->name('users');
                    });

                Route::controller(ThreadCommentController::class)->group(function () {
                    Route::get('/threads/{thread}/comments', 'index')->name('threads.comments');
                    Route::post('/thread-comments', 'store')->name('thread-comments.store');
                    Route::get('/thread-comments/{threadComment}/reactions', 'reactions')
                        ->name('thread-comments.reactions');
                });
            });

            Route::controller(ToggleBookmarkController::class)
                ->prefix('bookmark-toggle')->name('bookmark-toggle.')->group(function () {
                    Route::post('courses/{course}', 'course')->name('courses');
                    Route::post('lessons/{lesson}', 'lesson')->name('lessons');
                    Route::post('posts/{post}', 'post')->name('posts');
                    Route::post('live-training/{liveTraining}', 'liveTraining')->name('live-training');
                    Route::post('live-stream/{liveStream}', 'liveStream')->name('live-stream');
                });

            Route::controller(LessonController::class)->middleware('shouldEnrolledInLesson')
                ->prefix('/lessons/{lesson}')->name('lessons.')->group(function () {
                    Route::get('/play', 'play')->name('play');
                    Route::post('/note', 'storeNote')->name('notes.store');
                    Route::get('/quiz', 'complete')->name('complete');
                    Route::get('/skip-quiz', 'skipQuiz')->name('skip-quiz');
                    Route::post('/submit-quiz', 'submitQuiz')->name('submit-quiz');
                    Route::post('/update-progress', 'updateProgress')->name('update-progress');
                });

            Route::get('/quiz-result', [LessonController::class, 'quizResult'])->name('lesson.quiz-result');

            Route::controller(MarketplaceController::class)->prefix('/marketplace')
                ->name('marketplace.')->group(function () {
                    Route::get('/', 'index')->name('index');
                    Route::get('/list', 'list')->name('list');
                    Route::get('/{partner_profile}/profile', 'profile')->name('profile');
                });

            Route::get('/discussion', [DiscussionController::class, 'index'])->name('discussion');

            Route::apiResource('/posts', PostController::class)->except(['update']);
            Route::get('/posts/{post}/reactions', [PostController::class, 'reactions'])->name('posts.reactions');

            Route::post('/posts/{post}/select-choice', [PostController::class, 'selectChoice'])
                ->name('posts.select-choice');

            Route::controller(PostCommentController::class)->group(function () {
                Route::get('posts/{post}/comments', 'index')->name('posts.comments');
                Route::post('/post-comments', 'store')->name('post-comments.store');
                Route::get('/post-comments/{postComment}/reactions', 'reactions')
                    ->name('post-comments.reactions');
            });

            Route::controller(ToggleReactionController::class)->prefix('/toggle-reaction')
                ->name('toggle-reaction.')->group(function () {
                    Route::post('/posts/{post}', 'post')->name('posts');
                    Route::post('/post-comments/{postComment}', 'postComment')
                        ->name('post-comments');
                    Route::post('/thread-comments/{threadComment}', 'threadComment')
                        ->name('thread-comments');
                    Route::post('/messages/{message}', 'message')
                        ->name('message');
                });

            Route::get('/chat/{activeConversationId?}', ChatController::class)->name('chat.index');

            Route::apiResource('/conversations', ConversationController::class)->except(['update', 'show']);
            Route::post('/conversations/data', [ConversationController::class, 'conversation_data'])->name('conversation.data');
            Route::apiResource('/conversations.messages', MessageController::class)->only(['index', 'store']);

            Route::controller(SearchController::class)->group(function () {
                Route::get('/search', 'index')->name('search.index');
                Route::post('/search', 'data')->name('search.data');
                Route::get('/search/instructors', 'instructors')->name('search.instructors');
            });

            Route::controller(ReportController::class)->group(function () {
                Route::post('/posts/{post}/report', 'post')->name('posts.report');
                Route::post('/post-comments/{postComment}/report', 'postComment')->name('post-comments.report');
                Route::post('/stream-message/{streamMessage}/report', 'streamMessage')->name('stream-message.report');
            });

            /**
             * live-training is stand-alone stream.
             */
            Route::controller(LiveTrainingController::class)->group(function () {
                Route::get('live-training/', 'index')->name('live-training.index');
                Route::get('live-training/{liveTraining}/preview', 'preview')->name('live-training.preview');
                Route::get('live-training/{liveTraining}/play', 'play')->name('live-training.play');
            });

            /**
             * live-series have group of streams.
             */
            Route::controller(LiveSeriesController::class)->group(function () {
                Route::get('live-series/{liveSeries}/preview', 'preview')->name('live-series.preview');
            });

            /**
             * live-stream is a child stream of live-series (a group of series).
             */
            Route::get('/live-stream/{liveStream}/', [LiveStreamController::class, 'play'])->name('live-stream.play');

            Route::post('live-training/{liveTraining}/chat', [StreamMessageController::class, 'storeChatLiveTraining'])
                ->name('live-training.chat');

            Route::post('live-stream/{liveStream}/chat', [StreamMessageController::class, 'storeChatLiveStream'])
                ->name('live-stream.chat');

            Route::controller(ReviewController::class)->prefix('/review')->name('review.')
                ->group(function () {
                    Route::post('/courses/{course}', 'storeForCourse')->name('courses.store');
                });
        });
    });
});

/**
 * Not utilized routes
 */
Route::get('/intrest1', function () {
    return Inertia::render('Preference/Interests');
})->name('test1');

Route::get('/intrest2', function () {
    return Inertia::render('Preference/Community');
})->name('test2');

Route::get('/intrest3', function () {
    return Inertia::render('Preference/Upload');
})->name('test3');

Route::get('/interests', function () {
    return Inertia::render('Interests/Interests');
})->name('signup');

Route::get('/academy/course/lesson/poll', function () {
    return Inertia::render('Academy/Poll');
});

//Route::get('/activity', function () {
//    return Inertia::render('Academy/LatestActivity');
//});

Route::get('/checkout', function () {
    return Inertia::render('Auth/Checkout');
});

//Route::get('/payment', function () {
//    return Inertia::render('Auth/Payment');
//})->name('payment');

// error pages

Route::get('/404', function () {
    return Inertia::render('Error/Error404');
});
Route::get('/419', function () {
    return Inertia::render('Error/Error419');
});
Route::get('/500', function () {
    return Inertia::render('Error/Error500');
});
Route::get('/password', function () {
    return Inertia::render('Auth/LandingPassword');
});

//assets path
Route::get('assets/{path}', function ($path) {
    return response()->file(public_path("assets/$path"));
});

//remove this or comment this after stagging
Route::get('/environment', function () {
    return Inertia::render('Environment');
})->name('environment');

Route::inertia('/profile/privacy', 'Profile/Privacy');
