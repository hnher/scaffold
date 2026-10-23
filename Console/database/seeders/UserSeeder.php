<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $email = config('seeding.admin.email');
        $password = config('seeding.admin.password');

        if (! is_string($email) || $email === '' || ! is_string($password) || $password === '') {
            return;
        }

        if (User::query()->where('email', $email)->exists()) {
            return;
        }

        User::factory()->create([
            'name' => config('seeding.admin.name', 'Admin'),
            'email' => $email,
            'is_admin' => 1,
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make($password),
        ]);
    }
}
