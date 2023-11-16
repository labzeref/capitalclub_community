<?php

namespace App\Http\Requests\Chat;

use App\Traits\ResponseMethods;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ConversationRequest extends FormRequest
{
    use ResponseMethods;

    public function rules(): array
    {
        return [
            'user_id' => 'required|numeric|exists:users,id',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            $this->sendResponse($validator->errors()->all(), '', 422)
        );
    }
}
