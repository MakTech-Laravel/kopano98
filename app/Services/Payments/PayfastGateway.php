<?php

namespace App\Services\Payments;

use App\Models\Order;

class PayfastGateway
{
    public function isConfigured(): bool
    {
        return filled(config('services.payfast.merchant_id'))
            && filled(config('services.payfast.merchant_key'));
    }

    /**
     * Build a browser POST form for PayFast.
     * Passphrase is used only when hashing — never returned to the client.
     *
     * @return array{action: string|null, form: array<string, string>|null}
     */
    public function checkoutPayload(Order $order): array
    {
        if (! $this->isConfigured()) {
            return [
                'action' => null,
                'form' => null,
            ];
        }

        $base = rtrim((string) config('services.payfast.host'), '/');

        // PayFast settles in ZAR — always charge total_zar.
        $form = [
            'merchant_id' => (string) config('services.payfast.merchant_id'),
            'merchant_key' => (string) config('services.payfast.merchant_key'),
            'return_url' => route('thank-you', ['reference' => $order->reference]),
            'cancel_url' => route('checkout'),
            'notify_url' => route('webhooks.payfast'),
            'name_first' => $order->customer_name,
            'email_address' => $order->customer_email,
            'm_payment_id' => $order->reference,
            'amount' => number_format((float) $order->total_zar, 2, '.', ''),
            'item_name' => 'Launchpad Careers order '.$order->reference,
        ];

        $form['signature'] = $this->signature($form);

        return [
            'action' => $base.'/eng/process',
            'form' => $form,
        ];
    }

    /**
     * @param  array<string, mixed>  $payload
     */
    public function signatureIsValid(array $payload): bool
    {
        $signature = (string) ($payload['signature'] ?? '');
        unset($payload['signature']);

        return hash_equals($this->signature($payload), $signature);
    }

    /**
     * @param  array<string, mixed>  $payload
     */
    public function signature(array $payload): string
    {
        $filtered = [];

        foreach ($payload as $key => $value) {
            if ($value === '' || $value === null || $key === 'signature' || $key === 'passphrase') {
                continue;
            }

            $filtered[$key] = stripslashes((string) $value);
        }

        $passphrase = (string) config('services.payfast.passphrase');
        $query = http_build_query($filtered);

        if ($passphrase !== '') {
            $query .= '&passphrase='.urlencode($passphrase);
        }

        return md5($query);
    }
}
