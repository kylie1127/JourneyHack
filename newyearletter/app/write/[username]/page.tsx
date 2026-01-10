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

    // 1. 유저 아이디 찾기
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .single();

    if (!profile) return alert("User not found!");

    // 2. 해당 유저의 mailbox_id 찾기
    const { data: mailbox } = await supabase
      .from("mailboxes")
      .select("id")
      .eq("user_id", profile.id)
      .single();

    // 3. 편지 저장
    const { error } = await supabase.from("letters").insert({
      mailbox_id: mailbox!.id,
      nickname: nickname,
      content: content,
      envelope: selectedEnvelope,
    });

    if (!error) {
      alert("Letter sent successfully! 💌");
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF9F6] px-8 py-12">
      <h1 className="text-center font-jersey text-2xl mb-8">
        Write to {username}
      </h1>

      {/* 봉투 선택 */}
      <div className="mb-8">
        <p className="text-sm font-bold mb-3">1. Choose an envelope</p>
        <div className="flex justify-between gap-2">
          {ENVELOPES.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedEnvelope(color)}
              className={`rounded-xl border-2 p-2 transition ${
                selectedEnvelope === color
                  ? "border-yellow-400 bg-white"
                  : "border-transparent opacity-50"
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

      {/* 닉네임 & 내용 */}
      <div className="space-y-4">
        <div>
          <p className="text-sm font-bold mb-2">2. Your Nickname</p>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Who are you?"
            className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-yellow-400"
          />
        </div>
        <div>
          <p className="text-sm font-bold mb-2">3. Message</p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            placeholder="Write a message for 2026..."
            className="w-full rounded-2xl border border-gray-200 p-4 outline-none focus:border-yellow-400 resize-none"
          />
        </div>
      </div>

      <button
        onClick={sendLetter}
        className="mt-10 w-full rounded-full bg-yellow-400 py-4 font-bold text-lg shadow-lg active:scale-95 transition"
      >
        Send Letter 💌
      </button>
    </main>
  );
}
