<?php

namespace App\Services\Payments;

use App\Models\Order;

class PaddleGateway
{
    public function isConfigured(): bool
    {
        return filled(config('services.paddle.client_token'))
            && filled(config('services.paddle.price_id'));
    }

    /**
     * Paddle Billing overlay payload for the browser (no fake redirect URL).
     *
     * @return array{overlay: array{client_token: string, price_id: string, order_reference: string, customer_email: string}|null}
     */
    public function checkoutPayload(Order $order): array
    {
        if (! $this->isConfigured()) {
            return [
                'overlay' => null,
            ];
        }

        return [
            'overlay' => [
                'client_token' => (string) config('services.paddle.client_token'),
                'price_id' => (string) config('services.paddle.price_id'),
                'order_reference' => $order->reference,
                'customer_email' => $order->customer_email,
            ],
        ];
    }

    public function signatureIsValid(string $rawBody, ?string $signatureHeader): bool
    {
        $secret = (string) config('services.paddle.webhook_secret');

        if ($secret === '' || $signatureHeader === null || $signatureHeader === '') {
            return false;
        }

        // Paddle Billing style: ts=...;h1=...
        $parts = [];

        foreach (explode(';', $signatureHeader) as $segment) {
            [$key, $value] = array_pad(explode('=', trim($segment), 2), 2, null);
            if ($key && $value) {
                $parts[$key] = $value;
            }
        }

        $ts = $parts['ts'] ?? null;
        $h1 = $parts['h1'] ?? null;

        if ($ts === null || $h1 === null) {
            return false;
        }

        $computed = hash_hmac('sha256', $ts.':'.$rawBody, $secret);

        return hash_equals($computed, $h1);
    }
}
