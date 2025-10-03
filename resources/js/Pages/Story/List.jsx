import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function List({ stories }) {
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
                            <Link
                            to={route("story.view", story.id)}
                            key={story.id}
                            className="no-underline"
                        >
                            <div className="bg-white rounded-lg shadow p-4">
                                <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-gray-500 text-sm">
                                        {story.image ? (
                                            <img
                                                src={story.image}
                                                alt={story.title}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            "Image"
                                        )}
                                    </span>
                                </div>

                                <h3 className="text-lg font-semibold mb-2">
                                    {story.title}
                                </h3>

                                <div className="mt-4">
                                    <div className="flex justify-between mb-1 text-sm">
                                        <span>Collected</span>
                                        <span>
                                            €{story.collected_amount} / €{story.target_amount}
                                        </span>
                                    </div>

                                    <div className="bg-gray-200  rounded-full h-4">
                                        <div
                                            className="bg-green-600 green-700 h-4 rounded-full"
                                            style={{
                                                width: `${Math.round(
                                                    (story.collected_amount /
                                                        story.target_amount) *
                                                        100
                                                )}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </Link>
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
