import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="min-h-screen w-96 flex items-center justify-center bg-gradient-to-br p-6">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 sm:p-10">
                    <h2 className="text-3xl font-bold text-green-600 text-center mb-6">
                        Welcome Back
                    </h2>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2 text-sm text-red-500" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2 text-sm text-red-500" />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData('remember', e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>

                        <PrimaryButton
                            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md transition"
                            disabled={processing}
                        >
                            Log in
                        </PrimaryButton>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link
                            href={route('register')}
                            className="text-green-600 font-medium hover:text-green-700 underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </GuestLayout>
    );
}
