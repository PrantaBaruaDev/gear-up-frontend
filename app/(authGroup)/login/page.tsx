
import { Navbar } from "@/components/shared/navbar"
import LoginForm from "../_components/LoginForm"
import { getMe } from "@/service/getMe";

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
            </div>
        </div>
    </>
  )
}

export default LoginPage