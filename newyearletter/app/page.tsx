import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* Background Image */}
      <img
        src="/background.png"
        alt="New Year Fireworks"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#0E1A2B]/40" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-10">
        {/* Title */}
        <div className="mt-28 text-center">
          <h1 className="font-jersey text-7xl tracking-wide">
            Dear, <span className="text-yellow-400">2026</span>
          </h1>

          <p className="mt-0 font-jersey text-2xl text-yellow-300">
            deliver your heart
          </p>
        </div>

        {/* CTA */}
        <div className="mb-16 flex flex-col items-center gap-4">
          <Link href="/login" className="w-full max-w-xs">
            <button className="w-full max-w-xs rounded-full bg-yellow-400 py-4 font-jersey text-xl text-black shadow-lg transition-all hover:bg-yellow-300 hover:border-yellow-300 active:scale-95 shadow-lg">
              📮 Create My Mailbox
            </button>
          </Link>

          <p className="font-jersey text-center text-base text-gray-200">
            Letters from your friends <br />
            will be unlocked on{" "}
            <span className="font-jersey font-semibold text-yellow-300">
              January 1st
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
