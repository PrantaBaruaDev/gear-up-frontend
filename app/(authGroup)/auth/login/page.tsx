
import { Navbar } from "@/components/shared/navbar"
import { getMe } from "@/service/getMe";
import LoginForm from "../../_components/LoginForm";
import { GoogleSignInButton } from "../../_components/GoogleSignInButton";
import { Toaster } from "sonner";

const LoginPage = async() => {
    const user = await getMe();
  return (
    <>
        <Navbar user={user} />
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md space-y-8 p-8 rounded-lg border shadow-lg">
                <div className="space-y-2 text-center">
                    <h1 className="text-4xl font-bold">Welcome Back!</h1>
                    <p className="text-gray-500">
                        Enter your credential to access your account
                    </p>
                </div>

                <LoginForm />

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500 dark:bg-gray-950 dark:text-gray-400">
                            Or continue with
                        </span>
                    </div>
                </div>

                <GoogleSignInButton />
            </div>
        </div>
    </>
  )
}

export default LoginPage