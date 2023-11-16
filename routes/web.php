<?php

use App\Http\Controllers\AcademyController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseDiscussionController;
use App\Http\Controllers\DiscordController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\InstructorProfileShowController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\LiveSeriesController;
use App\Http\Controllers\LiveStreamController;
use App\Http\Controllers\LiveTrainingController;
use App\Http\Controllers\MarketplaceController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PreferenceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\StreamMessageController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\ThreadCommentController;
use App\Http\Controllers\ThreadController;
use App\Http\Controllers\ToggleBookmarkController;
use App\Http\Controllers\ToggleFollowController;
use App\Http\Controllers\ToggleReactionController;
use App\Http\Controllers\UnlockController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WebhookController;
use App\Http\Controllers\WelcomeController;
use App\Http\Middleware\SiteLockMiddleware;
use Illuminate\Support\Facades\Route;

/**
 * Chargebee webhook calls
 */
Route::post('/webhook', WebhookController::class);

/**
 * It will unlock site for users who have invitation code
 */
Route::get('/unlock/{encryptedData}', UnlockController::class)->name('unlock-site');

/**
 * Legal pages
 */
Route::get('/terms-of-service', function () {
    return redirect()->away('https://www.capital.club/terms-of-service');
})->name('terms-and-conditions');

Route::get('privacy-policy', function () {
    return redirect()->away('https://www.capital.club/privacy-policy');
})->name('privacy-policy');

/**
 * All authentication pages
 */
require __DIR__ . '/auth.php';

Route::middleware('guest')->group(function () {
    /**
     * This will be moved to the frontend server
     */
    Route::get('/', WelcomeController::class)->name('welcome')->middleware(\App\Http\Middleware\SiteLockMiddleware::class);
});

/**
 * Post authentication pages and routes
 */
