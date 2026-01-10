"use client";

import Image from "next/image";

export default function MailboxHero({
  username,
  mailboxImage,
}: {
  username: string;
  mailboxImage: string;
}) {
  return (
    <section className="flex flex-col items-center gap-6">
      <h1 className="font-jersey text-4xl text-white">{username}’s Mailbox</h1>

      <div className="relative h-64 w-64">
        <Image
          src={mailboxImage}
          alt="Mailbox"
          fill
          className="object-contain drop-shadow-2xl"
        />
      </div>
    </section>
  );
}
