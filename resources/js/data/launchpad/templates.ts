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

const palette = (
    primary: string,
    ...rest: string[]
): string[] => [primary, ...rest].slice(0, 5);

/**
 * Templates with WebP frames (converted from Launchpad PNGs) plus live
 * editable previews that use the same sample CV info as those frames.
 */
export const launchpadTemplates: LaunchpadTemplate[] = [
    {
        id: 'classic',
        name: 'Classic',
        description:
            'Centred serif name, ruled sections. Corporate, finance, law.',
        style: 'traditional',
        experience: ['3to5', '5to10', '10plus'],
        withPhoto: false,
        columns: 1,
        atsSafe: true,
        colors: palette('#000000', '#0d1b2a', '#2563eb', '#16a34a', '#c2660c'),
        image: '/images/launchpad/templates/classic.webp',
        recommended: true,
    },
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'No colour at all. Maximum ATS compatibility.',
        style: 'traditional',
        experience: ['none', 'lt3', '3to5', '5to10', '10plus'],
        withPhoto: false,
        columns: 1,
        atsSafe: true,
        colors: palette('#1f2937', '#0d1b2a', '#2563eb', '#16a34a', '#c2660c'),
        image: '/images/launchpad/templates/minimal.webp',
        recommended: true,
    },
    {
        id: 'elegant',
        name: 'Elegant',
        description:
            'Refined serif, ruled headings. Consulting, academia.',
        style: 'traditional',
        experience: ['3to5', '5to10', '10plus'],
        withPhoto: true,
        columns: 1,
        atsSafe: true,
        colors: palette('#6b1f2a', '#0d1b2a', '#334155', '#b8943f', '#2563eb'),
        image: '/images/launchpad/templates/elegant.webp',
    },
    {
        id: 'executive',
        name: 'Executive',
        description: 'Formal serif throughout. Senior and executive roles.',
        style: 'traditional',
        experience: ['5to10', '10plus'],
        withPhoto: true,
        columns: 1,
        atsSafe: true,
        colors: palette('#0D1B2A', '#0f766e', '#d4a842', '#1f2430', '#2563eb'),
        image: '/images/launchpad/templates/executive.webp',
        recommended: true,
    },
    {
        id: 'public',
        name: 'Public Service',
        description: 'Plain and sober. The CV that attaches to a Z83.',
        style: 'traditional',
        experience: ['lt3', '3to5', '5to10', '10plus'],
        withPhoto: false,
        columns: 1,
        atsSafe: true,
        colors: palette('#1f2430', '#0d1b2a', '#2563eb', '#14746b', '#c2660c'),
        image: '/images/launchpad/templates/public.webp',
    },
    {
        id: 'oxford',
        name: 'Oxford',
        description: 'Small-caps serif, double rules. Academic and legal.',
        style: 'traditional',
        experience: ['lt3', '3to5', '5to10'],
        withPhoto: false,
        columns: 1,
        atsSafe: true,
        colors: palette('#1f2937', '#0d1b2a', '#1e3a5f', '#b68f24', '#2563eb'),
        image: '/images/launchpad/templates/oxford.webp',
    },
    {
        id: 'heritage',
        name: 'Heritage',
        description: 'Serif with a formal portrait, double rule.',
        style: 'traditional',
        experience: ['5to10', '10plus'],
        withPhoto: true,
        columns: 1,
        atsSafe: true,
        colors: palette('#48243d', '#0d1b2a', '#b8943f', '#1f2430', '#2563eb'),
        image: '/images/launchpad/templates/heritage.webp',
    },
    {
        id: 'notary',
        name: 'Notary',
        description: 'Sober two-column serif. Government and legal.',
        style: 'traditional',
        experience: ['3to5', '5to10', '10plus'],
        withPhoto: true,
        columns: 2,
        atsSafe: true,
        colors: palette('#2b2f36', '#0d1b2a', '#334155', '#2563eb', '#c2660c'),
        image: '/images/launchpad/templates/notary.webp',
    },
    {
        id: 'modern',
        name: 'Modern',
        description: 'Bold clean header. Current without being risky.',
        style: 'contemporary',
        experience: ['lt3', '3to5', '5to10'],
        withPhoto: true,
        columns: 1,
        atsSafe: true,
        colors: palette('#2b8ccf', '#0d1b2a', '#16a34a', '#c2660c', '#7c2d92'),
        image: '/images/launchpad/templates/modern.webp',
    },
    {
        id: 'graduate',
        name: 'Graduate',
        description: 'Education-forward. School leavers and new graduates.',
        style: 'contemporary',
        experience: ['none', 'lt3'],
        withPhoto: true,
        columns: 1,
        atsSafe: true,
        colors: palette('#2e7d4f', '#0d1b2a', '#2563eb', '#c2660c', '#7c2d92'),
        image: '/images/launchpad/templates/graduate.webp',
        recommended: true,
    },
    {
        id: 'bannerdark',
        name: 'Banner Dark',
        description: 'Dark banner header. Confident and modern.',
        style: 'contemporary',
        experience: ['3to5', '5to10', '10plus'],
        withPhoto: true,
        columns: 1,
        atsSafe: true,
        colors: palette('#b0322f', '#0d1b2a', '#1e40af', '#d4a842', '#7c2d92'),
        image: '/images/launchpad/templates/bannerdark.webp',
    },
    {
        id: 'skills',
        name: 'Skills-first',
        description: 'Skills lead the page. Career changers.',
        style: 'contemporary',
        experience: ['lt3', '3to5', '5to10'],
        withPhoto: true,
        columns: 1,
        atsSafe: true,
        colors: palette('#17847a', '#0d1b2a', '#2563eb', '#c2660c', '#7c2d92'),
        image: '/images/launchpad/templates/skills.webp',
    },
    {
        id: 'stripe',
        name: 'Top Stripe',
        description: 'Bold colour stripe, uppercase name, skill chips.',
        style: 'contemporary',
        experience: ['none', 'lt3', '3to5'],
        withPhoto: false,
        columns: 1,
        atsSafe: true,
        colors: palette('#c2410c', '#0d1b2a', '#2563eb', '#16a34a', '#7c2d92'),
        image: '/images/launchpad/templates/stripe.webp',
    },
    {
        id: 'cleanline',
        name: 'Clean Line',
        description:
            'One accent rule under the name. Nothing to trip a scanner.',
        style: 'contemporary',
        experience: ['none', 'lt3', '3to5', '5to10', '10plus'],
        withPhoto: false,
        columns: 1,
        atsSafe: true,
        colors: palette('#1b3a6b', '#0d1b2a', '#2563eb', '#16a34a', '#c2660c'),
        image: '/images/launchpad/templates/cleanline.webp',
    },
    {
        id: 'sidebar-navy',
        name: 'Sidebar Navy',
        description:
            'Coloured side column for photo, contact and skills.',
        style: 'contemporary',
        experience: ['lt3', '3to5', '5to10'],
        withPhoto: true,
        columns: 2,
        atsSafe: true,
        colors: palette('#0d1b2a', '#1e40af', '#14746b', '#d4a842', '#7c2d92'),
        image: '/images/launchpad/templates/sidebarNavy.webp',
    },
    {
        id: 'vertnavy',
        name: 'Vertical Navy',
        description: 'Name runs up the left edge. Distinctive.',
        style: 'creative',
        experience: ['lt3', '3to5', '5to10'],
        withPhoto: false,
        columns: 1,
        atsSafe: true,
        colors: palette('#0d1b2a', '#1e40af', '#d4a842', '#7c2d92', '#16a34a'),
        image: '/images/launchpad/templates/vertnavy.webp',
    },
    {
        id: 'monocircle',
        name: 'Monogram Circle',
        description: 'Initials badge with photo. Modern personal brand.',
        style: 'creative',
        experience: ['lt3', '3to5', '5to10'],
        withPhoto: true,
        columns: 1,
        atsSafe: true,
        colors: palette('#c95d1f', '#0d1b2a', '#2563eb', '#7c2d92', '#16a34a'),
        image: '/images/launchpad/templates/monocircle.webp',
    },
    {
        id: 'accentblock',
        name: 'Accent Block',
        description:
            'Full-colour header block, no photo. Bold but scannable.',
        style: 'creative',
        experience: ['none', 'lt3', '3to5', '5to10'],
        withPhoto: false,
        columns: 1,
        atsSafe: true,
        colors: palette('#14746b', '#0d1b2a', '#c2660c', '#16a34a', '#7c2d92'),
        image: '/images/launchpad/templates/accentblock.webp',
    },
    {
        id: 'circleheader',
        name: 'Circle Header',
        description: 'Round photo centred above the name. Friendly.',
        style: 'creative',
        experience: ['none', 'lt3', '3to5'],
        withPhoto: true,
        columns: 1,
        atsSafe: true,
        colors: palette('#14746b', '#0d1b2a', '#2563eb', '#c2660c', '#7c2d92'),
        image: '/images/launchpad/templates/circleheader.webp',
    },
];