Route::middleware(['auth', 'auth.session', 'destroyDeactivateUserSession'])->group(function () {

    Route::get('/get-auth-user', [UserController::class, 'getAuthUser'])->name('get-auth-user');
    /**
     * Game play routes
     */
//        Route::controller(GameController::class)->middleware('redirectToAcademyIfOpen')
//            ->prefix('/game')->name('game.')->group(function () {
//                Route::get('/play', [GameController::class, 'index'])->name('play');
//                Route::get('/score', [GameController::class, 'storeScore'])->name('store-score');
//            });

    /**
     * Subscription and chargebee routes
     */
    Route::middleware(SiteLockMiddleware::class)->controller(SubscriptionController::class)->prefix('/payment')
        ->name('subscription.')->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'store')->name('store');
            Route::get('/verify-coupon/{couponCode}', 'verifyCouponCode')->name('verify-coupon-code');
            Route::get('/payment-intent/{couponCode?}', 'paymentIntent')->name('payment-intent');
            Route::get('/status', 'status')->name('status');
        });

    /**
     * Post subscription routes
     */
    Route::middleware('shouldHasSubscription')->group(function () {

        /**
         * Onboarding pages
         */
        Route::middleware('ShouldNotHasProfileCompleted')->controller(PreferenceController::class)
            ->prefix('/onboarding')->name('preference.')->group(function () {
                Route::get('/glitch-id', 'glitchId')->name('glitch-id');
                Route::get('/short-intro', 'shortIntro')->name('short-intro');

                Route::get('/', 'onboarding')->name('index');
                Route::post('/', 'onboardingStore')->name('store');

                Route::get('/transition', 'transition')->name('transition');
            });

        /**
         * Game page when academy locked
         */
//            Route::get('/onboarding/game', [PreferenceController::class, 'game'])->name('preference.game')
//                ->middleware('redirectToAcademyIfOpen');

        /**
         * Post onboarding completion routes
         */
        Route::middleware(['ShouldHasProfileCompleted'])->group(function () {
            /**
             * Discord integration
             */
            Route::controller(DiscordController::class)->prefix('/discord')->name('discord.')
                ->group(function () {
                    Route::get('/setup', 'setup')->name('setup');

                    Route::get('/handle-redirect', 'handleRedirect')->name('handle-redirect');

                    Route::get('/oauth2/handle-token', 'handleToken')
                        ->name('oauth2.handle-token');
                });

            /**
             * Notification routes
             */
            Route::controller(NotificationController::class)->prefix('notifications')
                ->name('notifications.')->group(function () {
                    Route::get('/', 'index')->name('index');
                    Route::post('/clear', 'clear')->name('clear');
                    Route::post('/read-all', 'readAll')->name('read-all');
                });

            /**
             * Progress
             */
            Route::redirect('/profile', '/profile/progress')->name('profile');

            /**
             * Profile setting pages
             */
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

                    Route::inertia('/account', 'Profile/Security')->name('security');
                    Route::put('/account', 'updateAccount')->name('account.update');

                    Route::delete('/account', 'deactivateAccount')->name('account.deactivate');
                });

            /**
             * User public profile
             */
            //                Route::controller(UserController::class)->prefix('/users/{user}')
            //                    ->name('users.')->group(function () {
            //                        Route::get('/profile', 'profile')->name('profile');
            //                    });

            /**
             * Academy pages
             */
            Route::prefix('/academy')->group(function () {
                /**
                 * Instructor profile page
                 */
                //                    Route::get('/instructors/{instructor}', InstructorProfileShowController::class)
                //                        ->name('instructors.show');

                /**
                 * Main page
                 */
                Route::get('/', AcademyController::class)->name('academy');

                /**
                 * Course routes
                 */
                Route::prefix('/courses/{course}')->name('courses.')->group(function () {
                    /**
                     * Course pages
                     */
                    Route::controller(CourseController::class)->group(function () {
                        Route::get('/preview', 'preview')->name('preview');
                        Route::get('/enrol', 'enrol')->name('enrol');
                        Route::get('/play', 'play')->name('play')
                            ->middleware('shouldEnrolledInCourse');
                    });

                    /**
                     * Course discussion
                     */
                    //                        Route::get('/discussion', [CourseDiscussionController::class, 'index'])
                    //                            ->name('discussion');
                });

                /**
                 * Course threads
                 */
                Route::controller(ThreadController::class)->group(function () {
                    Route::middleware('shouldEnrolledInCourse')->prefix('/courses/{course}')
                        ->name('courses.')->group(function () {
                            Route::get('/threads', 'index')->name('threads');
                            Route::post('/threads', 'store')->name('threads.store');
                        });

                    /**
                     * Thread view page
                     */
                    Route::get('/threads/{thread}', 'view')->name('threads.view');
                });

                Route::controller(ThreadCommentController::class)->group(function () {
                    Route::get('/threads/{thread}/comments', 'index')->name('threads.comments');
                    Route::post('/thread-comments', 'store')->name('thread-comments.store');
                    Route::get('/thread-comments/{threadComment}/reactions', 'reactions')
                        ->name('thread-comments.reactions');
                });
            });

            /**
             * Toggle follow
             * This can follow toggle any modal
             */
            //                Route::controller(ToggleFollowController::class)->prefix('/toggle-follow')
            //                    ->name('toggle-follow.')->group(function () {
            //                        Route::post('/threads/{thread}', 'thread')->name('threads');
            //                        Route::post('/users/{user}', 'user')->name('users');
            //                    });

            /**
             * Toggle bookmark
             * This can bookmark toggle any modal
             */
            Route::controller(ToggleBookmarkController::class)
                ->prefix('bookmark-toggle')->name('bookmark-toggle.')->group(function () {
                    Route::post('courses/{course}', 'course')->name('courses');
                    Route::post('lessons/{lesson}', 'lesson')->name('lessons');
                    Route::post('live-training/{liveTraining}', 'liveTraining')->name('live-training');
                    Route::post('live-stream/{liveStream}', 'liveStream')->name('live-stream');
                });

            /**
             * Lesson routes
             */
            Route::controller(LessonController::class)->middleware('shouldEnrolledInLesson')
                ->prefix('/lessons/{lesson}')->name('lessons.')->group(function () {
                    Route::get('/play', 'play')->name('play');
                    Route::post('/note', 'storeNote')->name('notes.store');
                    Route::get('/complete', 'complete')->name('complete');
                    Route::get('/skip-quiz', 'skipQuiz')->name('skip-quiz');
                    Route::post('/submit-quiz', 'submitQuiz')->name('submit-quiz');
                    Route::post('/update-progress', 'updateProgress')->name('update-progress');
                });

            /**
             * Lesson quiz result page
             */
            Route::get('/quiz-result', [LessonController::class, 'quizResult'])->name('lesson.quiz-result');

            /**
             * Marketplace page
             */
            Route::controller(MarketplaceController::class)->prefix('/marketplace')
                ->name('marketplace.')->group(function () {
                    Route::get('/', 'index')->name('index');
                });

            /**
             * Toggle reaction
             * This can toggle reaction any modal
             */
            //                Route::controller(ToggleReactionController::class)->prefix('/toggle-reaction')
            //                    ->name('toggle-reaction.')->group(function () {
            //                        Route::post('/thread-comments/{threadComment}', 'threadComment')
            //                            ->name('thread-comments');
            //                    });

            /**
             * Reporting pages
             * Send remarks and complains
             */
            //                Route::controller(ReportController::class)->group(function () {
            //                    Route::post('/stream-message/{streamMessage}/report', 'streamMessage')->name('stream-message.report');
            //                });

            /**
             * live-training is stand-alone stream.
             */
            //                Route::controller(LiveTrainingController::class)->group(function () {
            //                    Route::get('live-training/', 'index')->name('live-training.index');
            //                    Route::get('live-training/{liveTraining}/preview', 'preview')->name('live-training.preview'); // only for safety error in front end
            //                    Route::get('live-training/{liveTraining}/play', 'play')->name('live-training.play'); // only for safety error in front end
            //                });

            /**
             * live-series have group of streams.
             */
            //                Route::controller(LiveSeriesController::class)->group(function () {
            //                    Route::get('live-series/{liveSeries}/preview', 'preview')->name('live-series.preview');
            //                });

            /**
             * live-stream is a child stream of live-series (a group of series).
             */
            //                Route::get('/live-stream/{liveStream}/', [LiveStreamController::class, 'play'])->name('live-stream.play');

            //                Route::post('live-training/{liveTraining}/chat', [StreamMessageController::class, 'storeChatLiveTraining'])
            //                    ->name('live-training.chat');

            //                Route::post('live-stream/{liveStream}/chat', [StreamMessageController::class, 'storeChatLiveStream'])
            //                    ->name('live-stream.chat');

            /**
             * Review
             * Create feedback of any modal
             */
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
Route::get('assets/{path}', function ($path) {
    return response()->file(public_path("assets/$path"));
});


Route::inertia('/error-404', 'Error/Error404')->name('error-404');

Route::inertia('/error-419', 'Error/Error419')->name('error-419');

Route::inertia('/error-500', 'Error/Error500')->name('error-500');

Route::inertia('/error-403', 'Error/Error403')->name('error-403');

Route::inertia('/error-429', 'Error/Error429')->name('error-429');

Route::inertia('/error-405', 'Error/Error405')->name('error-405');
