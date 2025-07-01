<?php

use App\Http\Controllers\AcademyController;
use App\Http\Controllers\CheckoutChampController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseDiscussionController;
use App\Http\Controllers\DiscordController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\LiveStreamController;
use App\Http\Controllers\MarketplaceController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PreferenceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SiteLockController;
use App\Http\Controllers\ToggleBookmarkController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\RoadmapController;
use App\Http\Middleware\RequestLogMiddleware;
use App\Http\Middleware\SiteLockMiddleware;
use Illuminate\Support\Facades\Route;

require __DIR__ . '/checkout-champ.php';

Route::controller(SiteLockController::class)->prefix('/site-lock')->name('site-lock.')
    ->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
    });


Route::middleware(SiteLockMiddleware::class)->group(function () {

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
        Route::get('/', function (){

            return redirect()->route('login');
        })->name('welcome');
    });

    /**
     * Post authentication pages and routes
     */
    Route::middleware(['auth', 'auth.session', 'destroyDeactivateUserSession'])->group(function () {

        Route::get('/get-auth-user', [UserController::class, 'getAuthUser'])->name('get-auth-user');

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

                        Route::post('/payment/add-card', 'addCard')
                            ->name('payment.add-card');

                        Route::inertia('/account', 'Profile/Security')->name('security');
                        Route::put('/account', 'updateAccount')->name('account.update');

                        Route::delete('/account', 'deactivateAccount')->name('account.deactivate');
                    });

                Route::controller(CheckoutChampController::class)->prefix('/checkout-champ')->name('checkout-champ.')
                ->group(function () {
                   Route::post('/renew-order', 'renewOrder')->name('renew-order');
                });

        /**
         * Post subscription routes
         */
        Route::middleware('shouldHasSubscription')->group(function () {

            Route::controller(CheckoutChampController::class)->prefix('/checkout-champ')->name('checkout-champ.')
                ->group(function () {
                   Route::post('/cancel-order', 'cancelOrder')->name('cancel-order');
                });

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
                 * Roadmap routes
                 */
                // Route::get('/roadmap', [RoadmapController::class, 'roadmap'])->name('roadmap');
                Route::post('/update-notes', [LessonController::class, 'updateNotes'])->name('lesson.notes.update');


                /**
                 * Progress
                 */
                Route::redirect('/profile', '/profile/progress')->name('profile');


                /**
                 * Academy pages
                 */
                Route::prefix('/academy')->group(function () {
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

                    });

                });
            });

            /**
             * Toggle bookmark
             * This can bookmark toggle any modal
             */
            Route::controller(ToggleBookmarkController::class)
                ->prefix('bookmark-toggle')->name('bookmark-toggle.')->group(function () {
                    Route::post('courses/{course}', 'course')->name('courses');
                    Route::post('lessons/{lesson}', 'lesson')->name('lessons');
                    Route::post('livestream/{liveStream}', 'liveStream')->name('livestream');
                });

            /**
             * Lesson routes
             */
            Route::controller(LessonController::class)->middleware('shouldEnrolledInLesson')
                ->prefix('/lessons/{lesson}')->name('lessons.')->group(function () {
                    Route::get('/play', 'play')->name('play');
                    Route::get('/note', 'getNote')->name('get-note');
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
                    Route::get('/profile/{partnerProfile:slug}', 'profile')->name('profile')
                        ->middleware(RequestLogMiddleware::class);
                    Route::get('/category/{category:slug}/sub-category/{subCategory:slug}', 'subCategory')->name('sub-category');
                    Route::get('/category/{category:slug}/', 'category')->name('category');
                    Route::get('/search-list', 'searchList')->name('search-list');
                });

            /**
             * Review
             * Create feedback of any modal
             */
            Route::controller(ReviewController::class)->prefix('/review')->name('review.')
                ->group(function () {
                    Route::post('/courses/{course}', 'storeForCourse')->name('courses.store');
                });

            Route::controller(LiveStreamController::class)->prefix('/livestream')
                ->name('livestream.')->group(function () {
                    Route::get('/', 'index')->name('index');
                    Route::get('/upcoming', 'getUpcoming')->name('upcoming');
                    Route::get('/past', 'Past')->name('past');
                    Route::get('/getpast', 'getPast')->name('getpast');
                    Route::post('/{liveStream}/store-note', 'storeNote')->name('store-note');
                    Route::get('/{liveStream}', 'show')->name('show');
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



