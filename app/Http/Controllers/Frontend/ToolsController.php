<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Services\Tools\CvAnalysisService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ToolsController extends Controller
{
    public function analyzeCv(Request $request, CvAnalysisService $analysis): JsonResponse
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:120'],
            'title' => ['nullable', 'string', 'max:160'],
            'summary' => ['nullable', 'string', 'max:5000'],
            'experience' => ['nullable', 'array'],
            'education' => ['nullable', 'array'],
            'skills' => ['nullable', 'array'],
            'raw_text' => ['nullable', 'string', 'max:20000'],
        ]);

        if (! empty($data['raw_text']) && empty($data['summary'])) {
            $data['summary'] = substr((string) $data['raw_text'], 0, 600);
        }

        return response()->json($analysis->analyze($data));
    }

    public function analyzeLinkedIn(Request $request, CvAnalysisService $analysis): JsonResponse
    {
        $data = $request->validate([
            'headline' => ['nullable', 'string', 'max:220'],
            'about' => ['nullable', 'string', 'max:5000'],
        ]);

        return response()->json(
            $analysis->analyzeLinkedIn(
                (string) ($data['headline'] ?? ''),
                (string) ($data['about'] ?? ''),
            ),
        );
    }

    public function coverLetter(Request $request, CvAnalysisService $analysis): JsonResponse
    {
        $data = $request->validate([
            'job_description' => ['required', 'string', 'max:10000'],
            'candidate_name' => ['nullable', 'string', 'max:120'],
            'role_title' => ['nullable', 'string', 'max:160'],
        ]);

        return response()->json([
            'draft' => $analysis->draftCoverLetter(
                $data['job_description'],
                (string) ($data['candidate_name'] ?? ''),
                (string) ($data['role_title'] ?? ''),
            ),
        ]);
    }

    public function assistant(Request $request, CvAnalysisService $analysis): JsonResponse
    {
        $data = $request->validate([
            'message' => ['required', 'string', 'max:2000'],
        ]);

        return response()->json([
            'reply' => $analysis->assistantReply($data['message']),
        ]);
    }
}
