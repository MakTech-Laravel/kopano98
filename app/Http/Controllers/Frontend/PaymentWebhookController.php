<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Mail\OrderConfirmationMail;
use App\Models\Order;
use App\Services\Payments\PaddleGateway;
use App\Services\Payments\PayfastGateway;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;

class PaymentWebhookController extends Controller
{
    public function payfast(Request $request, PayfastGateway $payfast): Response
    {
        $payload = $request->all();

        if (! $payfast->signatureIsValid($payload)) {
            return response('Invalid signature', 400);
        }

        $reference = (string) $request->input('m_payment_id');
        $status = strtoupper((string) $request->input('payment_status'));
        $amountGross = (float) $request->input('amount_gross');

        $order = Order::query()->where('reference', $reference)->first();

        if (! $order) {
            return response('Order not found', 404);
        }

        if (abs($amountGross - (float) $order->total_zar) > 0.05) {
            return response('Amount mismatch', 422);
        }

        if ($status === 'COMPLETE') {
            $wasPaid = $order->status === Order::STATUS_PAID;
            $order->markPaid((string) $request->input('pf_payment_id'), $payload);

            if (! $wasPaid) {
                Mail::to($order->customer_email)->send(new OrderConfirmationMail($order->fresh('items')));
            }
        }

        return response('OK', 200);
    }

    public function paddle(Request $request, PaddleGateway $paddle): Response
    {
        $rawBody = $request->getContent();
        $signature = $request->header('Paddle-Signature');

        if (! $paddle->signatureIsValid($rawBody, $signature)) {
            return response('Invalid signature', 400);
        }

        /** @var array<string, mixed> $payload */
        $payload = json_decode($rawBody, true) ?: [];

        $reference = (string) data_get(
            $payload,
            'data.custom_data.order_reference',
            data_get($payload, 'data.custom_data.orderReference', ''),
        );
        $event = strtolower((string) data_get($payload, 'event_type', ''));

        $order = Order::query()->where('reference', $reference)->first();

        if (! $order) {
            return response('Order not found', 404);
        }

        if (str_contains($event, 'transaction.completed') || str_contains($event, 'paid')) {
            $wasPaid = $order->status === Order::STATUS_PAID;
            $order->markPaid((string) data_get($payload, 'data.id'), $payload);

            if (! $wasPaid) {
                Mail::to($order->customer_email)->send(new OrderConfirmationMail($order->fresh('items')));
            }
        }

        return response('OK', 200);
    }
}
