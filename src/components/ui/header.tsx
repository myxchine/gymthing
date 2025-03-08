"use client";
import Link from "next/link";
import { AccountIcon, MenuIcon } from "./icons";
import { toast } from "sonner";

export default function Header() {
  return (
    <header className="max-w-xl mx-auto p-4 flex flex-row items-center justify-between sticky top-0 z-10 bg-white">
      <Link href="/workout">
        <MenuIcon className="w-6 h-6 cursor-pointer" />
      </Link>

      <Link href="/" className="font-bold tracking-[0.5rem] text-xl">
        GYMTHING
      </Link>
      <AccountIcon
        className="w-6 h-6 cursor-pointer"
        onClick={() => toast.success("Account feature coming soon")}
      />
    </header>
  );
}
