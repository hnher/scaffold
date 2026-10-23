<?php

declare(strict_types=1);

namespace Tests\Unit\Database;

use App\Models\User;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Tests\TestCase;

final class UserSeederTest extends TestCase
{
    use DatabaseMigrations;

    public function test_no_default_administrator_is_created_without_credentials(): void
    {
        config(['seeding.admin.email' => null, 'seeding.admin.password' => null]);

        $this->seed(UserSeeder::class);

        $this->assertDatabaseCount('users', 0);
    }

    public function test_an_email_alone_cannot_create_an_administrator(): void
    {
        config(['seeding.admin.email' => 'admin@example.com', 'seeding.admin.password' => '']);

        $this->seed(UserSeeder::class);

        $this->assertDatabaseCount('users', 0);
    }

    public function test_configured_credentials_are_hashed_and_not_reset_on_reseeding(): void
    {
        $password = Str::password();
        config([
            'seeding.admin.name' => 'Configured Admin',
            'seeding.admin.email' => 'admin@example.com',
            'seeding.admin.password' => $password,
        ]);

        $this->seed(UserSeeder::class);
        $user = User::query()->sole();

        $this->assertSame('Configured Admin', $user->name);
        $this->assertSame(1, $user->is_admin);
        $this->assertTrue(Hash::check($password, $user->password));

        config(['seeding.admin.password' => Str::password()]);
        $this->seed(UserSeeder::class);

        $this->assertDatabaseCount('users', 1);
        $this->assertTrue(Hash::check($password, $user->refresh()->password));
    }
}
