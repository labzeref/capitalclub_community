<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class InterestProfileRequest extends FormRequest
{
    /**
     * Rules for the request
     *
     * @return string[]
     */
    public function rules(): array
    {
        return [
            'interests_ids' => 'nullable|array',
            'interests_ids.*' => 'nullable|numeric|exists:categories,id',
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
            'interests_ids.array' => 'Interests should be array.',
            'interests_ids.array.*.exists' => 'Interests are not from out list.',
        ];
    }
}
