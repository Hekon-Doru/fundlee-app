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
                    Oops, story not found — but you can create one!
                </div>
            </Layout>
        );
    }

    return (
        <Layout
            user={authUser ? { name: authUser.name } : null}
            header={
                <nav
                    aria-label="Breadcrumb"
                    className="w-full bg-white/80 border-b border-gray-100"
                >
                    <div className="max-w-6xl mx-auto px-4 py-3 flex items-center text-sm">
                        <ol className="flex items-center gap-2 text-gray-500">
                            <li>
                                <Link
                                    href={route("story.list")}
                                    className="font-medium text-green-600 hover:text-green-700 transition-colors"
                                >
                                    All Stories
                                </Link>
                            </li>
                            <li>
                                <span className="text-gray-400">/</span>
                            </li>
                            <li className="truncate text-gray-700 font-semibold">
                                {story.title}
                            </li>
                        </ol>
                    </div>
                </nav>
            }
        >
            <div className="bg-white rounded-2xl shadow-md max-w-6xl mx-auto mt-10 p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    {/* Story Image */}
                    <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-sm relative">
                        <StatusBar story={story} authUser={authUser} />
                        {story.image_path ? (
                            <img
                                src={story.image_path}
                                alt={story.title}
                                className="w-full h-[400px] object-cover rounded-2xl"
                            />
                        ) : (
                            <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 text-gray-500 font-medium rounded-2xl">
                                No Image
                            </div>
                        )}
                    </div>

                    {/* Story Details */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-6">
                        <div className="text-gray-700">
                            <div className="flex items-center mb-3 text-sm">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                <span className="font-medium">
                                    {story.owner}
                                </span>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                                {story.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {story.description}
                            </p>
                        </div>

                        <ProgressBar
                            collected_amount={story.collected_amount}
                            target_amount={story.target_amount}
                        />

                        <StoryActions
                            story={story}
                            authUser={authUser}
                            setShowDonate={setShowDonate}
                            updateStatus={(newStatus) =>
                                setStory((prev) => ({
                                    ...prev,
                                    status: newStatus,
                                }))
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Contributors Section */}
            <div className="max-w-6xl mx-auto mt-10">
                <Contributors story={story} />
            </div>

            {/* Donate Modal */}
            {showDonate && (
                <Donate
                    story={story}
                    authUser={authUser}
                    onClose={() => setShowDonate(false)}
                    onDonateSuccess={(newDonation) =>
                        setStory((prev) => ({
                            ...prev,
                            collected_amount:
                                Number(prev.collected_amount) +
                                Number(newDonation.amount),
                            contributors: [
                                ...(prev.contributors || prev.donations || []),
                                newDonation,
                            ],
                        }))
                    }
                />
            )}
        </Layout>
    );
}
