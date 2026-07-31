// app/(dashboardGroup)/layout.tsx
import { TooltipProvider } from "@/components/ui/tooltip"; 
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { getMe } from "@/service/getMe";
import { Toaster } from "sonner";

export default async function Layout({ children }: { children: React.ReactNode }) {

    const user = await getMe();

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar user={user} />
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