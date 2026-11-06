<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class FrontendController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('frontend/home');
    }

    public function tools(): Response
    {
        return Inertia::render('frontend/tools/index');
    }

    public function services(): Response
    {
        return Inertia::render('frontend/services/index');
    }

    public function templates(): Response
    {
        return Inertia::render('frontend/templates/index');
    }

    public function templateBuilder(): Response
    {
        $templateId = request()->query('template');
        $accent = request()->query('accent');

        return Inertia::render('frontend/templates/builder', [
            'templateId' => is_string($templateId) && $templateId !== '' ? $templateId : null,
            'accent' => is_string($accent) && $accent !== '' ? $accent : null,
        ]);
    }

    public function about(): Response
    {
        return Inertia::render('frontend/about');
    }

    public function contact(): Response
    {
        return Inertia::render('frontend/contact');
    }

    public function terms(): Response
    {
        return Inertia::render('frontend/terms');
    }

    public function checkout(): Response
    {
        return Inertia::render('frontend/checkout');
    }

    public function thankYou(): Response
    {
        return Inertia::render('frontend/thank-you');
    }
}
