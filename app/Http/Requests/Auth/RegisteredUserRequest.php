<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisteredUserRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        $this->merge([
            'email' => strtolower($this->email),
        ]);
    }

    public function rules(): array
    {
        return [
            'country_iso' => 'required|string|exists:countries,iso',
            'first_name' => 'required|regex:/^[\pL\s]+$/u|max:60',
            'last_name' => 'required|regex:/^[\pL\s]+$/u|max:60',
            'email' => 'required|email:rfc,dns|max:255|unique:users',
            'phone_number' => 'required|numeric|digits_between:11,15',
            'street_address' => 'required|string|max:255',
            'city' => 'required|string|max:40|regex:/^[A-Za-z\s]+$/',
            'zip_code' => 'required|numeric|digits_between:2,10',
            'state' => 'required|string|max:40|regex:/^[A-Za-z\s]+$/',
        ];
    }

    public function messages(): array
    {
        return [
            'country_iso.required' => 'The country field is required.',
            'country_iso.string' => 'The country field should be numeric.',
            'country_iso.exists' => 'The country field should be exist.',
        ];
    }
}
