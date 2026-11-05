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
    image: string;
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
        image: '/images/launchpad/templates/graduate.png',
        recommended: true,
    },
    {
        id: 'modern',
        name: 'Modern',
        description: 'Clean contemporary layout with strong hierarchy.',
        style: 'contemporary',
        experience: ['lt3', '3to5', '5to10'],
        withPhoto: true,
        columns: 2,
        atsSafe: false,
        colors: ['#0d1b2a', '#2563eb', '#d4a842', '#16a34a'],
        image: '/images/launchpad/templates/modern.png',
    },
    {
        id: 'classic',
        name: 'Classic',
        description: 'Traditional single-column, ATS-friendly structure.',
        style: 'traditional',
        experience: ['3to5', '5to10', '10plus'],
        withPhoto: false,
        columns: 1,
        atsSafe: true,
        colors: ['#0d1b2a', '#1e40af', '#b68f24'],
        image: '/images/launchpad/templates/classic.png',
        recommended: true,
    },
    {
        id: 'executive',
        name: 'Executive',
        description: 'Leadership-forward layout for senior specialists.',
        style: 'traditional',
        experience: ['5to10', '10plus'],
        withPhoto: false,
        columns: 1,
        atsSafe: true,
        colors: ['#0d1b2a', '#0f766e', '#d4a842'],
        image: '/images/launchpad/templates/executive.png',
        recommended: true,
    },
    {
        id: 'elegant',
        name: 'Elegant',
        description: 'Refined typography with subtle accent rules.',
        style: 'creative',
        experience: ['3to5', '5to10', '10plus'],
        withPhoto: true,
        columns: 2,
        atsSafe: false,
        colors: ['#0d1b2a', '#334155', '#b8943f'],
        image: '/images/launchpad/templates/elegant.png',
    },
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Sparse, text-first — selected ATS-safe style.',
        style: 'traditional',
        experience: ['none', 'lt3', '3to5', '5to10', '10plus'],
        withPhoto: false,
        columns: 1,
        atsSafe: true,
        colors: ['#0d1b2a', '#334155', '#2563eb'],
        image: '/images/launchpad/templates/minimal.png',
        recommended: true,
    },
    {
        id: 'oxford',
        name: 'Oxford',
        description: 'Academic-leaning structure with clear sections.',
        style: 'traditional',
        experience: ['lt3', '3to5', '5to10'],
        withPhoto: false,
        columns: 1,
        atsSafe: true,
        colors: ['#0d1b2a', '#1e3a5f', '#b68f24'],
        image: '/images/launchpad/templates/oxford.png',
    },
    {
        id: 'sidebar-navy',
        name: 'Sidebar Navy',
        description: 'Two-column navy sidebar for skills and contact.',
        style: 'contemporary',
        experience: ['lt3', '3to5', '5to10'],
        withPhoto: true,
        columns: 2,
        atsSafe: false,
        colors: ['#0d1b2a', '#1e40af', '#d4a842'],
        image: '/images/launchpad/templates/sidebarNavy.png',
    },
];
