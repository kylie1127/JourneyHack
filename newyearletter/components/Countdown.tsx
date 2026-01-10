"use client";
import { useEffect, useState } from "react";

export default function Countdown() {
  const target = new Date("2026-01-01T00:00:00");

  const [time, setTime] = useState(target.getTime() - Date.now());

  useEffect(() => {
    const t = setInterval(() => {
      setTime(target.getTime() - Date.now());
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const d = Math.max(0, Math.floor(time / 86400000));

  return (
    <div className="text-center font-jersey text-yellow-300">
      {d} days until open 🎆
    </div>
  );
}
