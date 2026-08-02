// app/(dashboardGroup)/layout.tsx
import { TooltipProvider } from "@/components/ui/tooltip"; 
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { getMe } from "@/service/getMe";
import { Toaster } from "sonner";
import { ReturnHomeAndClearCookieButton } from "./_components/users/LogoutButton";

export default async function Layout({ children }: { children: React.ReactNode }) {

  const user = await getMe();

  if (!user.success) {
    return (
      <div className="p-6 max-w-7xl h-[100vh] mx-auto my-auto">
        <div className="p-12 text-center rounded-lg bg-card border">
          <p className="text-muted-foreground mb-10">
            {user.message || "Your Account Not Found!"}
          </p>
          {/* <Link href={"/"} className=" px-4 py-2 border rounded-lg">Return Home</Link> */}
          <ReturnHomeAndClearCookieButton />
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar user={user.data} />
        <main>
          <SidebarTrigger />
          <section className="ml-6">
            {children}
            <Toaster position="top-right" richColors />
          </section>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}