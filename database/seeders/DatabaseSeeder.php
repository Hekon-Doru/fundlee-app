<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\Story;
use App\Models\Donation;



class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        /*  User::factory()->create([
             'name' => 'Test User',
             'email' => 'test@example.com',
         ]); */

        DB::table('users')->insert([
            'name' => 'User',
            'email' => 'User@gmail.com',
            'password' => Hash::make('User'),
            'role' => 'User',
        ]);

        DB::table('users')->insert([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('Admin'),
            'role' => 'Admin',
        ]);

        User::factory(10)->create()->each(function ($user) {
            // Create approved + pending stories
            Story::factory()->approved()->count(2)->create(['user_id' => $user->id]);
            Story::factory()->pending()->count(1)->create(['user_id' => $user->id]);

            // Donations on approved stories
            $approvedStories = $user->stories()->approved()->get();
            foreach ($approvedStories as $story) {
                Donation::factory(5)->create(['story_id' => $story->id]);
            }
        });
    }
}
