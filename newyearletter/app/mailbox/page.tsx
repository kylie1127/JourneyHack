/*"use client";

import { useEffect, useState } from "react";
import { getMailboxLevel } from "@/lib/mailbox";
import Countdown from "react-countdown";

export default function MailboxPage() {
  const [mailboxId, setMailboxId] = useState("");
  const [letters, setLetters] = useState<any[]>([]);
  const newYear = new Date(new Date().getFullYear() + 1, 0, 1); 

  useEffect(() => {
    const id = localStorage.getItem("mailboxId");
    if (id) setMailboxId(id);

    // 임시 더미 데이터
    setLetters([
      { sender: "Mina", envelope: "red" },
      { sender: "Alex", envelope: "blue" },
      { sender: "Joon", envelope: "green" },
    ]);
  }, []);

  const letterCount = letters.length;
  const level = getMailboxLevel(letterCount);

  return (
    <main className="min-h-screen bg-[#0E1A2B] px-6 py-10 text-white">
      <h1 className="mb-4 font-jersey text-3xl">📮 My Mailbox</h1>

      
      <div className="mb-6 flex flex-col items-center">
        <img
          src={`/mailbox/level${level}.png`}
          className="w-40"
        />
        <p className="mt-2 font-jersey">Level {level}</p>
        {level < 10 && (
          <p className="text-sm text-gray-300">
            {10 - (letterCount % 10)} letters to next upgrade
          </p>
        )}
      </div>

     
      <div className="mb-8 flex flex-col gap-3">
        {letters.map((l, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded bg-white/10 p-3"
          >
            <div className="h-10 w-10 rounded bg-yellow-400" />
            <p>{l.sender}</p>
          </div>
        ))}
      </div>

    
      <div className="rounded bg-white/10 p-4">
        <p className="mb-2 text-sm text-gray-300">
          Share your mailbox
        </p>
        <input
          readOnly
          value={`${location.origin}/write/${mailboxId}`}
          className="w-full rounded bg-black/30 px-3 py-2 text-sm"
        />
      </div>
    </main>
  );
}*/

"use client";

import { useEffect, useState } from "react";
import { getMailboxLevel } from "@/lib/mailbox";
import { supabase } from "@/lib/supabaseClient";

export default function MailboxPage() {
  const [mailboxId, setMailboxId] = useState("");
  const [letters, setLetters] = useState<any[]>([]);
  const [username, setUsername] = useState("");
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    // window / location 안전 처리
    setOrigin(window.location.origin);

    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // username
      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

      setUsername(profile?.username ?? "user");

      // mailbox
      const { data: mailbox } = await supabase
        .from("mailboxes")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (mailbox) setMailboxId(mailbox.id);

      // letters
      const { data: lettersData } = await supabase
        .from("letters")
        .select("*")
        .eq("mailbox_id", mailbox?.id);

      setLetters(lettersData ?? []);
    }

    loadUser();
  }, []);

  const letterCount = letters.length;
  const level = getMailboxLevel(letterCount);
  const lettersToNext = level < 10 ? level * 10 - letterCount : 0;

  return (
    <main className="min-h-screen bg-[#0E1A2B] px-6 py-10 text-white">
      {/* title */}
      <h1 className="mb-6 text-center font-jersey text-3xl">
        {username}’s mailbox
      </h1>

      {/* mailbox */}
      <div className="mb-6 flex flex-col items-center">
        <img
          src={`/mailboxes/level-${level}.png`}
          alt={`Mailbox level ${level}`}
          className="w-44"
        />
        <p className="mt-2 font-jersey">Lv.{level}</p>

        {level < 10 && (
          <p className="text-sm text-gray-300">
            {lettersToNext} letters to next upgrade
          </p>
        )}
      </div>

      {/* letters */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        {letters.map((l, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl">✉️</div>
            <p className="mt-1 text-xs text-gray-300">
              From.
              <br />
              {l.nickname ?? "anonymous"}
            </p>
          </div>
        ))}
      </div>

      {/* share */}
      {mailboxId && origin && (
        <div className="rounded bg-white/10 p-4">
          <p className="mb-2 text-sm text-gray-300">Share your mailbox</p>
          <input
            readOnly
            value={`${origin}/write/${mailboxId}`}
            className="w-full rounded bg-black/30 px-3 py-2 text-sm"
          />
        </div>
      )}
    </main>
  );
}



/*"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Countdown from "@/components/Countdown";
import MailboxCard from "@/components/MailboxCard";
import LetterGrid from "@/components/LetterGrid";

export default function MailboxPage() {
  const [username, setUsername] = useState("");
  const [letters, setLetters] = useState<any[]>([]);
  const [mailboxId, setMailboxId] = useState("");

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

      const { data: mailbox } = await supabase
        .from("mailboxes")
        .select("id")
        .eq("user_id", user.id)
        .single();
        
      if (!mailbox) return;

      const { data: letters } = await supabase
        .from("letters")
        .select("*")
        .eq("mailbox_id", mailbox.id);

      if (!profile) return;

      setUsername(profile.username);
      setMailboxId(mailbox.id);
      setLetters(letters || []);
    }
    load();
  }, []);

  return (
    <main className="min-h-screen bg-[#0E1A2B] px-4 py-10 text-white">
      <Countdown />

      <h1 className="mt-6 text-center font-jersey text-4xl">
        {username}’s Mailbox
      </h1>

      <MailboxCard count={letters.length} />

      <LetterGrid letters={letters} />

      <div className="mt-8 flex justify-center">
        <input
          readOnly
          value={`${window.location.origin}/write/${mailboxId}`}
          className="w-full max-w-sm rounded-full px-4 py-3 text-black"
        />
      </div>
    </main>
  );
}
*/

/*"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getMailboxLevel, getMailboxImage } from "@/lib/mailbox";

import MailboxHero from "@/components/MailboxHero";
import MailboxStats from "@/components/MailboxStats";
import LetterGrid from "@/components/LetterGrid";

export default function MailboxPage() {
  const [username, setUsername] = useState("");
  const [letters, setLetters] = useState<any[]>([]);
  const [level, setLevel] = useState(1);

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

      const { data: mailbox } = await supabase
        .from("mailboxes")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (!mailbox || !profile) return;

      const { data: lettersData } = await supabase
        .from("letters")
        .select("*")
        .eq("mailbox_id", mailbox.id);

      const count = lettersData?.length || 0;

      setUsername(profile.username);
      setLetters(lettersData || []);
      setLevel(getMailboxLevel(count));
    }

    load();
  }, []);

  const mailboxImage = getMailboxImage(level);
  const daysLeft = Math.max(
    0,
    Math.ceil((new Date("2026-01-01").getTime() - Date.now()) / 86400000)
  );

  return (
    <main className="min-h-screen bg-[#0E1A2B] px-6 py-10">
      <MailboxHero username={username} mailboxImage={mailboxImage} />

      <MailboxStats letterCount={letters.length} daysLeft={daysLeft} />

      <LetterGrid letters={letters} />
    </main>
  );
}
*/

