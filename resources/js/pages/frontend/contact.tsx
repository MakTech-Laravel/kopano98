import { Head } from '@inertiajs/react';
import { Clock3, Mail, MapPin } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';

import { FadeIn, Reveal } from '@/components/launchpad/reveal';
import { SectionHeading } from '@/components/launchpad/section-heading';
import LaunchpadLayout from '@/layouts/launchpad-layout';

const CONTACT_EMAIL = 'info@launchpadcareers.co.za';
const WHATSAPP_URL =
    'https://wa.me/27822192256?text=Hi%20Launchpad%2C%20I%20would%20like%20to%20find%20out%20more%20about%20your%20services.';

const topics = [
    'Question about a service',
    'Help choosing a package',
    'Existing order query',
    'Report a bug',
    'Partnership or referral',
    'Something else',
] as const;

export default function Contact() {
    const [sent, setSent] = useState(false);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const name = String(data.get('name') ?? '').trim();
        const email = String(data.get('email') ?? '').trim();
        const topic = String(data.get('topic') ?? '').trim();
        const message = String(data.get('message') ?? '').trim();

        const subject = encodeURIComponent(
            topic ? `Launchpad enquiry — ${topic}` : 'Launchpad enquiry',
        );
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\nTopic: ${topic || '—'}\n\n${message}`,
        );

        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        setSent(true);
        toast.success('Opening your email app…', {
            description: `We reply to ${CONTACT_EMAIL} within a few minutes, 24 hours a day.`,
        });
        form.reset();
    };

    return (
        <LaunchpadLayout>
            <Head title="Contact | Launchpad Careers" />

            <section className="py-10 sm:py-12">
                <div className="container">
                    <div className="mx-auto max-w-[680px]">
                        <FadeIn>
                            <SectionHeading
                                label="Contact Us"
                                title={
                                    <>
                                        Get in touch.
                                        <br />
                                        We would love to hear from you.
                                    </>
                                }
                                subtitle="Whether you have a question about our services, need help choosing a package, or just want to find out more — reach out and we will get back to you."
                            />
                        </FadeIn>

                        <Reveal delay={0.06}>
                            <div className="bg-lp-navy mb-4 flex flex-col gap-4 rounded-[10px] p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6">
                                <div className="bg-lp-gold text-lp-navy flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                                    <Mail className="h-6 w-6" strokeWidth={2} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[0.95rem] font-bold text-white">
                                        Email us
                                    </p>
                                    <p className="mt-1 text-[0.82rem] leading-relaxed text-white/65">
                                        The best way to reach us. Send your
                                        question or send the form below and we
                                        will reply within a few minutes, 24 hours
                                        a day.
                                    </p>
                                </div>
                                <a
                                    href="#contact-fields"
                                    className="btn-lp-gold inline-flex shrink-0 items-center justify-center px-5 py-2.5 text-[0.83rem]"
                                >
                                    Email Us
                                </a>
                            </div>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <div className="mb-4 rounded-[10px] border border-[var(--lp-border)] bg-white p-4 sm:p-5">
                                <div className="flex flex-col gap-0">
                                    <a
                                        href={`mailto:${CONTACT_EMAIL}`}
                                        className="flex items-center gap-3.5 py-1 no-underline"
                                    >
                                        <span className="bg-[var(--lp-off)] text-lp-navy flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full">
                                            <Mail className="h-[18px] w-[18px]" />
                                        </span>
                                        <span>
                                            <span className="block text-[0.72rem] font-bold tracking-[0.06em] text-[var(--lp-text-light)] uppercase">
                                                Email
                                            </span>
                                            <span className="text-lp-navy text-[0.9rem] font-semibold">
                                                {CONTACT_EMAIL}
                                            </span>
                                        </span>
                                    </a>

                                    <div className="mt-3.5 flex items-center gap-3.5 border-t border-[var(--lp-border)] pt-3.5">
                                        <span className="bg-[var(--lp-off)] text-lp-navy flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full">
                                            <Clock3 className="h-[18px] w-[18px]" />
                                        </span>
                                        <div>
                                            <p className="text-[0.72rem] font-bold tracking-[0.06em] text-[var(--lp-text-light)] uppercase">
                                                Response Time
                                            </p>
                                            <p className="text-lp-navy text-[0.9rem] font-semibold">
                                                Within a few minutes, 24 hours a
                                                day
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-3.5 flex items-center gap-3.5 border-t border-[var(--lp-border)] pt-3.5">
                                        <span className="bg-[var(--lp-off)] text-lp-navy flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full">
                                            <MapPin className="h-[18px] w-[18px]" />
                                        </span>
                                        <div>
                                            <p className="text-[0.72rem] font-bold tracking-[0.06em] text-[var(--lp-text-light)] uppercase">
                                                Based In
                                            </p>
                                            <p className="text-lp-navy text-[0.9rem] font-semibold">
                                                South Africa — serving clients
                                                locally and internationally
                                            </p>
                                        </div>
                                    </div>

                                    <a
                                        href={WHATSAPP_URL}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-3.5 flex items-center gap-3.5 border-t border-[var(--lp-border)] pt-3.5 no-underline"
                                    >
                                        <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#25D366]">
                                            <svg
                                                viewBox="0 0 24 24"
                                                className="h-[18px] w-[18px] fill-white"
                                                aria-hidden
                                            >
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.122 1.527 5.849L.057 23.5l5.797-1.522A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.52-5.16-1.426l-.37-.22-3.438.902.918-3.352-.242-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                                            </svg>
                                        </span>
                                        <span>
                                            <span className="block text-[0.72rem] font-bold tracking-[0.06em] text-[var(--lp-text-light)] uppercase">
                                                WhatsApp
                                            </span>
                                            <span className="text-lp-navy text-[0.9rem] font-semibold">
                                                +27 82 219 2256
                                            </span>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={0.14} className="rounded-[10px] border border-[var(--lp-border)] bg-white p-4 sm:p-5">
                            {sent ? (
                                <div className="py-8 text-center">
                                    <p className="mb-2 text-2xl" aria-hidden>
                                        ✅
                                    </p>
                                    <p className="text-lp-navy text-base font-bold">
                                        Email ready to send
                                    </p>
                                    <p className="text-lp-mid mt-1 text-[0.83rem]">
                                        Your email app should open with the
                                        message. We reply within a few minutes,
                                        24 hours a day.
                                    </p>
                                    <button
                                        type="button"
                                        className="text-lp-navy mt-4 inline-flex rounded-[5px] border-[1.5px] border-[var(--lp-navy)] px-4 py-2 text-[0.83rem] font-bold"
                                        onClick={() => setSent(false)}
                                    >
                                        Send another email
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-lp-navy text-base font-bold">
                                        Send us an email
                                    </h3>
                                    <p className="text-lp-mid mb-5 mt-1 text-[0.82rem]">
                                        Fill this in and we will get back to you
                                        — we reply within a few minutes, 24 hours
                                        a day.
                                    </p>

                                    <form
                                        id="contact-fields"
                                        onSubmit={onSubmit}
                                        className="space-y-4"
                                    >
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <label className="block">
                                                <span className="mb-1.5 block text-[0.72rem] font-bold tracking-[0.06em] text-[var(--lp-text-mid)] uppercase">
                                                    Your name
                                                </span>
                                                <input
                                                    required
                                                    name="name"
                                                    placeholder="Your full name"
                                                    className="text-lp-navy w-full rounded-md border-[1.5px] border-[var(--lp-border)] bg-white px-3 py-2.5 text-sm outline-none placeholder:text-[var(--lp-text-light)] focus:border-[var(--lp-navy)]"
                                                />
                                            </label>
                                            <label className="block">
                                                <span className="mb-1.5 block text-[0.72rem] font-bold tracking-[0.06em] text-[var(--lp-text-mid)] uppercase">
                                                    Email
                                                </span>
                                                <input
                                                    required
                                                    type="email"
                                                    name="email"
                                                    placeholder="you@email.com"
                                                    className="text-lp-navy w-full rounded-md border-[1.5px] border-[var(--lp-border)] bg-white px-3 py-2.5 text-sm outline-none placeholder:text-[var(--lp-text-light)] focus:border-[var(--lp-navy)]"
                                                />
                                            </label>
                                        </div>

                                        <label className="block">
                                            <span className="mb-1.5 block text-[0.72rem] font-bold tracking-[0.06em] text-[var(--lp-text-mid)] uppercase">
                                                What can we help with?
                                            </span>
                                            <select
                                                required
                                                name="topic"
                                                defaultValue=""
                                                className="text-lp-navy w-full rounded-md border-[1.5px] border-[var(--lp-border)] bg-white px-3 py-2.5 text-sm outline-none focus:border-[var(--lp-navy)]"
                                            >
                                                <option value="" disabled>
                                                    Select a topic…
                                                </option>
                                                {topics.map((topic) => (
                                                    <option
                                                        key={topic}
                                                        value={topic}
                                                    >
                                                        {topic}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>

                                        <label className="block">
                                            <span className="mb-1.5 block text-[0.72rem] font-bold tracking-[0.06em] text-[var(--lp-text-mid)] uppercase">
                                                Message
                                            </span>
                                            <textarea
                                                required
                                                name="message"
                                                rows={5}
                                                placeholder="Tell us what you need and we will point you in the right direction…"
                                                className="text-lp-navy w-full rounded-md border-[1.5px] border-[var(--lp-border)] bg-white px-3 py-2.5 text-sm outline-none placeholder:text-[var(--lp-text-light)] focus:border-[var(--lp-navy)]"
                                            />
                                        </label>

                                        <button
                                            type="submit"
                                            className="btn-lp-navy w-full py-3 text-sm"
                                        >
                                            Send Email
                                        </button>
                                    </form>
                                </>
                            )}
                        </Reveal>
                    </div>
                </div>
            </section>
        </LaunchpadLayout>
    );
}
