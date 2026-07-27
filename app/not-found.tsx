
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";
import Link from "next/link";

export default async function NotFound() {
  const user = await getMe();

  return (
    <div className="flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center justify-between px-16 bg-white dark:bg-black sm:items-start">
        <Navbar user={user} />
        <h2 className="font-bold text-6xl">404 Could not find requested resource</h2>.
        <Link href="/">Return Home</Link>
      </main>
    </div>
  );
}

