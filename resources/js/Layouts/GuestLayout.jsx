import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
            <header className="flex justify-between items-center py-6 px-6 md:px-12 bg-white dark:bg-gray-800 shadow-md">
                    <Link
                        href={route("story.list")}
                        className="px-4 py-2 rounded-md text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                <div className="text-2xl font-bold text-green-500 dark:text-white">
                        Fundlee
                </div>
                        {" "}
                    </Link>{" "}
                <nav className="flex gap-4">
                    <>
                        <Link
                            href={route("story.list")}
                            className="px-4 py-2 rounded-md text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                            Stories
                        </Link>
                        <Link
                            href={route("login")}
                            className="px-4 py-2 rounded-md text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                            Log In
                        </Link>
                        <Link
                            href={route("register")}
                            className="px-4 py-2 rounded-md text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                            Register
                        </Link>
                    </>
                </nav>
            </header>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
    );
}
