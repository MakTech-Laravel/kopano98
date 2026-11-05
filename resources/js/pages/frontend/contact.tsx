import { Head } from '@inertiajs/react';
import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';

import { SectionHeading } from '@/components/launchpad/section-heading';
import LaunchpadLayout from '@/layouts/launchpad-layout';

export default function Contact() {
    const [sent, setSent] = useState(false);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSent(true);
        toast.success('Message captured (UI only)', {
            description: 'Backend email delivery arrives in a later milestone.',
        });
        event.currentTarget.reset();
    };

    return (
        <LaunchpadLayout>
            <Head title="Contact | Launchpad Careers" />

            <section className="py-10 sm:py-12">
                <div className="container">
                    <div className="mx-auto max-w-3xl">
                        <SectionHeading
                            label="Contact"
                            title="Talk to Launchpad."
                            subtitle="Questions about a rewrite, LinkedIn fix, or coaching session — send a note or WhatsApp."
                        />

                        {sent ? (
                            <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                                Thanks — we received your message in this demo UI.
                            </div>
                        ) : null}

                        <form
                            onSubmit={onSubmit}
                            className="space-y-4 rounded-lg border border-[var(--lp-border)] bg-white p-4 sm:p-6"
                        >
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="block">
                                    <span className="mb-1 block text-[0.72rem] font-bold tracking-wide text-[var(--lp-text-mid)] uppercase">
                                        Name
                                    </span>
                                    <input
                                        required
                                        name="name"
                                        className="w-full rounded-md border-[1.5px] border-[var(--lp-border)] px-3 py-2.5 text-sm outline-none focus:border-[var(--lp-navy)]"
                                    />
                                </label>
                                <label className="block">
                                    <span className="mb-1 block text-[0.72rem] font-bold tracking-wide text-[var(--lp-text-mid)] uppercase">
                                        Email
                                    </span>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        className="w-full rounded-md border-[1.5px] border-[var(--lp-border)] px-3 py-2.5 text-sm outline-none focus:border-[var(--lp-navy)]"
                                    />
                                </label>
                            </div>
                            <label className="block">
                                <span className="mb-1 block text-[0.72rem] font-bold tracking-wide text-[var(--lp-text-mid)] uppercase">
                                    Message
                                </span>
                                <textarea
                                    required
                                    name="message"
                                    rows={5}
                                    className="w-full rounded-md border-[1.5px] border-[var(--lp-border)] px-3 py-2.5 text-sm outline-none focus:border-[var(--lp-navy)]"
                                />
                            </label>
                            <button
                                type="submit"
                                className="btn-lp-navy w-full px-5 py-2.5 text-sm sm:w-auto"
                            >
                                Send message
                            </button>
                        </form>

                        <p className="text-lp-mid mt-6 text-sm text-pretty">
                            Prefer WhatsApp?{' '}
                            <a
                                href="https://wa.me/27822192256?text=Hi%2C%20I%20have%20a%20question%20about%20Launchpad%20Careers."
                                className="font-semibold text-[var(--lp-gold-on-light)] hover:underline"
                            >
                                Message +27 82 219 2256
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </LaunchpadLayout>
    );
}
