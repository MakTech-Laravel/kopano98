export type ServiceGroup =
    | 'cv-rewrite'
    | 'linkedin'
    | 'more'
    | 'package'
    | 'portfolio';

export type LaunchpadService = {
    id: string;
    name: string;
    description: string;
    price: number;
    compareAt?: number;
    eta: string;
    features: string[];
    popular?: boolean;
    badge?: string;
    group: ServiceGroup;
    category: 'rewrite' | 'linkedin' | 'letter' | 'prep' | 'coaching' | 'kit' | 'other';
    unit?: string;
};

export const launchpadServices: LaunchpadService[] = [
    {
        id: 'cv-rewrite-entry',
        name: 'CV Rewrite — Graduate',
        description: '6-second, eye-catching CV for 0–2 years experience.',
        price: 160,
        eta: '1–2 business days',
        category: 'rewrite',
        group: 'cv-rewrite',
        badge: '0–2 years',
        features: [
            '6-second, eye-catching CV',
            'Buzzwords stripped, role positioned',
            'Built to ATS standards',
            'Hire-ready',
            '5× revisions included',
        ],
    },
    {
        id: 'cv-rewrite-mid',
        name: 'CV Rewrite — Mid-Level',
        description: 'Impact-focused rewrite for 2–5 years experience.',
        price: 210,
        eta: '1–2 business days',
        category: 'rewrite',
        group: 'cv-rewrite',
        badge: '2–5 years',
        features: [
            '6-second, eye-catching CV',
            'Buzzwords stripped, role positioned',
            'Built to ATS standards',
            'Hire-ready',
            '5× revisions included',
        ],
    },
    {
        id: 'cv-rewrite-senior',
        name: 'CV Rewrite — Senior',
        description: 'Senior narrative for 5–10 years experience.',
        price: 280,
        eta: '1–2 business days',
        category: 'rewrite',
        group: 'cv-rewrite',
        badge: '5–10 years',
        popular: true,
        features: [
            '6-second, eye-catching CV',
            'Buzzwords stripped, role positioned',
            'Built to ATS standards',
            'Hire-ready',
            '5× revisions included',
        ],
    },
    {
        id: 'cv-rewrite-executive',
        name: 'CV Rewrite — Executive',
        description: 'Executive-ready rewrite for 10+ years experience.',
        price: 320,
        eta: '1–2 business days',
        category: 'rewrite',
        group: 'cv-rewrite',
        badge: '10+ years',
        features: [
            '6-second, eye-catching CV',
            'Buzzwords stripped, role positioned',
            'Built to ATS standards',
            'Hire-ready',
            '5× revisions included',
        ],
    },
    {
        id: 'linkedin-graduate',
        name: 'LinkedIn Profile Fix — Graduate',
        description: 'Full LinkedIn rewrite for early-career profiles.',
        price: 130,
        eta: '1–2 business days',
        category: 'linkedin',
        group: 'linkedin',
        badge: '0–2 years',
        features: [
            'Full rewrite: headline, About, skills',
            'Before | after improvement report',
            'Boosts search visibility up to 3×',
            'Photo & banner impact suggestions',
            '5× revisions included',
        ],
    },
    {
        id: 'linkedin-mid',
        name: 'LinkedIn Profile Fix — Mid-Level',
        description: 'Recruiter-ready LinkedIn for mid-career professionals.',
        price: 160,
        eta: '1–2 business days',
        category: 'linkedin',
        group: 'linkedin',
        badge: '2–5 years',
        features: [
            'Full rewrite: headline, About, skills',
            'Before | after improvement report',
            'Boosts search visibility up to 3×',
            'Photo & banner impact suggestions',
            '5× revisions included',
        ],
    },
    {
        id: 'linkedin-senior',
        name: 'LinkedIn Profile Fix — Senior',
        description: 'Senior LinkedIn positioning for 5–10 years experience.',
        price: 200,
        eta: '1–2 business days',
        category: 'linkedin',
        group: 'linkedin',
        badge: '5–10 years',
        popular: true,
        features: [
            'Full rewrite: headline, About, skills',
            'Before | after improvement report',
            'Boosts search visibility up to 3×',
            'Photo & banner impact suggestions',
            '5× revisions included',
        ],
    },
    {
        id: 'linkedin-executive',
        name: 'LinkedIn Profile Fix — Executive',
        description: 'Executive LinkedIn rewrite for 10+ years experience.',
        price: 250,
        eta: '1–2 business days',
        category: 'linkedin',
        group: 'linkedin',
        badge: '10+ years',
        features: [
            'Full rewrite: headline, About, skills',
            'Before | after improvement report',
            'Boosts search visibility up to 3×',
            'Photo & banner impact suggestions',
            '5× revisions included',
        ],
    },
    {
        id: 'job-card',
        name: 'Job Card',
        description: 'Tailored to one specific job posting so keywords are never missed.',
        price: 100,
        eta: '1–2 business days',
        category: 'other',
        group: 'more',
        badge: '1 specific job posting',
        features: [
            'Matched to this employer’s scanning language',
            'Positioned to beat other applicants',
            'Keyword coverage for ATS filters',
            '5× revisions included',
        ],
    },
    {
        id: 'cv-rewrite-tailoring',
        name: 'CV Rewrite + Tailoring',
        description: 'Full rewrite matched to up to 2 target roles.',
        price: 300,
        eta: '1–2 business days',
        category: 'rewrite',
        group: 'more',
        badge: 'Best value',
        features: [
            'Full CV rewritten from scratch',
            'Matched to up to 2 target roles',
            'Right keywords for each role',
            '5× revisions included',
        ],
    },
    {
        id: 'cover-letter',
        name: 'Cover Letter',
        description: 'Role-specific letter that gets your CV opened.',
        price: 70,
        eta: 'Same day',
        category: 'letter',
        group: 'more',
        unit: 'per letter',
        features: [
            'Built around this role — not a recycled template',
            'Written to stop a hiring manager mid-scroll',
            'ATS-friendly format',
            '5× revisions included',
        ],
    },
    {
        id: 'interview-prep',
        name: 'Interview Prep Guide',
        description: 'Role-specific questions with STAR model answers.',
        price: 120,
        eta: 'Same day',
        category: 'prep',
        group: 'more',
        features: [
            'Likely questions for this exact role',
            'STAR-method answers that land',
            'Opening & closing scripts',
            'Salary talk tips',
        ],
    },
    {
        id: 'coaching',
        name: 'Coaching Session',
        description: 'Direct feedback call on interviews and positioning.',
        price: 350,
        eta: '1–2 business days',
        category: 'coaching',
        group: 'more',
        unit: 'per session',
        features: [
            'Unfiltered feedback — no sugarcoating',
            'Find what silently costs you offers',
            'Action plan for every interview after',
        ],
    },
    {
        id: 'job-search-strategy',
        name: 'Job Search Strategy',
        description: 'A targeted plan for where to focus and how to get noticed.',
        price: 70,
        eta: 'Same day',
        category: 'other',
        group: 'more',
        features: [
            'Stop applying blind',
            'Where to focus next',
            'How to get noticed before you apply',
            'Clear next steps',
        ],
    },
    {
        id: 'essentials',
        name: 'The Essentials',
        description: 'CV Rewrite + LinkedIn Profile Fix with before/after reports.',
        price: 310,
        eta: '1–2 business days',
        category: 'kit',
        group: 'package',
        badge: 'Starter',
        features: [
            'CV Rewrite',
            'LinkedIn Profile Fix',
            'CV optimisation report',
            'LinkedIn optimisation report',
            'LinkedIn photo suggestions',
            'Revisions until you are happy',
        ],
    },
    {
        id: 'full-profile',
        name: 'The Full Profile',
        description: 'CV, LinkedIn, cover letter and interview prep — most popular bundle.',
        price: 430,
        compareAt: 480,
        eta: '1–2 business days',
        category: 'kit',
        group: 'package',
        badge: 'Professional',
        popular: true,
        features: [
            'CV Rewrite',
            'LinkedIn Profile Fix',
            'Cover Letter (1 role)',
            'Interview Prep Guide',
            'Optimisation reports',
            'LinkedIn photo suggestions',
            'Revisions until you are happy',
        ],
    },
    {
        id: 'career-kit',
        name: 'The Career Kit',
        description: 'Complete elite package including coaching with Kopano.',
        price: 680,
        compareAt: 900,
        eta: '1–2 business days',
        category: 'kit',
        group: 'package',
        badge: 'Elite',
        features: [
            'CV Rewrite',
            'LinkedIn Profile Fix',
            'Cover Letter (2 roles)',
            'Interview Prep Guide',
            'Coaching Session with Kopano',
            'Job Search Strategy Guide',
            'Revisions until you are happy',
        ],
    },
    {
        id: 'job-hunter-pack',
        name: 'The Job Hunter Pack',
        description: 'CV + LinkedIn + tailoring for 2 roles — best for active hunters.',
        price: 480,
        eta: '1–2 business days',
        category: 'kit',
        group: 'package',
        badge: 'Best for Job Hunters',
        features: [
            'CV Rewrite',
            'LinkedIn Profile Fix',
            'CV Tailoring for 2 roles',
            'Optimisation reports',
            'ATS score for each tailored version',
            'Revisions until you are happy',
        ],
    },
    {
        id: 'portfolio-pdf',
        name: 'Portfolio — PDF',
        description: 'Professional PDF portfolio — from cover page to contact.',
        price: 280,
        eta: '3–5 business days',
        category: 'other',
        group: 'portfolio',
        badge: 'From',
        unit: 'base + R100/project',
        features: [
            'Cover page',
            'Intro & bio page',
            'Contact page',
            'Professional formatting',
            'Photos added per project',
            '+R100 per additional project',
        ],
    },
    {
        id: 'portfolio-web',
        name: 'Portfolio — Website',
        description: 'Live portfolio site with hosting for 1 year.',
        price: 600,
        eta: '3–5 business days',
        category: 'other',
        group: 'portfolio',
        badge: 'From',
        unit: 'base + R100/project',
        features: [
            'Site structure & navigation',
            'Intro & bio page',
            'Contact page',
            'SEO & Google visibility setup',
            'Domain + hosting (1 year)',
            'Live URL delivery',
            '+R100 per additional project',
        ],
    },
];

export const serviceGroups: {
    id: ServiceGroup;
    label: string;
    title: string;
    note?: string;
}[] = [
        {
            id: 'cv-rewrite',
            label: 'CV Rewrite',
            title: 'CV Rewrite',
            note: 'Priced by experience',
        },
        {
            id: 'linkedin',
            label: 'LinkedIn',
            title: 'LinkedIn Profile Fix',
            note: 'Priced by experience',
        },
        {
            id: 'more',
            label: 'More',
            title: 'More Services',
            note: 'Flat price, every time',
        },
        {
            id: 'package',
            label: 'Packages',
            title: 'Bundle and save',
            note: 'All packages include human review',
        },
        {
            id: 'portfolio',
            label: 'Portfolio',
            title: 'Portfolio Bundles',
            note: 'Priced for exactly what you’re building',
        },
    ];

export function servicesInGroup(group: ServiceGroup): LaunchpadService[] {
    return launchpadServices.filter((service) => service.group === group);
}

export { formatZar } from '@/data/launchpad/currencies';
