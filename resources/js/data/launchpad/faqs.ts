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
        answer: 'Yes. We work with clients worldwide. We detect your country and show prices in local currency. South African customers check out with Payfast; international customers use Paddle.',
    },
    {
        question: 'Which payment method will I use?',
        answer: 'If you are in South Africa (or nearby ZAR markets), checkout uses Payfast. Visitors from other countries are routed to Paddle so they can pay in a familiar currency without converting ZAR in their head.',
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
