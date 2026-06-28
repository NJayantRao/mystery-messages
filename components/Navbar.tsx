"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { MessageCircle, LogOut, LogIn, UserCircle2, Inbox } from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav className="sticky top-0 z-50">
      {/* Glass layer */}
      <div
        className="absolute inset-0 border-b"
        style={{
          background: "rgba(255, 255, 255, 0.72)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          borderColor: "rgba(0,0,0,0.07)",
        }}
      />

      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* ── Logo (left) ── */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #DB2777)",
            }}
          >
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <span className="text-[15px] font-bold tracking-tight text-gray-900 hidden sm:block">
            Mystery Messages
          </span>
        </Link>

        {/* ── Right side ── */}
        <div className="flex items-center gap-3">
          {session ? (
            <>
              {/* User info pill */}
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-gray-200 bg-white/60 px-3 py-1.5">
                <UserCircle2 className="h-4 w-4 text-violet-500" />

                <span className="text-sm font-semibold text-gray-800">
                  {user?.username ?? user?.email?.split("@")[0] ?? "User"}
                </span>
              </div>

              {/* Sign out */}
              <Button
                size="sm"
                onClick={() => signOut()}
                className="flex items-center gap-1.5 rounded-lg font-medium text-sm px-4"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #DB2777)",
                  border: "none",
                  color: "white",
                }}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign out</span>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg font-medium text-sm px-4"
                asChild
              >
                <Link href="/sign-in" className="flex items-center gap-1.5">
                  <LogIn className="w-4 h-4" />
                  Sign in
                </Link>
              </Button>

              <Button
                size="sm"
                className="flex items-center gap-1.5 rounded-lg font-semibold text-sm px-5 shadow-md shadow-violet-100 hover:scale-[1.02] transition-all duration-200"
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
