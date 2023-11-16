<?php

namespace App\Http\Requests\Post;

use App\Enums\PostTypeEnum;
use App\Traits\ResponseMethods;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class PostRequest extends FormRequest
{
    use ResponseMethods;

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:1500',
            'type' => [
                'required',
                'string',
                'max:255',
                new Enum(PostTypeEnum::class),
            ],
            'media' => 'nullable',
            'media_key' => [
                'nullable',
                Rule::requiredIf(in_array($this->type, [PostTypeEnum::image->name, PostTypeEnum::video->name])),
                'exists:chunks,key',
            ],
            'schedule_at' => 'nullable|date|date_format:Y-m-d H:i:s',
            'poll_choices' => 'required_if:type,'.PostTypeEnum::poll->name.'|array|min:2|max:4',
            'poll_choices.*' => 'required_with:poll_choices|string|max:255',
            'poll_duration_name' => [
                'required_if:type,'.PostTypeEnum::poll->name,
                Rule::in(array_flip(config('constant.postPollDurations'))),
            ],
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            $this->sendResponse($validator->errors()->all(), '', 422)
        );
    }
}
