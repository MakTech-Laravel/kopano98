<?php

it('renders the launchpad home page', function () {
    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn($page) => $page->component('frontend/home'));
});

it('renders public launchpad pages', function (string $routeName, string $component) {
    $this->get(route($routeName))
        ->assertOk()
        ->assertInertia(fn($page) => $page->component($component));
})->with([
    'tools' => ['tools', 'frontend/tools/index'],
    'services' => ['services', 'frontend/services/index'],
    'templates' => ['templates', 'frontend/templates/index'],
    'about' => ['about', 'frontend/about'],
    'contact' => ['contact', 'frontend/contact'],
    'terms' => ['terms', 'frontend/terms'],
    'thank-you' => ['thank-you', 'frontend/thank-you'],
]);
