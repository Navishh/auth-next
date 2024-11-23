"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathaname = usePathname();

  return (
    <nav className="fixed top-0 left-0 flex justify-between items-center w-full px-10 py-4 bg-[#1f1f1f] text-white">
      {/* <div className="flex items-center space-x-4 gap-x-2">
        <h1 className="text-lg font-bold">
          <a href="/settings" className="text-white">
            LOGO.
          </a>
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <a href="/settings" className="text-white">
          Settings
        </a>
      </div> */}
      <div className=" flex gap-x-2 ">
        <Button
          asChild
          variant={pathaname === "/server" ? "default" : "outline"}
        >
          <Link href="/server">Server</Link>
        </Button>
        <Button
          asChild
          variant={pathaname === "/client" ? "default" : "outline"}
        >
          <Link href="/client">Client</Link>
        </Button>
        <Button
          asChild
          variant={pathaname === "/admin" ? "default" : "outline"}
        >
          <Link href="/admin">Admin</Link>
        </Button>
        <Button
          asChild
          variant={pathaname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">Settings</Link>
        </Button>
      </div>
      <UserButton />{" "}
    </nav>
  );
};
