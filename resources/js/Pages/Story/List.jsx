import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import ProgressBar from "./Partials/ProgresBar";
import StatusBar from "./Partials/StatusBar";

export default function List({ stories, auth }) {
    const { put } = useForm();
    const [showMine, setShowMine] = useState(false);

    const Layout = auth.user ? AuthenticatedLayout : GuestLayout;

    // Filter stories for "Show My Stories"
    const displayedStories = showMine
        ? stories.filter((story) => story.is_owner)
        : stories;

    const handleToggle = (storyId) => {
        put(route("story.toggle", storyId));
    };

    return (
        <Layout
            user={auth.user ? { name: auth.user.name } : null}
            header={
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">All Stories</h2>
                    {auth.user && (
                        <button
                            onClick={() => setShowMine(!showMine)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                                ${showMine ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
                        >
                            {showMine ? "Showing My Stories" : "Show My Stories"}
                        </button>
                    )}
                </div>
            }
        >
            <div className="max-w-7xl mx-auto py-12">
                {displayedStories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayedStories.map((story) => {
                            const imageSrc = story.image_path || "/images/placeholder.png";

                            return (
                                <div key={story.id} className="relative bg-white rounded-lg shadow overflow-hidden flex flex-col">
                                    {/* Image + Status */}
                                    <Link href={route("story.view", story.id)} className="block relative w-full h-64 bg-gray-300">
                                        <StatusBar story={story} authUser={auth.user} />
                                        <img
                                            src={imageSrc}
                                            alt={story.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </Link>

                                    {/* Content */}
                                    <div className="p-4 flex flex-col gap-2 flex-1">
                                        <h3 className="text-lg font-semibold truncate">{story.title}</h3>
                                        <div className="flex items-center text-gray-700 text-sm">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                            <span className="font-medium truncate">{story.owner}</span>
                                        </div>

                                        <ProgressBar
                                            collected_amount={story.collected_amount}
                                            target_amount={story.target_amount}
                                        />
                                    </div>

                                    {/* Toggle button for owner */}
                                    {story.is_owner && (
                                        <button
                                            onClick={() => handleToggle(story.id)}
                                            className={`absolute top-4 right-4 px-3 py-1 rounded text-sm font-medium transition-colors duration-200
                                            ${story.is_active ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-400 text-black hover:bg-gray-500"}`}
                                        >
                                            {story.is_active ? "Active" : "Inactive"}
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-gray-500 text-center py-12">No stories found.</div>
                )}
            </div>
        </Layout>
    );
}
