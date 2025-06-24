import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#fffbeb]">
            <div className="w-full max-w-md">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-amber-900">Create an Account</h1>
                    <p className="mt-2 text-amber-700">Sign up to start creating amazing content</p>
                </div>
                <SignUp
                    appearance={{
                        elements: {
                            rootBox: "mx-auto",
                            card: "bg-white shadow-lg rounded-lg border border-amber-200",
                            headerTitle: "text-amber-900 font-bold",
                            headerSubtitle: "text-amber-700",
                            formButtonPrimary: "bg-amber-500 hover:bg-amber-600",
                            formFieldInput: "border-amber-200 focus:border-amber-500",
                            footerActionLink: "text-amber-500 hover:text-amber-600",
                        },
                    }}
                />
            </div>
        </div>
    )
}