<?php

namespace App\Models;

use Database\Factories\OrderFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    /** @use HasFactory<OrderFactory> */
    use HasFactory;

    public const STATUS_PENDING = 'pending';

    public const STATUS_PAID = 'paid';

    public const STATUS_FAILED = 'failed';

    public const STATUS_CANCELLED = 'cancelled';

    /**
     * @var list<string>
     */
    protected $fillable = [
        'reference',
        'customer_name',
        'customer_email',
        'customer_phone',
        'country_code',
        'currency_code',
        'gateway',
        'total_zar',
        'total_display',
        'status',
        'gateway_payment_id',
        'gateway_payload',
        'paid_at',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'total_zar' => 'integer',
            'total_display' => 'decimal:2',
            'gateway_payload' => 'array',
            'paid_at' => 'datetime',
        ];
    }

    /**
     * @return HasMany<OrderItem, $this>
     */
    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function markPaid(?string $gatewayPaymentId = null, ?array $payload = null): void
    {
        if ($this->status === self::STATUS_PAID) {
            return;
        }

        $this->forceFill([
            'status' => self::STATUS_PAID,
            'gateway_payment_id' => $gatewayPaymentId ?? $this->gateway_payment_id,
            'gateway_payload' => $payload ?? $this->gateway_payload,
            'paid_at' => now(),
        ])->save();
    }
}
