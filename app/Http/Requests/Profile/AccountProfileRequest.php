<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class AccountProfileRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'current_password' => 'required|string',
            'password' => 'required|min:8|max:255|confirmed',
        ];
    }
}
