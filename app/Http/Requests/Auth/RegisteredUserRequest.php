<?php

namespace App\Http\Requests\Auth;

use App\Rules\RecaptchaRule;
use Illuminate\Foundation\Http\FormRequest;

class RegisteredUserRequest extends FormRequest
{
    /**
     * Prepare the request for validation
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'email' => strtolower($this->email),
        ]);
    }

    /**
     * Rules for the request
     */
    public function rules(): array
    {
        return [
            'country_iso' => 'required|string|exists:countries,iso',
            'first_name' => 'required|max:60',
            'last_name' => 'required|max:60',
            //            'invite_code' => 'required|max:60',
            'email' => 'required|email:rfc,dns|max:255',
            'phone_number' => 'required|max:20',
            'street_address' => 'required|string|max:255',
            'city' => 'required|string|max:40',
            'zip_code' => 'required',
            'state' => 'required|string|max:40',
            'recaptcha' => ['nullable', new RecaptchaRule],
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
            'country_iso.required' => 'The country field is required.',
            'country_iso.string' => 'The country field should be numeric.',
            'country_iso.exists' => 'The country field should be exist.',
        ];
    }
}
