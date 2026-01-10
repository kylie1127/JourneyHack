"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

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
        .eq("mailbox_id", mailbox.id);

      setLetters(lettersData ?? []);
    }
    load();
  }, []);

  return (
    <main className="min-h-screen bg-[#F9FAFB] px-6 py-10">
      <h2 className="mb-6 text-center font-jersey text-2xl">
        Letters ({letters.length})
      </h2>

      <div className="grid grid-cols-3 gap-6">
        {letters.map((l) => (
          <div key={l.id} className="flex flex-col items-center">
            <Image
              src={`/envelopes/${l.envelope || "yellow"}.png`}
              alt="Envelope"
              width={80}
              height={80}
            />
            <p className="mt-2 text-sm text-gray-700 text-center">
              From.
              <br />
              {l.nickname}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
