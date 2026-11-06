<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Order>
 */
class OrderFactory extends Factory
{
    protected $model = Order::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $totalZar = fake()->numberBetween(70, 900);

        return [
            'reference' => 'LP-'.strtoupper(base_convert((string) time(), 10, 36)).'-'.strtoupper(fake()->bothify('????')),
            'customer_name' => fake()->name(),
            'customer_email' => fake()->safeEmail(),
            'customer_phone' => fake()->optional()->numerify('+27#########'),
            'country_code' => 'ZA',
            'currency_code' => 'ZAR',
            'gateway' => 'payfast',
            'total_zar' => $totalZar,
            'total_display' => $totalZar,
            'status' => Order::STATUS_PENDING,
        ];
    }

    public function paid(): static
    {
        return $this->state(fn (): array => [
            'status' => Order::STATUS_PAID,
            'paid_at' => now(),
            'gateway_payment_id' => 'pf_'.fake()->uuid(),
        ]);
    }
}
