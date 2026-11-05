export type LaunchpadTeamMember = {
    id: string;
    name: string;
    role: string;
    bio: string;
    tags: string[];
    image: string;
};

export const launchpadTeam: LaunchpadTeamMember[] = [
    {
        id: 'kopano',
        name: 'Kopano',
        role: 'Founder · Career Strategist',
        bio: 'Builds Launchpad around practical hiring outcomes — clean CVs, sharper LinkedIn profiles, and interview readiness that holds up under real recruiters.',
        tags: ['Strategy', 'Rewrites', 'Coaching'],
        image: '/images/launchpad/team/F06D4E59-F097-4B36-990C-FAA2F145E63C.jpeg',
    },
    {
        id: 'writer-a',
        name: 'Career Writer',
        role: 'Senior CV Specialist',
        bio: 'Turns messy experience into quantified, ATS-safe stories without sounding robotic.',
        tags: ['CV', 'ATS', 'Mid–Senior'],
        image: '/images/launchpad/team/01C01422-53A9-4F61-A7F5-4475AD285883.jpeg',
    },
    {
        id: 'writer-b',
        name: 'Profile Specialist',
        role: 'LinkedIn & Branding',
        bio: 'Headlines, About sections, and positioning that match how recruiters actually search.',
        tags: ['LinkedIn', 'Positioning'],
        image: '/images/launchpad/team/3839FA76-DC9A-4A7E-B221-45BC398CA785.jpeg',
    },
    {
        id: 'coach',
        name: 'Interview Coach',
        role: 'Coaching Lead',
        bio: 'STAR answers, salary conversations, and calm performance under pressure.',
        tags: ['Interviews', 'STAR'],
        image: '/images/launchpad/team/6A3AA655-B042-4DAA-BB02-0E66C622074E.jpeg',
    },
];
