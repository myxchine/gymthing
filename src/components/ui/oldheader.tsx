import Link from "next/link";
import { AccountIcon, MenuIcon } from "./icons";
import { SpinnerIcon } from "./icons";
import { getServerAuthSession } from "@/server/auth";
import { Suspense } from "react";
export default function Header() {
  return (
    <header className="max-w-xl mx-auto p-4 flex flex-row items-center justify-between sticky top-0 z-10 bg-white">
      <Link href="/workout" className="w-1/3">
        <MenuIcon className="w-6 h-6 cursor-pointer" />
      </Link>

      <Link href="/" className="font-bold tracking-[-0rem] text-2xl">
        GymThing
      </Link>
      <div className="w-1/3 flex flex-row items-center justify-end">
        <Suspense fallback={<SpinnerIcon className="w-6 h-6 animate-spin" />}>
          <AccountButton />
        </Suspense>
      </div>
    </header>
  );
}

async function AccountButton() {
  const session = await getServerAuthSession();
  if (session) {
    return (
      <Link href="/account">
        <AccountIcon className="w-6 h-6 cursor-pointer" />
      </Link>
    );
  }
  return (
    <Link
      href="/signin"
      className="text-xs px-3 py-2 rounded  bg-black text-white hover:bg-black/80"
    >
      Sign Up
    </Link>
  );
}
