import Nav from "./nav";
import Logo from "@/components/ui/logo";
import { AccountIcon, MenuIcon } from "@/components/ui/icons";
import { getServerAuthSession } from "@/server/auth";
import { Suspense } from "react";
import Link from "next/link";
export default function Menu() {
  return (
    <div className=" md:flex hidden flex-row items-center justify-between  w-full    gap-8 bg-transparent">
      <div className="flex w-1/6 justify-start items-center">
        <Logo />
      </div>

      <div className="flex w-2/6 justify-center items-center">
        <Nav className="flex flex-row gap-8 w-fit justify-center items-center " />
      </div>

      <div className="flex w-1/6 justify-end items-center">
        <AccountButton />
      </div>
    </div>
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
      className="text-xs px-3 h-[28px] flex items-center justify-center rounded-full w-fit bg-black font-semibold text-white hover:bg-black/80"
    >
      Sign Up
    </Link>
  );
}
