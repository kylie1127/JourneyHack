"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Countdown from "@/components/Countdown";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function MailboxMainPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [letterCount, setLetterCount] = useState(0);

  useEffect(() => {
    async function loadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

      setUsername(profile?.username ?? "user");

      const { data: mailbox } = await supabase
        .from("mailboxes")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (mailbox) {
        const { count } = await supabase
          .from("letters")
          .select("*", { count: "exact", head: true })
          .eq("mailbox_id", mailbox.id);

        setLetterCount(count ?? 0);
      }
    }
    loadData();
  }, [router]);

  const mailboxLevel = Math.min(Math.floor(letterCount / 10) + 1, 10);
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/write/${username}`
      : "";

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#FFF9F6] px-6 py-10">
      {/* 1. Header Section */}
      <div className="z-10 mt-4 flex flex-col items-center gap-4">
        <h1 className="font-jersey text-3xl  text-gray-900">
          {username}’s Mailbox
        </h1>
        {/* Adjusted Countdown position to prevent overlapping */}
        <div className="rounded-full bg-white/80 px-8 py-3 shadow-sm ring-1 ring-yellow-100 backdrop-blur-sm">
          <Countdown />
        </div>
      </div>

      {/* 2. Mailbox Image Section - INCREASED SIZE & FIXED BADGE */}
      <div className="relative my-12 flex flex-col items-center justify-center">
        {/* Container for Image + Badge */}
        <div
          className="relative h-[400px] w-[400px] cursor-pointer transition-transform hover:scale-105 active:scale-95"
          onClick={() => router.push("/mailbox/letters")}
        >
          <div className="absolute right-12 top-0 z-30 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-yellow-400 font-jersey text-2xl text-black shadow-xl">
            Lv.{mailboxLevel}
          </div>

          <Image
            src={`/mailboxes/level-${mailboxLevel}.png`}
            alt="Mailbox"
            fill
            className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)]"
            priority
          />
        </div>

        {/* 3. Progress Section */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="h-3 w-64 overflow-hidden rounded-full border border-white bg-gray-200 shadow-inner">
            <div
              className="h-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)] transition-all duration-1000"
              style={{ width: `${(letterCount % 10) * 10}%` }}
            />
          </div>
          <p className="font-jersey text-sm tracking-widest text-gray-400">
            {10 - (letterCount % 10)} MORE LETTERS TO LEVEL UP!
          </p>
        </div>
      </div>

      {/* 4. Footer Section - Fixed Link Card */}
      <div className="mt-auto w-full max-w-sm pb-6">
        <div className="rounded-[2.5rem] bg-white p-8 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)] ring-1 ring-gray-50">
          <p className="mb-4 text-center font-jersey text-xl text-gray-800">
            Invite your friends!
          </p>
          <div className="flex items-center gap-2 rounded-2xl bg-gray-50 p-2 border border-gray-100">
            <div className="flex-1 overflow-hidden px-2 text-xs text-gray-400">
              <p className="truncate">{shareUrl}</p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                alert("Link copied! Share it! 💌");
              }}
              className="rounded-xl bg-yellow-400 px-5 py-3 text-base font-jersey text-black transition hover:bg-yellow-500 active:scale-90"
            >
              COPY
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
