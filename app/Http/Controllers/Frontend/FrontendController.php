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

    public function thankYou(): Response
    {
        return Inertia::render('frontend/thank-you');
    }
}
