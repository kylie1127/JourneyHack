export default function LetterGrid({ letters }: { letters: any[] }) {
  return (
    <div className="mt-6 grid grid-cols-4 gap-3">
      {letters.map((l) => (
        <div key={l.id} className="text-center">
          <img src={`/envelopes/${l.envelope}.png`} />
          <p className="text-xs font-jersey">From. {l.from_name}</p>
        </div>
      ))}
    </div>
  );
}
