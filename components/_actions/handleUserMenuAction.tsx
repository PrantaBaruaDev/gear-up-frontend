import { logout } from "@/service/logout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useUserMenuAction = () => {
    const router = useRouter()
    const handleUserMenuAction = async (action: string) => {

        if(action === "logout"){
            await logout();
            toast.success("User Logged Out Successfully!");
            router.push("/login");
        }
        
        if(action === "dashboard"){
            router.push("/dashboard");
        }
    };

    return { router, handleUserMenuAction }
}