<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ObjectiveRequest extends FormRequest
{
    /**
     * Rules for the request
     *
     * @return string[]
     */
    public function rules(): array
    {
        return [
            'objective' => 'required|string|max:255',
        ];
    }
}
