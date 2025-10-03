import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function View({ story }) {
    if (!story) {
        return (
            <AuthenticatedLayout user={{ name: "User" }}>
                <div className="text-center py-20 text-red-500">Story not found.</div>
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
                    <h2 className="text-2xl font-bold mb-4">
                        {story.title}
                    </h2>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-9/12 h-96 bg-gray-300 rounded-lg flex items-center justify-center gap-4 mb-4">
                            {story.image ? (
                                <img src={story.image} alt="Story" className="h-full object-cover rounded-lg" />
                            ) : (
                                <span className="text-gray-500 text-sm">Image</span>
                            )}
                        </div>
                        <div className="w-6/12 h-96 mt-4">
                            <div className="flex justify-between mb-1 text-sm">
                                <span>Raised</span>
                                <span>€{story.raised} / €{story.goal}</span>
                            </div>
                            <div className="bg-gray-200 rounded-full h-4">
                                <div
                                    className="bg-green-600 h-4 rounded-full"
                                    style={{ width: `${Math.min(100, (story.raised / story.goal) * 100)}%` }}
                                ></div>
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
                                    Story Details
                                </h3>
                                <p className="mt-4 text-gray-600">
                                    {story.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-8/12 mx-auto mt-5 p-6 bg-gray-50 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-3">Contributors:</h2>
                <ul className="space-y-4">
                    {story.contributors && story.contributors.length > 0 ? (
                        story.contributors.map((contributor, idx) => (
                            <li key={idx} className="border-b pb-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-700">{contributor.name || "Anonymous"}</span>
                                    <span className="font-medium text-green-600">€{contributor.amount}</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">{contributor.comment || <span className="italic text-gray-400">No comment</span>}</p>
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-400">No contributors yet.</li>
                    )}
                </ul>
            </div>
        </AuthenticatedLayout>
    );
}
