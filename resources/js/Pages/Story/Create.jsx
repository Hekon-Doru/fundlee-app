import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";

export default function Create() {
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit logic here (e.g., API call)
        alert(`Product: ${name}, Goal: ${goal}, Description: ${description}`);
    };

    return (
        <AuthenticatedLayout
            user={{ name: "User" }}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Your stories
                </h2>
            }
        >
            <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Title</label>
                        <input
                            type="text"
                            className="w-full border px-3 py-2 rounded"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">
                            Goal
                        </label>
                        <input
                            type="number"
                            className="w-full border px-3 py-2 rounded"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">
                            AStory image.
                        </label>
                        <input
                            type="file"
                            className="w-full border px-3 py-2 rounded"
                            accept="image/*"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">
                            Description
                        </label>
                        <textarea
                            className="w-full border px-3 py-2 rounded"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Share your story.
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
