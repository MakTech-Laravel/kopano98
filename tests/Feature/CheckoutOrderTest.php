<?php

use App\Mail\OrderConfirmationMail;
use App\Models\Order;
use App\Services\Payments\PayfastGateway;
use Illuminate\Support\Facades\Mail;

it('creates a pending checkout order using server catalogue prices', function () {
    $response = $this->postJson(route('checkout.orders.store'), [
        'reference' => 'LP-TEST-ORDER1',
        'customer_name' => 'Thabo Dlamini',
        'customer_email' => 'thabo@example.com',
        'customer_phone' => '+27821234567',
        'country_code' => 'ZA',
        'currency_code' => 'ZAR',
        'gateway' => 'payfast',
        'items' => [
            [
                'service_id' => 'cv-rewrite-mid',
                'quantity' => 2,
            ],
        ],
    ]);

    $response->assertSuccessful()
        ->assertJsonPath('reference', 'LP-TEST-ORDER1')
        ->assertJsonPath('total_zar', 420)
        ->assertJsonPath('payments_configured', false)
        ->assertJsonPath('payfast.action', null);

    $order = Order::query()->where('reference', 'LP-TEST-ORDER1')->first();

    expect($order)->not->toBeNull()
        ->and($order->items()->first()->unit_price_zar)->toBe(210);
});

it('rejects unknown services and ignores client-supplied prices', function () {
    $this->postJson(route('checkout.orders.store'), [
        'reference' => 'LP-BAD-SERVICE',
        'customer_name' => 'Thabo Dlamini',
        'customer_email' => 'thabo@example.com',
        'country_code' => 'ZA',
        'currency_code' => 'ZAR',
        'gateway' => 'payfast',
        'items' => [
            [
                'service_id' => 'not-a-real-service',
                'quantity' => 1,
            ],
        ],
    ])->assertUnprocessable();
});

it('does not overwrite a paid order reference', function () {
    Order::factory()->paid()->create([
        'reference' => 'LP-ALREADY-PAID',
    ]);

    $this->postJson(route('checkout.orders.store'), [
        'reference' => 'LP-ALREADY-PAID',
        'customer_name' => 'Thabo Dlamini',
        'customer_email' => 'thabo@example.com',
        'country_code' => 'ZA',
        'currency_code' => 'ZAR',
        'gateway' => 'payfast',
        'items' => [
            [
                'service_id' => 'cover-letter',
                'quantity' => 1,
            ],
        ],
    ])->assertUnprocessable();
});

it('marks payfast webhook payments as paid idempotently and checks amount', function () {
    Mail::fake();

    $order = Order::factory()->create([
        'reference' => 'LP-WEBHOOK-1',
        'gateway' => 'payfast',
        'total_zar' => 210,
        'total_display' => 210,
    ]);

    $payload = [
        'm_payment_id' => $order->reference,
        'pf_payment_id' => 'PF-123',
        'payment_status' => 'COMPLETE',
        'amount_gross' => '210.00',
    ];

    $gateway = app(PayfastGateway::class);
    $payload['signature'] = $gateway->signature($payload);

    $this->post(route('webhooks.payfast'), $payload)->assertOk();
    $this->post(route('webhooks.payfast'), $payload)->assertOk();

    expect($order->fresh()->status)->toBe(Order::STATUS_PAID);
    Mail::assertSent(OrderConfirmationMail::class, 1);
});

it('rejects payfast webhooks when amount mismatches', function () {
    $order = Order::factory()->create([
        'reference' => 'LP-WEBHOOK-AMT',
        'gateway' => 'payfast',
        'total_zar' => 210,
    ]);

    $payload = [
        'm_payment_id' => $order->reference,
        'pf_payment_id' => 'PF-999',
        'payment_status' => 'COMPLETE',
        'amount_gross' => '1.00',
    ];

    $gateway = app(PayfastGateway::class);
    $payload['signature'] = $gateway->signature($payload);

    $this->post(route('webhooks.payfast'), $payload)->assertStatus(422);
    expect($order->fresh()->status)->toBe(Order::STATUS_PENDING);
});

it('builds payfast form without exposing passphrase and charges zar total', function () {
    config()->set('services.payfast.merchant_id', '10000100');
    config()->set('services.payfast.merchant_key', '46f0cd694581a');
    config()->set('services.payfast.passphrase', 'secret-pass');
    config()->set('services.payfast.host', 'https://sandbox.payfast.co.za');

    $order = Order::factory()->create([
        'total_zar' => 210,
        'total_display' => 11.55,
        'currency_code' => 'USD',
        'gateway' => 'payfast',
    ]);

    $payload = app(PayfastGateway::class)->checkoutPayload($order);

    expect($payload['action'])->toContain('/eng/process')
        ->and($payload['form']['amount'])->toBe('210.00')
        ->and($payload['form'])->not->toHaveKey('passphrase');
});
