import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ProgressBar from "./Partials/ProgresBar";
import Contributors from "./Partials/Contributors";

export default function View({ story }) {
    if (!story) {
        return (
            <AuthenticatedLayout user={{ name: "User" }}>
                <div className="text-center py-20 text-red-500">
                    Story not found.
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout
            user={{ name: "User" }}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Your story
                </h2>
            }
        >
            <div className="py-12 bg-white rounded-lg shadow max-w-7xl mx-auto mt-10">
                <div className="mx-auto lg:px-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-9/12 h-96 bg-gray-300 rounded-lg flex items-center justify-center gap-4 mb-4">
                            {story.image ? (
                                <img
                                    src={story.image}
                                    alt="Story"
                                    className="h-full object-cover rounded-lg"
                                />
                            ) : (
                                <span className="text-gray-500 text-sm">
                                    Image
                                </span>
                            )}
                        </div>
                        <div className="w-6/12 h-96 mt-4">
                            <ProgressBar
                                collected_amount={story.collected_amount}
                                target_amount={story.target_amount}
                            />
                            <div className="w-full mt-6 flex items-center gap-4">
                                <input
                                    type="number"
                                    placeholder="Enter amount"
                                    className="w-8/12 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <button className="w-4/12 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                    Donate Now
                                </button>
                            </div>
                            <h3 className="mt-10 text-lg font-semibold mb-2">
                                {story.title}
                            </h3>
                            <p className="mt-4 text-gray-600">
                                {story.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Contributors story={story} />
        </AuthenticatedLayout>
    );
}
