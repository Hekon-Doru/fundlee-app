import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth, stories }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("hidden");
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
                <header className="flex justify-between items-center py-6 px-6 md:px-12 bg-white dark:bg-gray-800 shadow-md">
                    <div className="text-2xl font-bold text-green-500 dark:text-white">
                        Fundlee
                    </div>
                    <nav className="flex gap-4">
                        {auth.user ? (
                            <>
                                <Link
                                    href={route("story.list")}
                                    className="px-4 py-2 rounded-md text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                >
                                    Stories
                                </Link>
                                <Link
                                    href={route("story.create")}
                                    className="px-4 py-2 rounded-md text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                >
                                    Create Story
                                </Link>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Link>
                            </>
                        ) : (
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
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="flex flex-col items-center justify-center text-center px-6 md:px-12 h-screen bg-gradient-to-b from-green-700/20 to-yellow-100/20 dark:from-gray-800/20">
                    <h1 className="text-4xl md:text-6xl font-bold text-green-900 dark:text-green-300 mb-4">
                        Share your true story.
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-xl">
                        Every great journey begins with a single step. Each
                        person can help you achieve your goal.
                    </p>
                    <a
                        href="/register"
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
                    >
                        Share your story.
                    </a>
                </section>

                {/* Resources Grid */}
                <section className="px-6 md:px-12 py-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"></section>

                {/* Footer */}
                <footer className="py-6 text-center text-gray-600 dark:text-gray-400 text-sm">
                    BIT 2025
                </footer>
            </div>
        </>
    );
}
