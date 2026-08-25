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
        $items = [
            ['name' => 'Admin', 'email' => 'admin@scaffold.com', 'is_admin' => 1, 'email_verified_at' => Carbon::now(), 'password' => Hash::make('admin123456')],
        ];

        foreach ($items as $item) {
            User::factory()->create($item);
        }
    }
}
