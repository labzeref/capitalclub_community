<?php

namespace App\Http\Requests;

use App\Traits\ResponseMethods;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StreamMessageRequest extends FormRequest
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
            'value' => 'required|string|max:140',
            'mentioned_message_id' => 'nullable|integer|exists:stream_messages,id',
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
