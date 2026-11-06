export type CvExperience = {
    title: string;
    company: string;
    dates: string;
    description: string;
};

export type CvEducation = {
    school: string;
    qualification: string;
    dates: string;
};

export type CvDocument = {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    experience: CvExperience[];
    education: CvEducation[];
    skills: string[];
    photoDataUrl: string | null;
};

export const defaultCvDocument: CvDocument = {
    name: 'Naledi Mokoena',
    title: 'Senior Sales Manager',
    email: 'naledi@email.com',
    phone: '072 458 3310',
    location: 'Bloemfontein',
    summary:
        'Sales manager with 5+ years driving loyalty programmes and retail growth across Free State teams.',
    experience: [
        {
            title: 'Senior Sales Manager',
            company: 'Mangaung Agricultural Co-op',
            dates: '2021 – Present',
            description:
                'Led regional sales teams and improved retention through structured coaching.',
        },
        {
            title: 'Sales Manager',
            company: 'Rainbow Trade Holdings',
            dates: '2019 – 2021',
            description:
                'Grew retail accounts and introduced weekly pipeline reviews.',
        },
    ],
    education: [
        {
            school: 'University of the Free State',
            qualification: 'BCom Marketing',
            dates: '2015 – 2018',
        },
    ],
    skills: ['Sales leadership', 'Merchandising', 'Loss prevention', 'CRM'],
    photoDataUrl: null,
};

export function cvContactLine(document: CvDocument): string {
    return [document.location, document.phone, document.email]
        .filter(Boolean)
        .join(' · ');
}

export function cvInitials(name: string): string {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('');
}
