"use client";

export default function WritePage({
  params,
}: {
  params: { mailboxId: string };
}) {
  function handleSubmit() {
    alert("Letter sent!");
  }

  return (
    <main className="min-h-screen bg-[#0E1A2B] px-6 py-10 text-white">
      <h1 className="mb-6 font-jersey text-3xl">
        Write a Letter 💌
      </h1>

      <p className="mb-2">Choose envelope</p>
      <div className="mb-4 flex gap-3">
        <div className="h-12 w-12 rounded bg-red-400" />
        <div className="h-12 w-12 rounded bg-blue-400" />
        <div className="h-12 w-12 rounded bg-green-400" />
      </div>

      <input
        placeholder="Your nickname"
        className="mb-4 w-full rounded bg-white/10 px-4 py-3"
      />

      <textarea
        placeholder="Write your letter"
        className="mb-6 h-40 w-full rounded bg-white/10 px-4 py-3"
      />

      <button
        onClick={handleSubmit}
        className="w-full rounded-full bg-yellow-400 py-4 font-jersey text-xl text-black"
      >
        Send Letter
      </button>
    </main>
  );
}
