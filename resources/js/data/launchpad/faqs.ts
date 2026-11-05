export type LaunchpadFaq = {
    question: string;
    answer: string;
};

export const launchpadFaqs: LaunchpadFaq[] = [
    {
        question: 'What do I need to send you?',
        answer: 'For a CV Rewrite: your current CV and the kind of roles you want. For LinkedIn: your profile URL. For a cover letter: the job description and company name.',
    },
    {
        question: 'Do you work with people outside South Africa?',
        answer: 'Yes. We work with clients worldwide. Pricing is shown in ZAR; international clients can pay online after checkout.',
    },
    {
        question: 'Which service should I choose?',
        answer: 'If your CV is outdated, start with a CV Rewrite. Applying actively? Add LinkedIn and a cover letter. Want everything aligned — choose The Career Kit.',
    },
    {
        question: 'Are the free tools really free?',
        answer: 'Yes. The ATS checker and related free tools on this site do not require payment. Professional rewrite and coaching services are paid.',
    },
    {
        question: 'Will my CV be ATS-friendly?',
        answer: 'We default to clean, single-column, ATS-safe layouts — the style that passes automated screens without sacrificing readability.',
    },
];
