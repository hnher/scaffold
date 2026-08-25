<?php

namespace App\Http\Requests\User;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EditRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->user()?->id;

        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => [
                'sometimes',
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($userId),
            ],
            'password' => ['sometimes', 'nullable', 'string', 'min:8'],
        ];
    }

    /**
     * Custom validation attributes
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'name' => __('user.fields.name'),
            'email' => __('user.fields.email'),
            'password' => __('user.fields.password'),
        ];
    }

    /**
     * Custom validation messages
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => __('user.validation.name_required'),
            'name.string' => __('user.validation.name_string'),
            'name.max' => __('user.validation.name_max'),
            'email.required' => __('user.validation.email_required'),
            'email.email' => __('user.validation.email_email'),
            'email.unique' => __('user.validation.email_unique'),
            'password.min' => __('user.validation.password_min'),
        ];
    }
}
