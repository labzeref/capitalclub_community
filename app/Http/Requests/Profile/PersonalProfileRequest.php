<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class PersonalProfileRequest extends FormRequest
{
    /**
     * Prepare the request for validation
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'twitter' => parse_url($this->twitter, PHP_URL_HOST).parse_url($this->twitter, PHP_URL_PATH),
            'linkedin' => parse_url($this->linkedin, PHP_URL_HOST).parse_url($this->linkedin, PHP_URL_PATH),
            'instagram' => parse_url($this->instagram, PHP_URL_HOST).parse_url($this->instagram, PHP_URL_PATH),
            'youtube' => parse_url($this->youtube, PHP_URL_HOST).parse_url($this->youtube, PHP_URL_PATH),
        ]);
    }

    /**
     * Rules for the request
     *
     * @return string[]
     */
    public function rules(): array
    {
        return [
            'avatar_id' => 'nullable|exists:avatars,id',
            'country_iso' => 'required|string|exists:countries,iso',
            'first_name' => 'required|regex:/^[\pL\s]+$/u|max:60',
            'last_name' => 'required|regex:/^[\pL\s]+$/u|max:60',
            'phone_number' => 'required',
            'about' => 'nullable|string|max:500',
            'twitter' => 'nullable|string|max:255',
            'linkedin' => 'nullable|string|max:255',
            'instagram' => 'nullable|string|max:255',
            'youtube' => 'nullable|string|max:255',
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
            'country_iso.numeric' => 'The country field should be numeric.',
            'country_iso.exists' => 'The country field should be exist.',
            'avatar_id.exists' => 'The avatar should be exists.',
        ];
    }
}
