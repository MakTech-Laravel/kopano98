export type LaunchpadTestimonial = {
    quote: string;
    name: string;
    role: string;
    service: string;
    photo: string;
};

export const launchpadTestimonials: LaunchpadTestimonial[] = [
    {
        quote: 'I had been applying for 3 months with no callbacks. After Launchpad rewrote my CV I got two interview calls in the first week. Honestly did not expect it to work that fast.',
        name: 'Thabo M.',
        role: 'Civil Engineer · Gauteng',
        service: 'CV Rewrite',
        photo: '/images/launchpad/reviews/thabo.jpg',
    },
    {
        quote: 'My LinkedIn had been the same for years and I never thought much of it. After the overhaul recruiters started reaching out within days. The headline alone made such a big difference.',
        name: 'Naledi K.',
        role: 'HR Manager · Johannesburg',
        service: 'LinkedIn Profile Fix',
        photo: '/images/launchpad/reviews/naledi.jpg',
    },
    {
        quote: 'I was switching careers and really struggled to explain my background on paper. They just got it straight away and put together something I was actually proud to send out. Worth every cent.',
        name: 'Siyanda D.',
        role: 'Finance to Project Management · Cape Town',
        service: 'CV Rewrite',
        photo: '/images/launchpad/reviews/siyanda.jpg',
    },
];
