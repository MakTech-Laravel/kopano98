<?php

it('returns a cv analysis score and suggestions', function () {
    $response = $this->postJson(route('tools.cv-analyze'), [
        'name' => 'Naledi Mokoena',
        'title' => 'Sales Manager',
        'summary' => 'Short summary',
        'skills' => ['CRM'],
        'experience' => [
            [
                'title' => 'Manager',
                'company' => 'Co',
                'dates' => '2020 – Present',
                'description' => 'Did things',
            ],
        ],
    ]);

    $response->assertSuccessful()
        ->assertJsonStructure(['score', 'summary', 'suggestions', 'issues', 'patches']);

    expect($response->json('score'))->toBeInt()->toBeGreaterThan(0)
        ->and($response->json('patches'))->toBeArray();
});

it('returns linkedin scores', function () {
    $this->postJson(route('tools.linkedin-analyze'), [
        'headline' => 'Sales leader',
        'about' => 'Brief about text',
    ])->assertSuccessful()
        ->assertJsonStructure(['headline_score', 'about_score', 'suggestions']);
});

it('drafts a cover letter', function () {
    $this->postJson(route('tools.cover-letter'), [
        'job_description' => 'We need a sales manager who can grow retail accounts across South Africa.',
        'candidate_name' => 'Naledi',
        'role_title' => 'Sales Manager',
    ])->assertSuccessful()
        ->assertJsonStructure(['draft']);
});

it('replies through the assistant endpoint', function () {
    $this->postJson(route('tools.assistant'), [
        'message' => 'How do I improve LinkedIn?',
    ])->assertSuccessful()
        ->assertJsonStructure(['reply']);
});
