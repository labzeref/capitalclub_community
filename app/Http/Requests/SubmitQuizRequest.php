<?php

namespace App\Http\Requests;

use App\Models\Answer;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SubmitQuizRequest extends FormRequest
{
    public function rules(): array
    {
        $validQuizIds = $this->route('lesson')->quizzes()
            ->pluck('id')
            ->toArray();

        $length = count($validQuizIds);

        $validAnswerIds = Answer::whereIn('quiz_id', $validQuizIds)->pluck('id')->toArray();

        return [
            'quiz_answers' => "required|array|size:$length",
            'quiz_answers.*.quiz_id' => ['required', 'numeric', 'distinct:', Rule::in($validQuizIds)],
            'quiz_answers.*.answer_id' => ['required', 'numeric', Rule::in($validAnswerIds)],
        ];
    }
}
