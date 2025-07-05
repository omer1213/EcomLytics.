import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <SignIn
                appearance={{
                    elements: {
                        rootBox: "mx-auto",
                        card: "shadow-lg rounded-lg",
                    },
                }}
                path="/sign-in"
                signUpUrl="/sign-up" 
                redirectUrl="/" // Redirect to home after sign-in
            />
        </div>
    )
}