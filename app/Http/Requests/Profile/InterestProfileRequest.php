<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class InterestProfileRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'interests_ids' => 'nullable|array',
            'interests_ids.*' => 'nullable|numeric|exists:categories,id',
        ];
    }
}
