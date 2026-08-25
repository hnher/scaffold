<?php

declare(strict_types=1);

namespace App\Http\Requests\Device;

use App\Enums\Device\Platform;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'platform' => ['required', 'integer', Rule::enum(Platform::class)],
            'token' => ['required', 'string', 'max:512'],
            'uuid' => ['required', 'sometimes', 'nullable', 'string', 'max:255'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'platform' => __('device.fields.platform'),
            'token' => __('device.fields.token'),
            'uuid' => __('device.fields.uuid'),
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'platform.required' => __('device.validation.platform_required'),
            'platform.enum' => __('device.validation.platform_invalid'),
            'token.required' => __('device.validation.token_required'),
            'token.max' => __('device.validation.token_max'),
            'uuid.max' => __('device.validation.uuid_max'),
        ];
    }
}
