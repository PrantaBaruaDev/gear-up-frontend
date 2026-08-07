
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

export default async function PublicHomeLayout({ children }: { children: React.ReactNode }) {
  const user = await getMe();

  return (
    <div className="flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full px-16 bg-white dark:bg-black sm:items-start">
        <Navbar user={user} />
        {children}
      </main>
    </div>
  );
}
