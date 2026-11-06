<?php

namespace App\Services\Tools;

class CvAnalysisService
{
    /**
     * @param  array<string, mixed>  $document
     * @return array{
     *     score: int,
     *     summary: string,
     *     suggestions: list<string>,
     *     issues: list<array{id: string, label: string, severity: string, suggestion: string, field?: string}>,
     *     patches: list<array{id: string, field: string, action: string, value: string}>
     * }
     */
    public function analyze(array $document): array
    {
        $summary = (string) ($document['summary'] ?? '');
        $skills = array_values(array_filter((array) ($document['skills'] ?? [])));
        $experience = (array) ($document['experience'] ?? []);
        $title = (string) ($document['title'] ?? '');
        $email = (string) ($document['email'] ?? '');
        $textBlob = strtolower($summary.' '.$title.' '.json_encode($experience));

        $score = 62;
        $suggestions = [];
        $issues = [];
        $patches = [];

        if (strlen($summary) < 80) {
            $score -= 8;
            $suggestion = 'Expand your professional summary with quantified outcomes.';
            $suggestions[] = $suggestion;
            $issues[] = [
                'id' => 'thin-summary',
                'label' => 'Thin summary',
                'severity' => 'medium',
                'suggestion' => $suggestion,
                'field' => 'summary',
            ];
            $patches[] = [
                'id' => 'thin-summary',
                'field' => 'summary',
                'action' => 'append',
                'value' => ' Delivered measurable results across teams, with clear ownership of outcomes and hiring impact.',
            ];
        } else {
            $score += 6;
        }

        if (count($skills) < 5) {
            $score -= 6;
            $suggestion = 'Add 2–3 more role-relevant skills for ATS keyword coverage.';
            $suggestions[] = $suggestion;
            $issues[] = [
                'id' => 'limited-skills',
                'label' => 'Limited skills keywords',
                'severity' => 'medium',
                'suggestion' => $suggestion,
                'field' => 'skills',
            ];
            $patches[] = [
                'id' => 'limited-skills',
                'field' => 'skills',
                'action' => 'merge',
                'value' => 'Stakeholder communication|ATS keyword alignment',
            ];
        } else {
            $score += 5;
        }

        $weakBullets = collect($experience)->filter(function ($role): bool {
            $description = is_array($role) ? (string) ($role['description'] ?? '') : '';

            return strlen($description) < 40;
        })->count();

        if ($weakBullets > 0) {
            $score -= 7;
            $suggestion = 'Add measurable results to experience bullet points.';
            $suggestions[] = $suggestion;
            $issues[] = [
                'id' => 'weak-experience',
                'label' => 'Experience lacks metrics',
                'severity' => 'high',
                'suggestion' => $suggestion,
                'field' => 'experience',
            ];
            $patches[] = [
                'id' => 'weak-experience',
                'field' => 'experience',
                'action' => 'append_metric',
                'value' => ' Improved results by a measurable %, with clear ownership of delivery.',
            ];
        } else {
            $score += 8;
        }

        if ($email !== '' && ! str_contains($email, '@')) {
            $score -= 10;
            $suggestion = 'Confirm your email address is complete and professional.';
            $suggestions[] = $suggestion;
            $issues[] = [
                'id' => 'email-format',
                'label' => 'Email looks incomplete',
                'severity' => 'high',
                'suggestion' => $suggestion,
                'field' => 'email',
            ];
        }

        foreach (['managed', 'led', 'improved', 'increased', 'reduced', 'delivered'] as $verb) {
            if (str_contains($textBlob, $verb)) {
                $score += 2;
            }
        }

        if ($suggestions === []) {
            $suggestions[] = 'Your CV structure looks solid. Tailor the summary to one target role before applying.';
            $issues[] = [
                'id' => 'tailor-role',
                'label' => 'Ready for role targeting',
                'severity' => 'low',
                'suggestion' => $suggestions[0],
                'field' => 'summary',
            ];
        }

        return [
            'score' => max(35, min(96, $score)),
            'summary' => 'Heuristic ATS scan complete. Structured flags below can be applied one by one in the builder.',
            'suggestions' => array_values(array_unique($suggestions)),
            'issues' => $issues,
            'patches' => $patches,
        ];
    }

    /**
     * @return array{headline_score: int, about_score: int, suggestions: list<string>}
     */
    public function analyzeLinkedIn(string $headline, string $about): array
    {
        $headlineScore = min(95, 40 + (int) (strlen($headline) / 2));
        $aboutScore = min(95, 35 + (int) (strlen($about) / 8));

        $suggestions = [];

        if (strlen($headline) < 40) {
            $suggestions[] = 'Rewrite the headline with role + specialty + proof point.';
        }

        if (strlen($about) < 160) {
            $suggestions[] = 'Expand About with a short story, 3 proof points, and a clear CTA.';
        }

        if ($suggestions === []) {
            $suggestions[] = 'Profile length looks healthy. Add industry keywords recruiters search for.';
        }

        return [
            'headline_score' => $headlineScore,
            'about_score' => $aboutScore,
            'suggestions' => $suggestions,
        ];
    }

    public function draftCoverLetter(string $jobDescription, string $candidateName, string $roleTitle): string
    {
        $role = $roleTitle !== '' ? $roleTitle : 'the open role';
        $name = $candidateName !== '' ? $candidateName : 'Candidate';
        $snippet = trim(str_replace(["\r", "\n"], ' ', substr($jobDescription, 0, 180)));

        return "Dear Hiring Manager,\n\n"
            ."I am writing to express interest in {$role}. "
            .'Your posting stood out because it emphasises outcomes that match my recent work'
            .($snippet !== '' ? " — particularly around \"{$snippet}...\"" : '')
            .".\n\n"
            ."I would welcome the chance to bring a clear, ATS-ready narrative and measurable results to your team.\n\n"
            ."Kind regards,\n{$name}";
    }

    public function assistantReply(string $message): string
    {
        $lower = strtolower($message);

        if (str_contains($lower, 'linkedin')) {
            return 'Lead with a keyword-rich headline, then a 3-line About that states who you help, how, and with what proof.';
        }

        if (str_contains($lower, 'cover')) {
            return 'Mirror 2–3 phrases from the job description, then give one quantified example per paragraph.';
        }

        return 'Focus each CV bullet on verb + task + metric. Keep the top third of page one aligned to the target role.';
    }
}
