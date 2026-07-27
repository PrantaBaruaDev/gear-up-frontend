import { logout } from "@/service/logout";
import { NavbarProps } from "@/lib/types/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useUserMenuAction = () => {
    const router = useRouter()
    const handleUserMenuAction = async (action: string, user?: NavbarProps["user"]["data"]) => {

        if(action === "logout"){
            await logout();
            toast.success("User Logged Out Successfully!");
            router.push("/login");
        }
        
        if(action === "dashboard"){
            switch (user?.role) {
                case "ADMIN":
                    router.push("/admin-dashboard");
                    break;
                case "PROVIDER":
                    router.push("/provider-dashboard");
                    break;
                case "CUSTOMER":
                    router.push("/dashboard");
                    break;
                default:
                    router.push("/");
                    break;
            }
        }
    };

    return { router, handleUserMenuAction }
}