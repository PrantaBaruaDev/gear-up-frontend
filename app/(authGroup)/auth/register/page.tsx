
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";
import RegistrationForm from "../../_components/RegistrationForm";

const RegistrationPage = async() => {
    const user = await getMe();
  return (
    <>
        <Navbar user={user} />
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md space-y-8 p-8 rounded-lg border shadow-lg">
                <div className="space-y-2 text-center">
                    <h1 className="text-4xl font-bold">Sign Up Page</h1>
                    <p className="text-gray-500">
                        Register your new account
                    </p>
                </div>

                <RegistrationForm />
            </div>
        </div>
    </>
  )
}

export default RegistrationPage