<?php

namespace App\Http\Requests;

use App\Traits\ResponseMethods;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ThreadCommentRequest extends FormRequest
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
            'thread_id' => 'required_without:parent_comment_id|numeric|exists:threads,id',
            'parent_comment_id' => 'required_without:thread_id|numeric|exists:thread_comments,id',
            'comment' => 'required|string|max:255',
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
