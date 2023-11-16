<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReviewRequest;
use App\Models\Course;
use Illuminate\Support\Facades\DB;

class ReviewController extends Controller
{
    public function storeForCourse(ReviewRequest $request, Course $course)
    {
        DB::beginTransaction();

        try {
            $user = _user();
            $review = $course->reviews()->create($request->validated() + ['user_id' => $user->id]);
            $course->update(['avg_rating' => $course->reviews()->avg('rating')]);

            logActivity(
                causedBy: $user,
                performedOn: $review,
                log: "User has submitted review for course <span class='activity-text'>$course->title</span>."
            );
        } catch (\Throwable $throwable) {
            DB::rollBack();

            return $this->sendError(_serverErrorMessage());
        }

        DB::commit();

        return $this->sendResponse([], __('Review stored successfully.'));
    }
}
