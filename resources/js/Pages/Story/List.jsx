import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import ProgressBar from "./Partials/ProgresBar";
import StatusBar from "./Partials/StatusBar";

export default function List({ stories, auth }) {
    const { put } = useForm();
    const user = auth.user;
    const isAdmin = user?.role === "admin";
    const [toggle, setToggle] = useState(false);

    const Layout = user ? AuthenticatedLayout : GuestLayout;

    let filteredStories = stories.filter((story) => {
        if (isAdmin) return true;
        if (story.status === "approved") return true;
        if (user && story.user_id === user.id) return true;
        return false;
    });

    const displayedStories = isAdmin
        ? toggle
            ? filteredStories.filter((story) => story.status === "pending")
            : filteredStories
        : toggle
        ? filteredStories.filter((story) => story.is_owner)
        : filteredStories;

    const handleToggle = (storyId) => put(route("story.toggle", storyId));

    return (
        <Layout
            user={user ? { name: user.name } : null}
            header={
                <nav aria-label="Breadcrumb" className="w-full">
                    <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between text-sm">
                        <ol className="flex items-center gap-2 text-gray-500">
                            <li>
                                <span className="font-medium text-green-600 hover:text-green-700 transition-colors">
                                    All Stories
                                </span>
                            </li>
                        </ol>

                        {/* Toggle Button */}
                        {user && (
                            <button
                                onClick={() => setToggle(!toggle)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                            ${
                                toggle
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                            }`}
                            >
                                {isAdmin
                                    ? toggle
                                        ? "Showing Pending/Denied"
                                        : "Show Pending/Denied"
                                    : toggle
                                    ? "Showing My Stories"
                                    : "Show My Stories"}
                            </button>
                        )}
                    </div>
                </nav>
            }
        >
            <div className="max-w-7xl mx-auto py-12">
                {displayedStories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayedStories.map((story) => (
                            <div
                                key={story.id}
                                className="relative bg-white rounded-lg shadow overflow-hidden flex flex-col"
                            >
                                <Link
                                    href={route("story.view", story.id)}
                                    className="block relative w-full h-64 bg-gray-300"
                                >
                                    <StatusBar story={story} authUser={user} />
                                    {story.image_path ? (
                                        <img
                                            src={story.image_path}
                                            alt={story.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 font-medium">
                                            No Image
                                        </div>
                                    )}
                                </Link>

                                <div className="p-4 flex flex-col gap-2 flex-1">
                                    <h3 className="text-lg font-semibold truncate">
                                        {story.title}
                                    </h3>
                                    <div className="flex items-center text-gray-700 text-sm">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                        <span className="font-medium truncate">
                                            {story.owner}
                                        </span>
                                    </div>

                                    <ProgressBar
                                        collected_amount={
                                            story.collected_amount
                                        }
                                        target_amount={story.target_amount}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-500 text-center py-12">
                        No stories found.
                    </div>
                )}
            </div>
        </Layout>
    );
}
