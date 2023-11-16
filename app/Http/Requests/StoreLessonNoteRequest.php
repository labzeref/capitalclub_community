<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLessonNoteRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'content' => 'nullable|string|max:1500',
        ];
    }
}
