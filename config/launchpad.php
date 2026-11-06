<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Service catalogue (ZAR)
    |--------------------------------------------------------------------------
    |
    | Keep in sync with resources/js/data/launchpad/services.ts.
    | Checkout always prices from this server catalogue — never trust the client.
    |
    */

    'services' => [
        'cv-rewrite-entry' => ['name' => 'CV Rewrite — Graduate', 'price' => 160],
        'cv-rewrite-mid' => ['name' => 'CV Rewrite — Mid-Level', 'price' => 210],
        'cv-rewrite-senior' => ['name' => 'CV Rewrite — Senior', 'price' => 280],
        'cv-rewrite-executive' => ['name' => 'CV Rewrite — Executive', 'price' => 320],
        'linkedin-graduate' => ['name' => 'LinkedIn Profile Fix — Graduate', 'price' => 130],
        'linkedin-mid' => ['name' => 'LinkedIn Profile Fix — Mid-Level', 'price' => 160],
        'linkedin-senior' => ['name' => 'LinkedIn Profile Fix — Senior', 'price' => 200],
        'linkedin-executive' => ['name' => 'LinkedIn Profile Fix — Executive', 'price' => 250],
        'job-card' => ['name' => 'Job Card', 'price' => 100],
        'cv-rewrite-tailoring' => ['name' => 'CV Rewrite + Tailoring', 'price' => 300],
        'cover-letter' => ['name' => 'Cover Letter', 'price' => 70],
        'interview-prep' => ['name' => 'Interview Prep Guide', 'price' => 120],
        'coaching' => ['name' => 'Coaching Session', 'price' => 350],
        'job-search-strategy' => ['name' => 'Job Search Strategy', 'price' => 70],
        'essentials' => ['name' => 'The Essentials', 'price' => 310],
        'full-profile' => ['name' => 'The Full Profile', 'price' => 430],
        'career-kit' => ['name' => 'The Career Kit', 'price' => 680],
        'job-hunter-pack' => ['name' => 'The Job Hunter Pack', 'price' => 480],
        'portfolio-pdf' => ['name' => 'Portfolio (PDF)', 'price' => 280],
        'portfolio-web' => ['name' => 'Portfolio (Web)', 'price' => 600],
    ],

    'fx_from_zar' => [
        'ZAR' => 1,
        'USD' => 0.055,
        'EUR' => 0.051,
        'GBP' => 0.043,
        'AUD' => 0.084,
        'CAD' => 0.075,
        'INR' => 4.6,
        'NGN' => 85,
        'KES' => 7.1,
        'AED' => 0.202,
    ],

];
