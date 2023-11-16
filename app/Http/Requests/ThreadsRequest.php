<?php

namespace App\Http\Requests;

use App\Traits\ResponseMethods;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ThreadsRequest extends FormRequest
{
    use ResponseMethods;

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            $this->sendResponse($validator->errors()->all(), '', 422)
        );
    }
}
