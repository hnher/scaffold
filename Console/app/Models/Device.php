<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\Device\Platform;
use App\Enums\Device\Status;
use Carbon\CarbonImmutable;
use Database\Factories\DeviceFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

/**
 * 设备模型。
 *
 * @property int $id
 * @property int|null $user_id
 * @property string|null $uuid
 * @property string $token
 * @property Platform $platform
 * @property Status $status
 * @property CarbonImmutable|null $last_used_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 */
#[Fillable(['user_id', 'uuid', 'token', 'platform', 'status', 'last_used_at'])]
final class Device extends Model
{
    /** @use HasFactory<DeviceFactory> */
    use HasFactory, SoftDeletes;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'platform' => Platform::class,
            'status' => Status::class,
            'last_used_at' => 'immutable_datetime:Y-m-d H:i:s',
        ];
    }

    /**
     * 获取设备所属用户，游客设备返回 null。
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
