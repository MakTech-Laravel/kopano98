<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'user@dev.com'],
            [
                'name' => 'Regular User',
                'password' => 'user@dev.com',
                'email_verified_at' => now(),
            ],
        );

        if (User::query()->count() < 10) {
            User::factory(50)->create();
        }
    }
}
