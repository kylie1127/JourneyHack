"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Countdown from "@/components/Countdown";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function MailboxMainPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

      setUsername(profile?.username ?? "user");
    }
    load();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
      {/* title */}
      <h1 className="mb-3 font-jersey text-3xl text-black">
        {username}’s mailbox
      </h1>

      {/* countdown */}
      <div className="mb-8">
        <Countdown />
      </div>

      {/* mailbox */}
      <button
        onClick={() => router.push("/mailbox/letters")}
        className="transition active:scale-95"
      >
        <Image
          src="/mailboxes/level-1.png"
          alt="Mailbox"
          width={260}
          height={260}
          className="drop-shadow-xl"
        />
      </button>

      <p className="mt-4 font-jersey text-sm text-gray-500">
        Tap mailbox to open
      </p>
      <div className="mt-12 w-full max-w-xs rounded-2xl bg-gray-50 p-4 border border-dashed border-gray-300">
        <p className="text-center font-jersey text-xs text-gray-400 mb-2">
          Share your mailbox link!
        </p>
        <div className="flex items-center gap-2">
          <input
            readOnly
            value={`https://yourdomain.com/write/${username}`} // 실제 도메인으로 변경
            className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs truncate text-gray-500"
          />
          <button
            onClick={() => {
              const url = `${window.location.origin}/write/${username}`;
              navigator.clipboard.writeText(url);
              alert("Link copied! Share it on Instagram!");
            }}
            className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg text-xs active:scale-95 transition"
          >
            Copy
          </button>
        </div>
      </div>
    </main>
  );
}
