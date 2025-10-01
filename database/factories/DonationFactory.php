<?php

namespace Database\Factories;

use App\Models\Donation;
use App\Models\Story;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class DonationFactory extends Factory
{
    protected $model = Donation::class;

    public function definition(): array
    {
        return [
            'story_id' => Story::factory(), // will create a story if none exists
            'user_id' => $this->faker->boolean(70) // 70% chance donation is from a registered user
                ? User::factory()
                : null,
            'donor_name' => $this->faker->name(),
            'amount' => $this->faker->randomFloat(2, 5, 200), // donation between 5 and 200
        ];
    }
}
