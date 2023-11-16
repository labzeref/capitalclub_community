<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BusinessRevenueRequest extends FormRequest
{
    /**
     * Rules for the request
     *
     * @return string[]
     */
    public function rules(): array
    {
        return [
            'annual_revenue' => 'required|string|max:255',
        ];
    }
}
