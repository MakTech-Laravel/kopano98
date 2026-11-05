<?php

use App\Http\Controllers\Frontend\FrontendController;
use Illuminate\Support\Facades\Route;

Route::get('/', [FrontendController::class, 'index'])->name('home');
Route::get('/tools', [FrontendController::class, 'tools'])->name('tools');
Route::get('/services', [FrontendController::class, 'services'])->name('services');
Route::get('/templates', [FrontendController::class, 'templates'])->name('templates');
Route::get('/about', [FrontendController::class, 'about'])->name('about');
Route::get('/contact', [FrontendController::class, 'contact'])->name('contact');
Route::get('/terms', [FrontendController::class, 'terms'])->name('terms');
Route::get('/thank-you', [FrontendController::class, 'thankYou'])->name('thank-you');
