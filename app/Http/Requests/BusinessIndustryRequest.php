<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BusinessIndustryRequest extends FormRequest
{
    /**
     * Rules for the request
     *
     * @return string[]
     */
    public function rules(): array
    {
        return [
            'industries' => 'required|distinct|array|max:3|min:1',
            'industries.*' => 'required|exists:industries,id',
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
            'industries.required' => 'Industries are required.',
            'industries.distinct' => 'Industries should be distinct.',
            'industries.array' => 'Industries must be array.',
            'industries.max' => 'You cannot select more then 3.',
            'industries.min' => 'You have to select at least one.',

            'industries.*.industries' => 'Industry is required.',
            'industries.*.exists' => 'Industry is not from out list.',
        ];
    }
}
