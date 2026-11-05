export type LaunchpadService = {
    id: string;
    name: string;
    description: string;
    price: number;
    eta: string;
    features: string[];
    popular?: boolean;
    category: 'rewrite' | 'linkedin' | 'letter' | 'prep' | 'coaching' | 'kit';
};

export const launchpadServices: LaunchpadService[] = [
    {
        id: 'cv-rewrite-entry',
        name: 'CV Rewrite',
        description: 'Full rewrite with buzzwords removed, weak verbs replaced, and impact quantified for ATS.',
        price: 160,
        eta: '2–3 business days',
        category: 'rewrite',
        features: ['ATS-safe single-column layout', 'Keyword alignment', '2 revision rounds'],
    },
    {
        id: 'cv-rewrite-mid',
        name: 'CV Rewrite — Mid-Level',
        description: 'Rewrite tailored for mid-career professionals with leadership and project depth.',
        price: 210,
        eta: '2–3 business days',
        category: 'rewrite',
        features: ['Impact-focused bullets', 'Role targeting', '2 revision rounds'],
        popular: true,
    },
    {
        id: 'cv-rewrite-senior',
        name: 'CV Rewrite — Senior',
        description: 'Executive-ready narrative for senior specialists and managers.',
        price: 280,
        eta: '3–4 business days',
        category: 'rewrite',
        features: ['Leadership framing', 'Scope & metrics polish', '2 revision rounds'],
    },
    {
        id: 'linkedin-fix',
        name: 'LinkedIn Profile Fix',
        description: 'Headline options, About rewrite, skills and featured section guidance.',
        price: 160,
        eta: '2 business days',
        category: 'linkedin',
        features: ['3 headline options', 'Full About section', 'Skills recommendations'],
    },
    {
        id: 'cover-letter',
        name: 'Cover Letter',
        description: 'Role-specific cover letter written for one company and vacancy.',
        price: 100,
        eta: '1–2 business days',
        category: 'letter',
        features: ['Company research tone', 'ATS-friendly format', '1 revision'],
    },
    {
        id: 'interview-prep',
        name: 'Interview Prep Guide',
        description: 'Role-specific questions and STAR model answers.',
        price: 200,
        eta: '2–3 business days',
        category: 'prep',
        features: ['Role-specific Q&A', 'STAR frameworks', 'Salary talk tips'],
    },
    {
        id: 'coaching',
        name: 'Coaching Session',
        description: '30–60 minute deep call on interviews, positioning, and next moves.',
        price: 320,
        eta: 'Scheduled',
        category: 'coaching',
        features: ['Live video session', 'Action plan notes', 'Follow-up checklist'],
    },
    {
        id: 'career-kit',
        name: 'The Career Kit',
        description: 'Complete package: CV Rewrite, LinkedIn Fix, Cover Letter, and Interview Prep.',
        price: 580,
        eta: '5–7 business days',
        category: 'kit',
        features: ['CV + LinkedIn + letter', 'Interview prep guide', 'Priority turnaround'],
        popular: true,
    },
];

export { formatZar } from '@/data/launchpad/currencies';
