"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { AccountIcon, SpinnerIcon } from "@/components/ui/icons";

export default function AccountButton() {
  const session = useSession();
  if (session.status === "loading") {
    return (
      <Link
        href="/account"
        className="w-full pr-2 flex items-center justify-end"
      >
        <SpinnerIcon className="size-5 animate-spin" />
      </Link>
    );
  }
  if (session && session.status === "authenticated") {
    return (
      <Link
        href="/account"
        className="w-full pr-2 flex items-center justify-end"
      >
        <AccountIcon className="size-5 cursor-pointer " />
      </Link>
    );
  }
  return (
    <Link
      href="/signin"
      className="text-[10px] rounded-full px-3   h-[26px] flex items-center justify-center  bg-black text-white hover:bg-black/80 font-semibold"
    >
      Sign Up
    </Link>
  );
}
