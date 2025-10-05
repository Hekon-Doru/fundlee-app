// resources/js/Pages/Story/Edit.jsx
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Edit({ story, auth }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        title: story.title || "",
        target_amount: story.target_amount || "",
        description: story.description || "",
        image: null, // for new image upload
    });

    const [preview, setPreview] = useState(story.image_path || null);

    useEffect(() => {
        return () => {
            if (preview && preview.startsWith("blob:"))
                URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file || null);
        setPreview(file ? URL.createObjectURL(file) : story.image_path || null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send explicit data to Inertia
        put(route("story.update", story.id), data, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => alert("Updated!"),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user ? { name: auth.user.name } : null}
            header={
                <h2 className="text-2xl font-bold text-gray-800">Edit Story</h2>
            }
        >
            <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Title */}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Target Amount */}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">
                            Goal (€)
                        </label>
                        <input
                            type="number"
                            value={data.target_amount}
                            onChange={(e) =>
                                setData("target_amount", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        {errors.target_amount && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.target_amount}
                            </p>
                        )}
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">
                            Story Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.image}
                            </p>
                        )}

                        {preview && (
                            <div className="mt-4">
                                <p className="text-gray-600 text-sm mb-2">
                                    Preview:
                                </p>
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
                        <label className="block mb-1 font-semibold text-gray-700">
                            Description
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-md px-4 py-2 h-32 focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className={`bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition ${
                            processing ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {processing ? "Updating..." : "Update Story"}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
