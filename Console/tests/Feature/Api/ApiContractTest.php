<?php

declare(strict_types=1);

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

final class ApiContractTest extends TestCase
{
    use RefreshDatabase;

    public function test_api_errors_use_the_shared_envelope_and_requested_locale(): void
    {
        $this->withHeader('X-Locale', 'en')
            ->getJson('/api/user/profile')
            ->assertUnauthorized()
            ->assertJsonPath('code', 401)
            ->assertJsonPath('message', 'Unauthenticated or session expired.')
            ->assertJsonStructure(['code', 'message', 'datetime', 'data']);
    }

    public function test_authenticated_profile_response_exposes_user_data(): void
    {
        User::factory()->create();
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $this->getJson('/api/user/profile')
            ->assertOk()
            ->assertJsonPath('code', 200)
            ->assertJsonPath('data.id', $user->id)
            ->assertJsonPath('data.email', $user->email);
    }

    public function test_demo_login_can_fetch_profile_and_logout(): void
    {
        $user = User::factory()->create();

        $loginResponse = $this->postJson('/api/auth/login')
            ->assertOk()
            ->assertJsonPath('code', 200)
            ->assertJsonStructure(['data' => ['token']]);

        $token = (string) $loginResponse->json('data.token');

        $this->withToken($token)
            ->getJson('/api/user/profile')
            ->assertOk()
            ->assertJsonPath('data.id', $user->id)
            ->assertJsonPath('data.name', $user->name);

        $this->withToken($token)
            ->postJson('/api/auth/logout')
            ->assertOk();

        $this->assertDatabaseCount('personal_access_tokens', 0);
    }
}
