import Link from "next/link"
import { Logo } from "@/components/logo"

export const metadata = {
    title: "Privacy Policy | WaveLink",
    description: "WaveLink privacy policy and data protection information",
}

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="container mx-auto px-4 py-8 flex-1">
                <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
                <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
                <p className="mb-4">
                    WaveLink ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your
                    personal information is collected, used, and disclosed by WaveLink.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-4">Information We Collect</h2>
                <p className="mb-4">
                    We collect information you provide directly to us, such as when you create an account, use our services, or
                    communicate with us.
                </p>
                {/* Add more sections as needed */}
                <p className="mt-8">
                    <Link href="/" className="text-primary hover:underline">
                        Return to Home
                    </Link>
                </p>
            </main>
        </div>
    )
}

