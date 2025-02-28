import Link from "next/link"

export const metadata = {
    title: "Terms of Service | WaveLink",
    description: "WaveLink terms of service and user agreement",
}

export default function TermsOfService() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            <p className="mb-4">
                Welcome to WaveLink. By using our service, you agree to these terms. Please read them carefully.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">1. Using our Services</h2>
            <p className="mb-4">
                You must follow any policies made available to you within the Services. Don't misuse our Services.
            </p>
            {/* Add more sections as needed */}
            <p className="mt-8">
                <Link href="/" className="text-blue-600 hover:underline">
                    Return to Home
                </Link>
            </p>
        </div>
    )
}

