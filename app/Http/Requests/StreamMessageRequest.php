<?php

namespace App\Http\Requests;

use App\Traits\ResponseMethods;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StreamMessageRequest extends FormRequest
{
    use ResponseMethods;

    public function rules(): array
    {
        return [
            'value' => 'required|string|max:140',
            'mentioned_message_id' => 'nullable|integer|exists:stream_messages,id',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            $this->sendResponse($validator->errors()->all(), '', 422)
        );
    }
}
