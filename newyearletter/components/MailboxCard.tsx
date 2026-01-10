import { getMailboxLevel } from "@/lib/mailbox";

export default function MailboxCard({ count }: { count: number }) {
  const level = getMailboxLevel(count);

  return (
    <div className="mx-auto mt-6 w-full max-w-xs rounded-3xl bg-white p-6 text-black">
      <img src={`/mailboxes/level${level}.png`} className="mx-auto h-40" />
      <p className="mt-2 text-center font-jersey">
        Lv.{level} • {10 - (count % 10)} letters to upgrade
      </p>
    </div>
  );
}
