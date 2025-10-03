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
        'story_id' => Story::factory(), // creates a story if none exists
        'user_id' => $this->faker->boolean(70)
            ? User::factory()
            : null,
        'donor_name' => $this->faker->name(),
        'amount' => $this->faker->randomFloat(2, 20, 200), // donation between 20 and 200
        'comment' => $this->faker->optional()->sentence(6), // random short comment or null
    ];
}

}
