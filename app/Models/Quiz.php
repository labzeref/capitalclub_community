<?php

namespace App\Models;

use App\Enums\QuizTypeEnum;
use Dyrynda\Database\Support\CascadeSoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Quiz extends Model
{
    use HasFactory, SoftDeletes, CascadeSoftDeletes;

    protected $guarded = ['id'];

    protected $casts = [
        'type' => QuizTypeEnum::class,
    ];

    protected array $cascadeDeletes = ['answers', 'polling'];

    /**
     * -------------------------------------
     * Relations
     * -------------------------------------
     */
    public function answers(): HasMany
    {
        return $this->hasMany(Answer::class);
    }

    public function polling(): HasMany
    {
        return $this->hasMany(QuizPolling::class);
    }

    /**
     * -------------------------------------
     * Methods
     * -------------------------------------
     */
    public function getPolls(): array
    {
        $answers = $this->answers;
        $polling = $this->polling;
        $pollingCount = $polling->count();

        $data = [];

        foreach ($answers as $answer) {
            if ($pollingCount > 0) {
                $poll = ($polling->where('answer_id', $answer->id)->count() / $pollingCount) * 100;
            } else {
                $poll = 0;
            }

            $data[] = [
                'pollerable_id' => $answer->id,
                'poll' => $poll,
            ];
        }

        return $data;
    }

    public function updateAnswersPollPercentage(): void
    {
        $answers = $this->answers;
        $polling = $this->polling;
        $pollingCount = $polling->count();

        foreach ($answers as $answer) {
            if ($pollingCount > 0) {
                $poll_percentage = $polling->where('answer_id', $answer->id)->count() / $pollingCount;
            } else {
                $poll_percentage = 0;
            }

            $answer->update([
                'poll_percentage' => $poll_percentage,
            ]);
        }
    }
}
