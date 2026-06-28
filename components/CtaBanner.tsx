import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CtaBanner = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div
        className="rounded-3xl p-12 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #7C3AED 0%, #DB2777 50%, #F59E0B 100%)",
        }}
      >
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10">
          <div className="text-5xl mb-5">💬</div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
            What are people saying
            <br />
            about you right now?
          </h2>
          <p className="text-white/75 mb-8 max-w-sm mx-auto leading-relaxed">
            {`Create your free link and start finding out. Honest thoughts,
                waiting for you — from people you'd never expect.`}
          </p>
          <Button
            size="lg"
            className="bg-white text-gray-900 hover:bg-gray-50 font-bold px-10 h-13 text-base rounded-xl shadow-xl hover:scale-[1.02] transition-all duration-200 border-0"
            asChild
          >
            <Link href="/sign-up">
              Create your free account
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <p className="mt-5 text-sm text-white/50">
            Free forever · No spam · No credit card
          </p>
        </div>
      </div>
    </div>
  );
};

export default CtaBanner;
