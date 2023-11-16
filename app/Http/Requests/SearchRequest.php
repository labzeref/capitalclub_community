<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'type' => 'required|string',
            'query' => 'nullable|string',
            'category_ids' => 'nullable|array',
            'category_ids.*' => 'nullable|numeric|exists:categories,id',
            'instructor_ids' => 'nullable|array',
            'instructor_ids.*' => 'nullable|exists:instructors,id',
        ];
    }
}
