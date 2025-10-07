// resources/js/Pages/Stories/Edit.jsx

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import useStoryForm from "@/Hooks/useStoryForm";
import useImage from "@/Hooks/useImage";

export default function Edit({ story, auth }) {
    const { data, setData, handleSubmit, processing, errors } = useStoryForm(story);
    const { preview, handleImageChange, setPreview } = useImage(setData, story.image_path);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <nav aria-label="Breadcrumb" className="w-full">
                    <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between text-sm">
                        <ol className="flex items-center gap-2 text-gray-500">
                            <li>
                                <span className="font-medium text-green-600 hover:text-green-700 transition-colors">
                                    Edit a story.
                                </span>
                            </li>
                        </ol>
                    </div>
                </nav>
            }
        >
            <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
                <form
                    onSubmit={(e) => handleSubmit(e, () => setPreview(story.image_path))}
                    className="flex flex-col gap-6"
                >
                    {/* Title */}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    {/* Goal */}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Goal (€)</label>
                        <input
                            type="number"
                            value={data.target_amount}
                            onChange={(e) => setData("target_amount", e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        {errors.target_amount && <p className="text-red-500 text-sm mt-1">{errors.target_amount}</p>}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Story Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}

                        {preview && (
                            <div className="mt-4">
                                <p className="text-gray-600 text-sm mb-2">Current / New Image:</p>
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-64 object-cover rounded-md shadow-sm"
                                />
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Description</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 h-32 focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className={`bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition ${
                            processing ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {processing ? "Updating..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
