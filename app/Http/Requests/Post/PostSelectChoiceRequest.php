<?php

namespace App\Http\Requests\Post;

use App\Models\Post;
use App\Traits\ResponseMethods;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class PostSelectChoiceRequest extends FormRequest
{
    use ResponseMethods;

    public function rules(): array
    {
        $post = $this->route('post');

        $validChoiceIds = is_object($post)
            ? $post->choices()->pluck('id')->toArray()
            : Post::find($post)->choices()->pluck('id')->toArray();

        return [
            'choice_id' => ['required', 'numeric', Rule::in($validChoiceIds)],
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            $this->sendResponse($validator->errors()->all(), '', 422)
        );
    }
}
