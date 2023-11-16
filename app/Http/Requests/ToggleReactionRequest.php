<?php

namespace App\Http\Requests;

use App\Traits\ResponseMethods;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class ToggleReactionRequest extends FormRequest
{
    use ResponseMethods;

    /**
     * Rules for the request
     *
     * @return string[]
     */
    public function rules(): array
    {
        return [
            'reaction' => ['required', 'string', Rule::in(config('markable.allowed_values.reaction'))],
        ];
    }

    /**
     * Overriding the response for json
     */
    protected function failedValidation(Validator $validator): mixed
    {
        throw new HttpResponseException(
            $this->sendResponse($validator->errors()->all(), '', 422)
        );
    }
}
