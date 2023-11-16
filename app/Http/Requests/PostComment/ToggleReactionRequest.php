<?php

namespace App\Http\Requests\PostComment;

use App\Traits\ResponseMethods;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class ToggleReactionRequest extends FormRequest
{
    use ResponseMethods;

    public function rules(): array
    {
        return [
            'reaction' => ['required', 'string', Rule::in(config('markable.allowed_values.reaction'))],
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            $this->sendResponse($validator->errors()->all(), '', 422)
        );
    }
}
