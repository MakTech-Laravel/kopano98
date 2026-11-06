<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCheckoutOrderRequest;
use App\Models\Order;
use App\Services\Payments\PaddleGateway;
use App\Services\Payments\PayfastGateway;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CheckoutOrderController extends Controller
{
    public function store(
        StoreCheckoutOrderRequest $request,
        PayfastGateway $payfast,
        PaddleGateway $paddle,
    ): JsonResponse {
        $data = $request->validated();
        $catalogue = config('launchpad.services', []);
        $rates = config('launchpad.fx_from_zar', []);

        $normalizedItems = [];
        $totalZar = 0;

        foreach ($data['items'] as $item) {
            $serviceId = (string) $item['service_id'];
            $catalogueItem = $catalogue[$serviceId] ?? null;

            if ($catalogueItem === null) {
                throw ValidationException::withMessages([
                    'items' => "Unknown service: {$serviceId}",
                ]);
            }

            $quantity = max(1, (int) $item['quantity']);
            $unitPrice = (int) $catalogueItem['price'];
            $totalZar += $unitPrice * $quantity;

            $normalizedItems[] = [
                'service_id' => $serviceId,
                'name' => (string) $catalogueItem['name'],
                'unit_price_zar' => $unitPrice,
                'quantity' => $quantity,
            ];
        }

        $currency = strtoupper($data['currency_code']);
        $rate = (float) ($rates[$currency] ?? 1);
        $totalDisplay = $currency === 'ZAR'
            ? (float) $totalZar
            : round($totalZar * $rate, 2);

        $gateway = $data['gateway'];
        $country = strtoupper($data['country_code']);

        // Enforce region gateway defaults unless explicitly overridden and valid.
        if (in_array($country, ['ZA', 'NA', 'BW'], true) && $gateway !== 'payfast' && $gateway !== 'paddle') {
            $gateway = 'payfast';
        }

        $order = DB::transaction(function () use ($data, $normalizedItems, $totalZar, $totalDisplay, $currency, $gateway, $country): Order {
            $existing = Order::query()->where('reference', $data['reference'])->first();

            if ($existing && $existing->status === Order::STATUS_PAID) {
                throw ValidationException::withMessages([
                    'reference' => 'This order is already paid. Start a new checkout.',
                ]);
            }

            $order = $existing ?? new Order(['reference' => $data['reference']]);
            $order->fill([
                'customer_name' => $data['customer_name'],
                'customer_email' => $data['customer_email'],
                'customer_phone' => $data['customer_phone'] ?? null,
                'country_code' => $country,
                'currency_code' => $currency,
                'gateway' => $gateway,
                'total_zar' => $totalZar,
                'total_display' => $totalDisplay,
                'status' => Order::STATUS_PENDING,
            ]);
            $order->save();

            $order->items()->delete();

            foreach ($normalizedItems as $item) {
                $order->items()->create($item);
            }

            return $order->fresh('items');
        });

        $paymentsConfigured = false;
        $payfastAction = null;
        $payfastForm = null;
        $paddleOverlay = null;

        if ($order->gateway === 'payfast') {
            $paymentsConfigured = $payfast->isConfigured();
            $payload = $payfast->checkoutPayload($order);
            $payfastAction = $payload['action'];
            $payfastForm = $payload['form'];
        }

        if ($order->gateway === 'paddle') {
            $paymentsConfigured = $paddle->isConfigured();
            $payload = $paddle->checkoutPayload($order);
            $paddleOverlay = $payload['overlay'];
        }

        return response()->json([
            'reference' => $order->reference,
            'status' => $order->status,
            'total_zar' => $order->total_zar,
            'total_display' => $order->total_display,
            'currency_code' => $order->currency_code,
            'gateway' => $order->gateway,
            'payments_configured' => $paymentsConfigured,
            'payfast' => [
                'action' => $paymentsConfigured ? $payfastAction : null,
                'form' => $paymentsConfigured ? $payfastForm : null,
            ],
            'paddle' => [
                'overlay' => $paymentsConfigured ? $paddleOverlay : null,
            ],
        ]);
    }
}
