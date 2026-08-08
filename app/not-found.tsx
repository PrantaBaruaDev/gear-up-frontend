
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";
import Link from "next/link";

export default async function NotFound() {
  const user = await getMe();

  return (
    <div className="flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full px-16 bg-white dark:bg-black sm:items-start">
        <Navbar user={user} />
        
        <div className="text-center bg-white rounded-2xl py-30 mt-10 border-2 border-white-300">
          <h2 className="font-bold text-6xl mb-5">404 Could not find requested resource</h2>
          <Link href="/" className="p-2 rounded-2xl border-2 border-white-300">Return Home</Link>
        </div>
      </main>
    </div>
  );
}
