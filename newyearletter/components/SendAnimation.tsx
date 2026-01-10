"use client";
import { motion } from "framer-motion";

export default function SendAnimation() {
  return (
    <motion.img
      src="/envelopes/yellow.png"
      initial={{ y: 0, scale: 1 }}
      animate={{ y: -250, scale: 0.2 }}
      transition={{ duration: 1 }}
      className="mx-auto"
    />
  );
}
