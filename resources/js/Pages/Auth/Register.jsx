import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="min-h-screen w-96 flex items-center justify-center bg-gradient-to-br p-6">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 sm:p-10">
                    <h2 className="text-3xl font-bold text-green-600 text-center mb-6">
                        Create Your Account
                    </h2>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2 text-sm text-red-500" />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
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
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2 text-sm text-red-500" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2 text-sm text-red-500"
                            />
                        </div>

                        <PrimaryButton
                            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md transition"
                            disabled={processing}
                        >
                            Register
                        </PrimaryButton>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link
                            href={route('login')}
                            className="text-green-600 font-medium hover:text-green-700 underline"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </GuestLayout>
    );
}
