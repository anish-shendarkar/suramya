import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
    // return (
    //     <div className="container mx-auto flex items-center justify-center min-h-screen">
    //         <LoginForm />
    //     </div>
    // )
    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Welcome to Our Platform
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Sign in to your account or create a new one
                    </p>
                </div>
                <LoginForm />
            </div>
        </div>
    )
}

