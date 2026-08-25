<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\Device\Platform;
use App\Enums\Device\Status;
use App\Models\Device;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Device>
 */
final class DeviceFactory extends Factory
{
    protected $model = Device::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => null,
            'uuid' => fake()->uuid(),
            'token' => fake()->unique()->sha256(),
            'platform' => fake()->randomElement(Platform::cases()),
            'status' => Status::ENABLE,
            'last_used_at' => now(),
        ];
    }
}
