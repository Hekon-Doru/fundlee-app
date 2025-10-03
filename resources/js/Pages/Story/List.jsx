import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";
import ProgressBar from "./Partials/ProgresBar";

export default function List({ stories, csrf }) {
    const { put } = useForm();

    const handleToggle = (storyId) => {
        put(route("story.toggle", storyId)); // route should be defined in Laravel
    };

    return (
        <AuthenticatedLayout
            user={{ name: "User" }}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    All Stories
                </h2>
            }
        >
            <div className="max-w-7xl mx-auto py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.length > 0 ? (
                        stories.map((story) => (
                            <div key={story.id} className="relative h-full bg-white rounded-lg shadow p-4">
                                <Link 
                                    href={route("story.view", story.id)}
                                    className="no-underline"
                                >
                                    <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center mb-4">
                                        {story.image ? (
                                            <img
                                                src={story.image}
                                                alt={story.title}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <span className="text-gray-500 text-sm">Image</span>
                                        )}
                                    </div>

                                    <div className="align-baseline flex flex-col h-28">
                                        <h3 className="text-lg font-semibold mb-2">
                                            {story.title}
                                        </h3>

                                        <ProgressBar
                                            collected_amount={story.collected_amount}
                                            target_amount={story.target_amount}
                                        />
                                    </div>
                                </Link>

                                {/* Toggle button for owner */}
                                {story.is_owner && (
                                    <button
                                        onClick={() => handleToggle(story.id)}
                                        className={`absolute top-4 right-4 px-3 py-1 rounded text-sm font-medium
                                            ${story.is_active ? "bg-green-500 text-white" : "bg-gray-400 text-black"}
                                        `}
                                    >
                                        {story.is_active ? "Active" : "Inactive"}
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="col-span-3 text-gray-500">
                            No stories found.
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
