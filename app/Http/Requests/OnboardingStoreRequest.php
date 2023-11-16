<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OnboardingStoreRequest extends FormRequest
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

            'business_owner' => ['required', 'max:255', Rule::In(['YES', 'NO'])],

            'industries' => 'nullable|required_if:business_owner,YES|distinct|array',
            'industries.*' => 'nullable|required_if:business_owner,YES|exists:industries,id',

            'annual_revenue' => 'nullable|required_if:business_owner,YES|string|max:255',

            'avatar_id' => 'required|exists:avatars,id',
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

            'industries.required' => 'Industries are required.',
            'industries.distinct' => 'Industries should be distinct.',
            'industries.array' => 'Industries must be array.',
            'industries.max' => 'You cannot select more then 3.',
            'industries.min' => 'You have to select at least one.',

            'industries.*.industries' => 'Industry is required.',
            'industries.*.exists' => 'Industry is not from out list.',

            'avatar_id.required' => 'Please select an avatar.',
            'avatar_id.exists' => 'Avatar is not from our list.',
        ];
    }
}
