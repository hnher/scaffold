<?php

declare(strict_types=1);

use App\Enums\Device\Platform;
use App\Enums\Device\Status;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('devices', function (Blueprint $table): void {
            $table->id()->comment('自增ID');
            $table->string('uuid')->nullable()->comment('设备UUID')->index('idx_uuid');
            $table->foreignId('user_id')->default(0)->comment('用户ID');
            $table->string('token', 512)->nullable()->comment('设备Token');
            $table->unsignedTinyInteger('platform')->default(Platform::MP_WECHAT->value)->comment('设备平台')->index('idx_platform');
            $table->unsignedTinyInteger('status')->default(Status::ENABLE->value)->comment('设备状态')->index('idx_status');
            $table->timestamp('last_used_at')->nullable()->comment('最后使用时间');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('devices');
    }
};
