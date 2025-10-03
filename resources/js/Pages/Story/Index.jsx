import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Guest from "vendor/laravel/breeze/stubs/inertia-react-ts/resources/js/Layouts/GuestLayout";

function CreateStory() {
    return (
        <>
            <GuestLayout>
                <h1 className="text-3xl font-bold underline">Hello world!</h1>
            </GuestLayout>

            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Story
                    </h2>
                }
            >
                <Head title="Story" />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                Create your story.
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}

export default CreateStory;
