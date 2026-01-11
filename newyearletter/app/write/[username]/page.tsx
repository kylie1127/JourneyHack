"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const ENVELOPES = ["yellow", "pink", "blue", "green"];

export default function WriteLetterPage() {
  const { username } = useParams();
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [selectedEnvelope, setSelectedEnvelope] = useState("yellow");

  const sendLetter = async () => {
    if (!nickname || !content) return alert("Please fill in everything!");

    try {
      // 1. Get profile ID
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username)
        .single();

      if (!profile) return alert("User not found!");

      // 2. Get mailbox ID
      const { data: mailbox, error: mailboxError } = await supabase
        .from("mailboxes")
        .select("id")
        .eq("user_id", profile.id)
        .single();

      if (mailboxError || !mailbox) return alert("Mailbox not found!");

      // 3. Convert envelope color to level (int) matching your table
      const envelopeLevel = ENVELOPES.indexOf(selectedEnvelope) + 1;

      // 4. Send letter with correct column names: sender_name, envelope_level
      const { error } = await supabase.from("letters").insert({
        mailbox_id: mailbox.id,
        sender_name: nickname, // Your table column name
        content: content, // Your table column name
        envelope_level: envelopeLevel, // Your table column name (int)
      });

      if (error) throw error;

      alert("Letter sent successfully! 💌");
      router.push("/");
    } catch (error: any) {
      console.error("Error sending letter:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF9F6] px-8 py-12">
      <h1 className="text-center font-jersey text-3xl mb-8">
        Write a letter to {username}
      </h1>

      {/* Choose Envelope */}
      <div className="mb-8">
        <p className="text-xl font-jersey mb-3 text-gray-800">
          1. Choose an envelope
        </p>
        <div className="flex justify-between gap-2">
          {ENVELOPES.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedEnvelope(color)}
              className={`rounded-xl border-2 p-2 transition ${
                selectedEnvelope === color
                  ? "border-yellow-400 bg-white shadow-md"
                  : "border-transparent opacity-50 hover:opacity-100"
              }`}
            >
              <Image
                src={`/envelopes/${color}.png`}
                alt={color}
                width={60}
                height={60}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-6">
        <div>
          <p className="text-xl font-jersey mb-2 text-gray-800">
            2. Your Nickname
          </p>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Who are you?"
            className="w-full rounded-xl border border-gray-200 p-4 outline-none focus:border-yellow-400 text-black shadow-sm"
          />
        </div>
        <div>
          <p className="text-xl font-jersey mb-2 text-gray-800">3. Message</p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            placeholder="Write a message for 2026..."
            className="w-full rounded-2xl border border-gray-200 p-4 outline-none focus:border-yellow-400 resize-none text-black shadow-sm"
          />
        </div>
      </div>

      <button
        onClick={sendLetter}
        className="mt-12 w-full rounded-full bg-yellow-400 py-4 text-2xl font-jersey text-black shadow-lg active:scale-95 transition-transform hover:bg-yellow-500"
      >
        Send Letter 💌
      </button>
    </main>
  );
}
