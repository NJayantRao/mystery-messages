"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { LogIn, LogOut, MessageCircle, UserCircle2 } from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav className="sticky top-0 z-50">
      {/* Glass Layer */}
      <div
        className="absolute inset-0 border-b"
        style={{
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          borderColor: "rgba(0,0,0,0.07)",
        }}
      />

      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm transition-transform duration-200 group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #DB2777)",
            }}
          >
            <MessageCircle className="h-5 w-5 text-white" />
          </div>

          <span className="hidden sm:block text-lg font-extrabold tracking-tight text-gray-900">
            Mystery Messages
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-4">
          {session ? (
            <>
              {/* User Info */}
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-gray-200 bg-white/60 px-4 py-2.5">
                <UserCircle2 className="h-5 w-5 text-violet-500" />

                <span className="text-[15px] font-semibold text-gray-800">
                  {user?.username ?? user?.email?.split("@")[0] ?? "User"}
                </span>
              </div>

              {/* Sign Out */}
              <Button
                size="sm"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="h-11 rounded-xl px-5 text-[15px] font-semibold cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #DB2777)",
                  border: "none",
                  color: "white",
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Sign out</span>
              </Button>
            </>
          ) : (
            <>
              {/* Sign In */}
              <Button
                variant="ghost"
                size="sm"
                className="h-11 rounded-xl px-4 sm:px-5 text-base sm:text-[15px] font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                asChild
              >
                <Link href="/sign-in" className="flex items-center gap-2">
                  <LogIn className="h-5 w-5" />
                  Sign in
                </Link>
              </Button>

              {/* Get Started */}
              <Button
                size="sm"
                className="h-11 rounded-xl px-6 sm:px-7 text-base sm:text-[15px] font-bold shadow-lg shadow-violet-100 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #DB2777)",
                  border: "none",
                  color: "white",
                }}
                asChild
              >
                <Link href="/sign-up">Get started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
