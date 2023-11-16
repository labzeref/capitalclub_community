<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IdentityRequest extends FormRequest
{
    /**
     * Rules for the request
     *
     * @return string[]
     */
    public function rules(): array
    {
        return [
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
            'avatar_id.required' => 'Please select an avatar.',
            'avatar_id.exists' => 'Avatar is not from our list.',
        ];
    }
}
