"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();

  const user = session?.user;

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
  <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
    {/* Left */}
    <div className="w-32" />

    {/* Center */}
    <Link
      href="/"
      className="absolute left-1/2 -translate-x-1/2 text-2xl font-extrabold tracking-tight"
    >
      Mystery Messages
    </Link>

    {/* Right */}
    <div className="flex items-center gap-4">
      {session ? (
        <>
          <span className="hidden text-sm font-medium text-muted-foreground sm:block">
            Hey,{" "}
            <span className="font-semibold text-foreground">
              {user?.username}
            </span>
          </span>

          <Button
            variant="destructive"
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        </>
      ) : (
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      )}
    </div>
  </div>
</nav>
  );
};

export default Navbar;