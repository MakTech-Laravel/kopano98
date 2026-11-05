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
        name: 'Kopano Thantsha',
        role: 'Founder · Career Strategist',
        bio: 'Built Launchpad around the gap between what someone can do and whether a recruiter sees it — Deep Scan, LinkedIn Pro, and hands-on CV work that stays current with real hiring.',
        tags: ['Strategy', 'Deep Scan', 'Coaching'],
        image: '/images/launchpad/team/kopano.jpg',
    },
    {
        id: 'writer-a',
        name: 'Career Writer',
        role: 'Senior CV Specialist',
        bio: 'Turns messy experience into quantified, ATS-safe stories without sounding robotic.',
        tags: ['CV', 'ATS', 'Mid–Senior'],
        image: '/images/launchpad/photos/photo-1.jpg',
    },
    {
        id: 'writer-b',
        name: 'Profile Specialist',
        role: 'LinkedIn & Branding',
        bio: 'Headlines, About sections, and positioning that match how recruiters actually search.',
        tags: ['LinkedIn', 'Positioning'],
        image: '/images/launchpad/photos/photo-2.jpg',
    },
    {
        id: 'coach',
        name: 'Interview Coach',
        role: 'Coaching Lead',
        bio: 'STAR answers, salary conversations, and calm performance under pressure.',
        tags: ['Interviews', 'STAR'],
        image: '/images/launchpad/photos/photo-3.jpg',
    },
];
