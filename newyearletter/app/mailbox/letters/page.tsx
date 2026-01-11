"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// 1. Define ENVELOPE colors to match envelope_level (1=yellow, 2=pink, etc.)
const ENVELOPE_MAP: { [key: number]: string } = {
  1: "yellow",
  2: "pink",
  3: "blue",
  4: "green",
};

export default function MailboxLettersPage() {
  const [letters, setLetters] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: mailbox } = await supabase
        .from("mailboxes")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (!mailbox) return;

      const { data: lettersData } = await supabase
        .from("letters")
        .select("*")
        .eq("mailbox_id", mailbox.id)
        .order("created_at", { ascending: false }); // Show newest first

      setLetters(lettersData ?? []);
    }
    load();
  }, []);

  return (
    <main className="min-h-screen bg-[#FFF9F6] px-6 py-10">
      <h2 className="mb-8 text-center font-jersey text-3xl text-gray-800">
        My Letters ({letters.length})
      </h2>

      {/* 2. Grid Layout with fixed column names */}
      <div className="grid grid-cols-3 gap-y-10 gap-x-4">
        {letters.map((l) => (
          <div
            key={l.id}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="relative transition-transform group-hover:scale-110 active:scale-90">
              <Image
                // Convert envelope_level(int) back to color name for the file path
                src={`/envelopes/${
                  ENVELOPE_MAP[l.envelope_level] || "yellow"
                }.png`}
                alt="Envelope"
                width={90}
                height={90}
                className="drop-shadow-md"
              />
            </div>

            <p className="mt-3 font-jersey text-sm text-gray-600 text-center leading-tight">
              From.
              <br />
              <span className="text-black font-bold">
                {/* 3. CHANGE: Use l.sender_name instead of l.nickname */}
                {l.sender_name || "Anonymous"}
              </span>
            </p>
          </div>
        ))}
      </div>

      {letters.length === 0 && (
        <p className="mt-20 text-center font-jersey text-gray-400">
          No letters yet...
        </p>
      )}
    </main>
  );
}
