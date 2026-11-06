<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Order $order) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Launchpad Careers order '.$this->order->reference,
        );
    }

    public function content(): Content
    {
        return new Content(
            htmlString: '<p>Thanks '.$this->order->customer_name.'.</p>'
                .'<p>We received payment for order <strong>'.$this->order->reference.'</strong> '
                .'('.$this->order->currency_code.' '.$this->order->total_display.').</p>'
                .'<p>Message us on WhatsApp with your documents so we can start your order.</p>',
        );
    }
}
