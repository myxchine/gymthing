"use client";

import { useState, useEffect } from "react";
import { MenuIcon, CloseIcon } from "@/components/global/icons";
import Logo from "@/components/global/logo";
import { usePathname } from "next/navigation";
import AccountButton from "./account-button";
export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const main = document.getElementById("site-main");
    const mobileNav = document.getElementById("mobile-nav");
    if (!main || !mobileNav) {
      return;
    }
    main.style.display = isOpen ? "none" : "block";
    mobileNav.style.display = isOpen ? "block" : "none";
  }, [isOpen]);

  return (
    <div className={`w-full block md:hidden  `}>
      <div className={`flex flex-row items-center justify-between w-full   `}>
        <Buttons open={isOpen} setIsOpen={setIsOpen} />
        <Logo />
        <div className="w-1/3  flex-col justify-end items-end flex ">
          <AccountButton />
        </div>
      </div>
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
