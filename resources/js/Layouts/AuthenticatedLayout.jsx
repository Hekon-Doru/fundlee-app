import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen flex flex-col">
            {/* Header */}
            <header className="flex justify-between items-center py-6 px-6 md:px-12 bg-white shadow-md">
                <Link
                    href={route("story.list")}
                    className="text-2xl font-bold text-green-500 hover:text-green-600 transition"
                >
                    Fundlee
                </Link>
                <nav className="flex gap-4">
                    <Link
                        href={route("story.list")}
                        className="px-4 py-2 rounded-xl text-gray-800 hover:bg-green-100 transition"
                    >
                        Stories
                    </Link>
                    <Link
                        href={route("story.create")}
                        className="px-4 py-2 rounded-xl text-gray-800 hover:bg-green-100 transition"
                    >
                        Create Story
                    </Link>
                    <div className="relative">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown((prev) => !prev)
                            }
                            className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-800 hover:bg-gray-100 transition"
                        >
                            {user.name}
                        </button>
                        {showingNavigationDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl py-2">
                                <Link
                                    href={route("profile.edit")}
                                    className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded-lg transition"
                                >
                                    Profile
                                </Link>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 rounded-lg transition"
                                >
                                    Log Out
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            </header>

            {header && (
                <div className="bg-white shadow mt-1">
                    {header}
                </div>
            )}

            <main className="flex-1 mx-6 md:mx-12 mt-6 mb-12">
                {children}
            </main>
        </div>
    );
}
