import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { useState} from "react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        target_amount: "",
        description: "",
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/story", {
            forceFormData: true, // important for file uploads
        });
    };

    return (
        <AuthenticatedLayout
            user={{ name: "User" }}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add New Story
                </h2>
            }
        >
            <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
                <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Title</label>
                        <input
                            type="text"
                            className="w-full border px-3 py-2 rounded"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            required
                        />
                        {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                    </div>

                    {/* Goal */}
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Goal (€)</label>
                        <input
                            type="number"
                            className="w-full border px-3 py-2 rounded"
                            value={data.target_amount}
                            onChange={(e) => setData("target_amount", e.target.value)}
                            required
                        />
                        {errors.target_amount && <div className="text-red-500 text-sm mt-1">{errors.target_amount}</div>}
                    </div>

                    {/* Image */}
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Image</label>
                        <input
                            type="file"
                            className="w-full border px-3 py-2 rounded"
                            accept="image/*"
                            onChange={(e) => setData("image", e.target.files[0])}
                        />
                        {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Description</label>
                        <textarea
                            className="w-full border px-3 py-2 rounded"
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            required
                        />
                        {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                    </div>

                    <button
                        type="submit"
                        className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={processing}
                    >
                        {processing ? "Submitting..." : "Share your story"}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}