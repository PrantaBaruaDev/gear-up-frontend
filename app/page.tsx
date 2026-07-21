
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

export default async function Home() {
  const user = await getMe();

  return (
    <div className="flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center justify-between px-16 bg-white dark:bg-black sm:items-start">
        <Navbar user={user} />
        <h2 className="font-bold text-6xl">Welcome to GearUp</h2>
      </main>
    </div>
  );
}
