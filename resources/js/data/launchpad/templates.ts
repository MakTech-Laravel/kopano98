export type TemplateStyle = 'all' | 'traditional' | 'contemporary' | 'creative';
export type TemplateExperience =
    | 'none'
    | 'lt3'
    | '3to5'
    | '5to10'
    | '10plus';

export type LaunchpadTemplate = {
    id: string;
    name: string;
    description: string;
    style: Exclude<TemplateStyle, 'all'>;
    experience: TemplateExperience[];
    withPhoto: boolean;
    columns: 1 | 2;
    atsSafe: boolean;
    colors: string[];
    recommended?: boolean;
};

export const launchpadTemplates: LaunchpadTemplate[] = [
    {
        id: 'graduate',
        name: 'Graduate',
        description: 'Education-forward. School leavers and new graduates.',
        style: 'contemporary',
        experience: ['none', 'lt3'],
        withPhoto: true,
        columns: 2,
        atsSafe: false,
        colors: ['#16a34a', '#2563eb', '#0d1b2a', '#ea580c'],
        recommended: true,
    },
    {
        id: 'icon-rail',
        name: 'Icon Rail',
        description: 'Modern sidebar with icon contact rail.',
        style: 'contemporary',
        experience: ['lt3', '3to5', '5to10'],
        withPhoto: true,
        columns: 2,
        atsSafe: false,
        colors: ['#0d1b2a', '#2563eb', '#d4a842', '#16a34a'],
    },
    {
        id: 'flag-line',
        name: 'Flag Line',
        description: 'Clean header bar with strong section rules.',
        style: 'traditional',
        experience: ['3to5', '5to10', '10plus'],
        withPhoto: false,
        columns: 1,
        atsSafe: true,
        colors: ['#0d1b2a', '#1e40af', '#b68f24'],
        recommended: true,
    },
    {
        id: 'tagline',
        name: 'Tagline',
        description: 'Headline-led layout for specialists and consultants.',
        style: 'contemporary',
        experience: ['3to5', '5to10', '10plus'],
        withPhoto: false,
        columns: 1,
        atsSafe: true,
        colors: ['#0d1b2a', '#0f766e', '#d4a842'],
    },
    {
        id: 'classic-ats',
        name: 'Classic ATS',
        description: 'Single-column, text-first — selected ATS-safe style.',
        style: 'traditional',
        experience: ['none', 'lt3', '3to5', '5to10', '10plus'],
        withPhoto: false,
        columns: 1,
        atsSafe: true,
        colors: ['#0d1b2a', '#334155', '#2563eb'],
        recommended: true,
    },
    {
        id: 'creative-split',
        name: 'Creative Split',
        description: 'Bold two-column creative layout for design roles.',
        style: 'creative',
        experience: ['lt3', '3to5', '5to10'],
        withPhoto: true,
        columns: 2,
        atsSafe: false,
        colors: ['#7c3aed', '#0d1b2a', '#d4a842', '#db2777'],
    },
];
