<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Story>
 */
class StoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'image_path' => null,
            'target_amount' => fake()->numberBetween(500, 5000),
            'collected_amount' => 0,
            'status' => fake()->randomElement(['pending', 'approved', 'rejected']), // ✅
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
    public function pending()
    {
        return $this->state(fn() => ['status' => 'pending']);
    }

    public function approved()
    {
        return $this->state(fn() => ['status' => 'approved']);
    }

    public function rejected()
    {
        return $this->state(fn() => ['status' => 'rejected']);
    }
}
