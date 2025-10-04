import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";

export default function Create({ auth }) {
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
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add New Story
                </h2>
            }
        >
            <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-6">Share Your Story</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block mb-1 font-semibold">Title</label>
                        <input
                            type="text"
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            required
                        />
                        {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                    </div>

                    {/* Goal */}
                    <div>
                        <label className="block mb-1 font-semibold">Goal (€)</label>
                        <input
                            type="number"
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={data.target_amount}
                            onChange={(e) => setData("target_amount", e.target.value)}
                            required
                        />
                        {errors.target_amount && <div className="text-red-500 text-sm mt-1">{errors.target_amount}</div>}
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block mb-1 font-semibold">Story Image</label>
                        <input
                            type="file"
                            className="w-full border px-4 py-2 rounded-lg"
                            accept="image/*"
                            onChange={(e) => setData("image", e.target.files[0])}
                        />
                        {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-1 font-semibold">Description</label>
                        <textarea
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            rows={6}
                            required
                        />
                        {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className={`bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-semibold ${
                                processing ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={processing}
                        >
                            {processing ? "Submitting..." : "Share Your Story"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
