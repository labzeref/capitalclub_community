<?php

namespace App\Http\Requests\Chat;

use App\Traits\ResponseMethods;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class MessageRequest extends FormRequest
{
    use ResponseMethods;

    public function rules(): array
    {
        return [
            'value' => 'required_without:media_key|string|max:1500',
            'media_key' => 'nullable',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            $this->sendResponse($validator->errors()->all(), '', 422)
        );
    }
}
