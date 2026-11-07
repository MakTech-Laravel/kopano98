/**
 * Static sample CV used for template thumbnails.
 * Matches the Launchpad PNG frames (Naledi Mokoena / Senior Sales Manager).
 */
export type SampleCv = {
    name: string;
    tagline: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    summary: string;
    skills: string[];
    roles: Array<{
        title: string;
        company: string;
        dates: string;
        bullets: string[];
    }>;
    education: Array<{
        qualification: string;
        institution: string;
        year: string;
    }>;
    languages: Array<{ name: string; level: string }>;
    certifications: string[];
    references: Array<{
        name: string;
        relationship: string;
        phone: string;
    }>;
};

export const sampleCv: SampleCv = {
    name: 'Naledi Mokoena',
    tagline: 'Senior Sales Manager',
    email: 'naledi.mokoena@email.com',
    phone: '072 458 3310',
    location: 'Bloemfontein, Free State 9301',
    linkedin: 'linkedin.com/in/naledimokoena',
    summary:
        'Motivated sales manager with five years of experience growing revenue and customer loyalty through individualised service. Resourceful at learning customer needs and upselling to meet quotas, with a track record of strengthening the customer experience.',
    skills: [
        'Store opening and closing',
        'Sales expertise',
        'Accurate money handling',
        'Store merchandising',
        'Loss prevention',
        'Product promotions',
    ],
    roles: [
        {
            title: 'Senior Sales Manager',
            company: 'Mangaung Agricultural Cooperative, Bloemfontein',
            dates: '05/2021 – Current',
            bullets: [
                'Acted as a thought leader by earning the respect and trust of customers and competitors through persuasive writing and presentations.',
                'Led the sales team to exceed quarterly targets by implementing new sales strategies and monitoring performance metrics closely.',
                'Facilitated weekly team meetings to discuss targets, share best practice and address challenges.',
            ],
        },
        {
            title: 'Sales Manager',
            company: 'Rainbow Trade Holdings, Bloemfontein',
            dates: '01/2019 – 03/2021',
            bullets: [
                'Created over 60 quotes per week with consistently positive customer-satisfaction scores.',
                'Upsold add-on services and extended warranties, increasing store sales by R3 800 per month.',
            ],
        },
    ],
    education: [
        {
            qualification: 'Bachelor of Commerce: Business Management',
            institution: 'University of the Free State, Bloemfontein',
            year: 'December 2018',
        },
    ],
    languages: [
        { name: 'Sesotho', level: 'speak fluent, write fluent' },
    ],
    certifications: ['Retail Management Certificate – Services SETA'],
    references: [
        {
            name: 'Thabo Molefe',
            relationship: 'Regional Manager, Mangaung Agricultural Cooperative',
            phone: '082 000 1111',
        },
    ],
};

export function sampleInitials(name: string = sampleCv.name): string {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('');
}

export function sampleContactLine(cv: SampleCv = sampleCv): string {
    return [cv.location, cv.phone, cv.email, cv.linkedin].join(' · ');
}

export function cloneSampleCv(overrides: Partial<SampleCv> = {}): SampleCv {
    return {
        ...sampleCv,
        ...overrides,
        skills: overrides.skills ?? [...sampleCv.skills],
        roles: overrides.roles ?? sampleCv.roles.map((role) => ({ ...role, bullets: [...role.bullets] })),
        education: overrides.education ?? sampleCv.education.map((item) => ({ ...item })),
        languages: overrides.languages ?? sampleCv.languages.map((item) => ({ ...item })),
        certifications: overrides.certifications ?? [...sampleCv.certifications],
        references: overrides.references ?? sampleCv.references.map((item) => ({ ...item })),
    };
}
