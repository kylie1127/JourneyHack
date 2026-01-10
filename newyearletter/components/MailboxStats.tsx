"use client";

export default function MailboxStats({
  letterCount,
  daysLeft,
}: {
  letterCount: number;
  daysLeft: number;
}) {
  return (
    <div className="mt-6 flex gap-6 text-center">
      <div className="rounded-2xl bg-white/10 px-6 py-4">
        <p className="font-jersey text-sm text-gray-300">Letters</p>
        <p className="font-jersey text-2xl text-yellow-300">{letterCount}</p>
      </div>

      <div className="rounded-2xl bg-white/10 px-6 py-4">
        <p className="font-jersey text-sm text-gray-300">Unlocks in</p>
        <p className="font-jersey text-2xl text-yellow-300">D-{daysLeft}</p>
      </div>
    </div>
  );
}
