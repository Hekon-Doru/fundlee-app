import { Link } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import ProgressBar from "./Partials/ProgresBar";
import StatusBar from "./Partials/StatusBar";
import Contributors from "./Partials/Contributors";
import StoryActions from "./Partials/StoryActions";
import Donate from "./Partials/Donate";

export default function View({ story: initialStory, auth }) {
    const Layout = auth.user ? AuthenticatedLayout : GuestLayout;
    const authUser = auth.user;
    const [story, setStory] = useState(initialStory);

    const [showDonate, setShowDonate] = useState(false);

    if (!story) {
        return (
            <Layout user={authUser ? { name: authUser.name } : null}>
                <div className="text-center py-20 text-red-500">
                    Ooops, story not found, but you can create one.
                </div>
            </Layout>
        );
    }

    return (
        <Layout
            user={authUser ? { name: authUser.name } : null}
            header={
                <div className="flex flex-col">
                    <nav className="text-sm text-gray-500">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            <Link
                                href={route("story.list")}
                                className="hover:underline text-blue-600"
                            >
                                All Stories
                            </Link>{" "}
                            /{" "}
                            <span className="text-gray-700">{story.title}</span>
                        </h2>
                    </nav>
                </div>
            }
        >
            <div className="py-8 bg-white rounded-lg shadow max-w-7xl mx-auto mt-10">
                <div className="lg:px-8 mx-auto flex flex-col lg:flex-row gap-6">
                    {/* Story Image */}
                    <div className="w-full lg:w-7/12 h-64 lg:h-[500px] bg-gray-300 rounded-lg flex items-center justify-center overflow-hidden relative">
                        <StatusBar story={story} authUser={authUser} />
                        {story.image_path ? (
                            <img
                                src={story.image_path}
                                alt={story.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 font-medium">
                                No Image
                            </div>
                        )}
                    </div>

                    {/* Story Info */}
                    <div className="w-full lg:w-5/12 flex flex-col gap-4">
                        <div>
                            <div className="flex items-center text-gray-700 text-sm mb-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                <span className="font-medium">
                                    {story.owner}
                                </span>
                            </div>

                            <ProgressBar
                                collected_amount={story.collected_amount}
                                target_amount={story.target_amount}
                            />
                        </div>

                        {/* Actions (Donate button included for guests) */}
                        <StoryActions
                            story={story}
                            authUser={authUser}
                            setShowDonate={setShowDonate}
                        />

                        {/* Story Description */}
                        <div>
                            <h3 className="mt-6 text-lg font-semibold mb-2">
                                {story.title}
                            </h3>
                            <p className="text-gray-600">{story.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contributors */}
            <Contributors story={story} />

            {/* Donate Modal */}
            {showDonate && (
                <Donate
                    story={story}
                    authUser={authUser}
                    onClose={() => setShowDonate(false)}
                    onDonateSuccess={(donation) =>
                        setStory((prev) => ({
                            ...prev,
                            collected_amount:
                                Number(prev.collected_amount) +
                                Number(donation.amount),
                            contributors: [
                                ...(prev.contributors || []),
                                donation,
                            ],
                        }))
                    }
                />
            )}
        </Layout>
    );
}
