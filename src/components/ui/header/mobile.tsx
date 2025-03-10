"use client";

import { useState, useEffect, Suspense } from "react";
import Nav from "./nav";
import {
  MenuIcon,
  CloseIcon,
  AccountIcon,
  SpinnerIcon,
} from "@/components/ui/icons";
import Logo from "@/components/ui/logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    //const footer = document.getElementById("site-footer");
    const main = document.getElementById("site-main");
    if (!main) {
      return;
    }
    //footer.style.display = isOpen ? "none" : "flex";
    main.style.display = isOpen ? "none" : "block";
  }, [isOpen]);

  return (
    <div className={`w-full block md:hidden py-[2px] `}>
      <div className={`flex flex-row items-center justify-between w-full   `}>
        <Buttons open={isOpen} setIsOpen={setIsOpen} />
        <Logo />
        <div className="w-1/3  flex-col justify-end items-end flex ml-2">
          <Suspense fallback={<SpinnerIcon className="size-6 animate-spin" />}>
            <AccountButton />
          </Suspense>
        </div>
      </div>

      {isOpen && (
        <>
          <Nav className="flex flex-col gap-3 pb-8 pt-8 items-center justify-center px-4 w-fit mx-auto" />
        </>
      )}
    </div>
  );
}

function Buttons({ open, setIsOpen }: { open: boolean; setIsOpen: any }) {
  return (
    <>
      {!open ? (
        <button
          aria-label="Mobile Menu Open"
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-start  w-1/3"
        >
          <MenuIcon className="size-5  " stroke="currentColor" />
        </button>
      ) : (
        <button
          aria-label="Mobile Menu Close"
          className="flex items-center justify-start w-1/3 "
          onClick={() => setIsOpen(false)}
        >
          <CloseIcon stroke="currentColor" className="  size-5 " />
        </button>
      )}
    </>
  );
}

function AccountButton() {
  const session = useSession();
  if (session.status === "loading") {
    return <SpinnerIcon className="size-5 animate-spin" />;
  }
  if (session && session.status === "authenticated") {
    return (
      <Link href="/account">
        <AccountIcon className="size-5 cursor-pointer" />
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
