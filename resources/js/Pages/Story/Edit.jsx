import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";

export default function Edit({ story, auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: story.title || "",
        target_amount: story.target_amount || "",
        description: story.description || "",
        image: null,
        _method: "PUT",
    });

    const [preview, setPreview] = useState(story.image_path || null);

    useEffect(() => {
        return () => {
            if (preview && preview.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file || null);
        setPreview(file ? URL.createObjectURL(file) : story.image_path || null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("story.update", story.id), {
            forceFormData: true,
            preserveScroll: true,
            /* onSuccess: () => alert("Story updated successfully!"), */
        });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                Edit Story
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
                        placeholder="Enter story title"
                    />
                    {errors.title && (
                        <p className="text-sm text-red-500 mt-1">{errors.title}</p>
                    )}
                </div>

                {/* Target Amount */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                        Target Amount
                    </label>
                    <input
                        type="number"
                        value={data.target_amount}
                        onChange={(e) => setData("target_amount", e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
                        placeholder="e.g. 5000"
                    />
                    {errors.target_amount && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.target_amount}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        rows="4"
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none dark:bg-gray-800 dark:text-white"
                        placeholder="Describe your story..."
                    />
                    {errors.description && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.description}
                        </p>
                    )}
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                        Image
                    </label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300 dark:hover:file:bg-blue-800"
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="mt-4 w-40 h-40 object-cover rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                        />
                    )}
                    {errors.image && (
                        <p className="text-sm text-red-500 mt-1">{errors.image}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition duration-200 ${
                            processing
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {processing ? "Updating..." : "Update Story"}
                    </button>
                </div>
            </form>
        </div>
    );
}
