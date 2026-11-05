import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

export default function AdminLogin() {
    return (
        <AuthLayout
            title="Admin Access"
            description="Enter your admin credentials to continue"
            context="login"
        >
            <Head title="Admin Login" />

            <div className="w-full space-y-3 px-2 py-4 md:space-y-6 lg:space-y-10 lg:py-10">
                <div className="animate-in fade-in slide-in-from-top-2 rounded-3xl border border-primary-50/40 bg-primary-50/20 px-4 py-3 text-sm text-primary-600 duration-300 sm:px-5 sm:py-4">
                    <p className="text-xs tracking-[0.35em] text-primary-600 uppercase">
                        Admin Portal
                    </p>
                    <p className="mt-1 text-base font-medium text-primary-600">
                        Sign in with your administrator credentials.
                    </p>
                </div>

                <Form
                    action="/admin/login"
                    method="post"
                    resetOnSuccess={['password']}
                    className="space-y-3 px-1 sm:space-y-6 sm:px-0"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="space-y-3 sm:space-y-6">
                                <div className="animate-in fade-in slide-in-from-bottom-2 rounded-3xl border border-primary-50/40 bg-primary-50/20 p-4 text-foreground shadow-sm duration-300 sm:p-5">
                                    <Label
                                        htmlFor="email"
                                        className="text-xs font-semibold tracking-[0.35em] text-primary-500 uppercase"
                                    >
                                        Email address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        autoComplete="username"
                                        placeholder="admin@company.com"
                                        className="mt-2 h-11 rounded-2xl border border-muted/60 bg-white text-sm text-primary-500 placeholder:text-primary-500/60 focus:border-primary-400 focus-visible:ring-2 focus-visible:ring-primary-200 sm:h-12 sm:text-base"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="animate-in fade-in slide-in-from-bottom-2 rounded-3xl border border-primary-50/40 bg-primary-50/20 p-4 text-foreground shadow-sm duration-300 sm:p-5">
                                    <Label
                                        htmlFor="password"
                                        className="text-xs font-semibold tracking-[0.35em] text-primary-500 uppercase"
                                    >
                                        Password
                                    </Label>
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        required
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="mt-2 h-11 rounded-2xl border border-muted/60 bg-white text-sm text-primary-500 placeholder:text-primary-500/60 focus:border-primary-400 focus-visible:ring-2 focus-visible:ring-primary-200 sm:h-12 sm:text-base"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex items-center gap-2 px-1">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        name="remember"
                                        value="1"
                                        className="border-foreground/50 text-secondary focus-visible:ring-ring/50 size-4 rounded border shadow-xs outline-none focus-visible:ring-[3px]"
                                    />
                                    <Label
                                        htmlFor="remember"
                                        className="text-sm font-medium text-primary-500"
                                    >
                                        Remember me
                                    </Label>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="group relative w-full overflow-hidden rounded-3xl bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 py-4 text-sm font-semibold tracking-wide text-white shadow-lg transition hover:brightness-110 sm:py-5 sm:text-base"
                                disabled={processing}
                            >
                                <span className="relative flex items-center justify-center gap-2">
                                    {processing ? (
                                        <Spinner className="h-4 w-4" />
                                    ) : (
                                        <>
                                            <span>Admin Login</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="h-5 w-5 transition group-hover:translate-x-1"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"
                                                />
                                            </svg>
                                        </>
                                    )}
                                </span>
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </AuthLayout>
    );
}
