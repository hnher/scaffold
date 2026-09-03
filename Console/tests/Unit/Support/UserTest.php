<?php

declare(strict_types=1);

namespace Tests\Unit\Support;

use App\Models\User as UserModel;
use App\Support\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

final class UserTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @return void
     * @throws AuthenticationException
     */
    public function test_guest_receives_null_by_default(): void
    {
        $this->assertNull(User::get('id'));
    }

    /**
     * @return void
     * @throws AuthenticationException
     */
    public function test_guest_receives_the_configured_default_value(): void
    {
        $this->assertSame('guest', User::get('name', 'guest'));
    }

    public function test_guest_can_require_an_authentication_exception(): void
    {
        $this->expectException(AuthenticationException::class);

        User::get('id', null, true);
    }

    /**
     * @return void
     * @throws AuthenticationException
     */
    public function test_authenticated_user_information_can_be_read_by_key(): void
    {
        $user = UserModel::factory()->create([
            'name' => 'Current User',
            'email' => 'current-user@example.com',
        ]);
        Sanctum::actingAs($user);

        $this->assertSame($user->id, User::get('id'));
        $this->assertSame('Current User', User::get('name'));
        $this->assertSame('current-user@example.com', User::get('email'));
    }

    /**
     * @return void
     * @throws AuthenticationException
     */
    public function test_authenticated_user_receives_default_for_a_missing_key(): void
    {
        Sanctum::actingAs(UserModel::factory()->create());

        $this->assertSame('fallback', User::get('profile.nickname', 'fallback'));
    }
}
