<?php

use App\Http\Controllers\Frontend\CheckoutOrderController;
use App\Http\Controllers\Frontend\FrontendController;
use App\Http\Controllers\Frontend\PaymentWebhookController;
use App\Http\Controllers\Frontend\ToolsController;
use Illuminate\Support\Facades\Route;

Route::get('/', [FrontendController::class, 'index'])->name('home');
Route::get('/tools', [FrontendController::class, 'tools'])->name('tools');
Route::get('/services', [FrontendController::class, 'services'])->name('services');
Route::get('/templates', [FrontendController::class, 'templates'])->name('templates');
Route::get('/templates/builder', [FrontendController::class, 'templateBuilder'])->name('templates.builder');
Route::get('/about', [FrontendController::class, 'about'])->name('about');
Route::get('/contact', [FrontendController::class, 'contact'])->name('contact');
Route::get('/terms', [FrontendController::class, 'terms'])->name('terms');
Route::get('/checkout', [FrontendController::class, 'checkout'])->name('checkout');
Route::get('/thank-you', [FrontendController::class, 'thankYou'])->name('thank-you');

Route::post('/checkout/orders', [CheckoutOrderController::class, 'store'])
    ->middleware('throttle:20,1')
    ->name('checkout.orders.store');

Route::post('/webhooks/payfast', [PaymentWebhookController::class, 'payfast'])
    ->name('webhooks.payfast');
Route::post('/webhooks/paddle', [PaymentWebhookController::class, 'paddle'])
    ->name('webhooks.paddle');

Route::post('/tools/cv-analyze', [ToolsController::class, 'analyzeCv'])
    ->middleware('throttle:30,1')
    ->name('tools.cv-analyze');
Route::post('/tools/linkedin-analyze', [ToolsController::class, 'analyzeLinkedIn'])
    ->middleware('throttle:30,1')
    ->name('tools.linkedin-analyze');
Route::post('/tools/cover-letter', [ToolsController::class, 'coverLetter'])
    ->middleware('throttle:30,1')
    ->name('tools.cover-letter');
Route::post('/tools/assistant', [ToolsController::class, 'assistant'])
    ->middleware('throttle:30,1')
    ->name('tools.assistant');
