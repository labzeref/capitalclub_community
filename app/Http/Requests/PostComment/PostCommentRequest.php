<?php

namespace App\Http\Requests\PostComment;

use App\Traits\ResponseMethods;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class PostCommentRequest extends FormRequest
{
    use ResponseMethods;

    public function rules(): array
    {
        return [
            'post_id' => 'required_without:parent_comment_id|numeric|exists:posts,id',
            'parent_comment_id' => 'required_without:post_id|numeric|exists:post_comments,id',
            'comment' => 'required|string|max:1500',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            $this->sendResponse($validator->errors()->all(), '', 422)
        );
    }
}
