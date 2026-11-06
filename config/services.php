<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'wheniwork' => [
        'api_key' => env('WHEN_I_WORK_API_KEY'),
        'login_url' => env('WHEN_I_WORK_LOGIN_URL', 'https://api.login.wheniwork.com/login'),
        'base_url' => env('WHEN_I_WORK_BASE_URL', 'https://api.wheniwork.com/2/'),
    ],

    'payfast' => [
        'merchant_id' => env('PAYFAST_MERCHANT_ID'),
        'merchant_key' => env('PAYFAST_MERCHANT_KEY'),
        'passphrase' => env('PAYFAST_PASSPHRASE'),
        'host' => env('PAYFAST_HOST', 'https://sandbox.payfast.co.za'),
    ],

    'paddle' => [
        'api_key' => env('PADDLE_API_KEY'),
        'client_token' => env('PADDLE_CLIENT_TOKEN'),
        'price_id' => env('PADDLE_PRICE_ID'),
        'webhook_secret' => env('PADDLE_WEBHOOK_SECRET'),
    ],

];
