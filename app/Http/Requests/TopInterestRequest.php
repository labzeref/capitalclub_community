<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TopInterestRequest extends FormRequest
{
    /**
     * Rules for the request
     *
     * @return string[]
     */
    public function rules(): array
    {
        return [
            'top_interests' => 'array|required|min:1|max:3|distinct',
            'top_interests.*' => 'required|integer|exists:categories,id',
        ];
    }

    /**
     * Messages for the fail validation
     *
     * @return string[]
     */
    public function messages(): array
    {
        return [
            'top_interests.required' => 'Please select an interest.',
            'top_interests.array' => 'Interests should be array.',
            'top_interests.min' => 'Interests should be at least one.',
            'top_interests.max' => 'Interests should not exceed 3.',
            'top_interests.distinct' => 'Interests should be distinct.',

            'top_interests.*.required' => 'Interest is required.',
            'top_interests.*.integer' => 'Interest should be integer.',
            'top_interests.*.exists' => 'Interest should be from our list.',
        ];
    }
}
