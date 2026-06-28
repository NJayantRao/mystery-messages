"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { features } from "@/data/features";
import { steps } from "@/data/steps";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import FloatingMessages from "@/components/FloatingMessages";
import CarouselComponent from "@/components/Carousel";

// ─── Component ───────────────────────────────────────────────────────────────

export default function Home() {
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => api.scrollNext(), 3000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center overflow-hidden">
        {/* Colourful blobs — subtle on white */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-[0.12] blur-3xl"
            style={{ background: "#8B5CF6" }}
          />
          <div
            className="absolute top-10 -right-20 w-80 h-80 rounded-full opacity-[0.10] blur-3xl"
            style={{ background: "#EC4899" }}
          />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 opacity-[0.07] blur-3xl"
            style={{ background: "#3B82F6" }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Pill badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-200 bg-violet-50 text-violet-700 text-sm font-medium mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            Anonymous messages · Real feelings
          </span>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-[76px] font-black tracking-tight leading-[1.04] mb-6">
            Discover what people
            <br />
            <span
              className="relative"
              style={{
                background:
                  "linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              truly think of you.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Share your personal link. Receive completely anonymous messages.
            Honest compliments, real feedback, unfiltered thoughts — no identity
            ever revealed.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button
              size="lg"
              className="px-8 h-13 text-base rounded-xl font-semibold shadow-lg shadow-violet-200 hover:shadow-violet-300 transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #DB2777)",
                border: "none",
              }}
              asChild
            >
              <Link href="/sign-up">
                Get your link — it's free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 h-13 text-base rounded-xl font-semibold border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              asChild
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </div>

          <p className="mt-5 text-sm text-gray-400">
            Free to use · No credit card required · Takes 30 seconds
          </p>

          {/* Floating message preview pills */}
          <FloatingMessages />
        </div>
      </section>

      {/* ─── Carousel ─── */}
      <section className="py-20 px-6" style={{ background: "#FAFAFA" }}>
        <CarouselComponent api={api} setApi={setApi} />
      </section>

      {/* ─── Features ─── */}
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: "#F5F3FF", color: "#7C3AED" }}
            >
              Why Mystery Messages
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Built for honesty.{" "}
              <span className="text-gray-400">Designed for connection.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;

              return (
                <div
                  key={i}
                  className="rounded-2xl p-7 flex flex-col gap-4 border transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-default group"
                  style={{ backgroundColor: f.bg, borderColor: f.border }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: f.iconColor + "18",
                      color: f.iconColor,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-bold text-[15px] text-gray-900">
                    {f.title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="py-24 px-6" style={{ background: "#FAFAFA" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: "#EFF6FF", color: "#2563EB" }}
            >
              Simple by design
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Up and running in three steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector (desktop) */}
            <div
              className="hidden md:block absolute top-8 left-[calc(33%+16px)] right-[calc(33%+16px)] h-px"
              style={{
                background: "linear-gradient(90deg, #8B5CF6, #EC4899, #3B82F6)",
                opacity: 0.25,
              }}
            />

            {steps.map((s, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center text-center gap-4 p-8 rounded-2xl border"
                style={{
                  backgroundColor: s.lightBg,
                  borderColor: s.color + "33",
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg"
                  style={{
                    backgroundColor: s.color,
                    boxShadow: `0 8px 24px ${s.color}40`,
                  }}
                >
                  {s.step}
                </div>
                <h3 className="font-bold text-[16px] text-gray-900">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <CtaBanner />
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-gray-100 py-8 px-6 bg-white">
        <Footer />
      </footer>
    </div>
  );
}
