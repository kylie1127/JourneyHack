"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    async function handleSignup() {
        if (!email || !password || !username) {
            alert("Please fill in all fields");
             return;
        }
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            alert(error.message);
            return;
        }
        const user = data.user;
        if (!user) {
            alert("Signup failed");
            return;
        }
        await supabase.from("profiles").insert({
            id: user.id,
            username,
        });
        await supabase.from("mailboxes").insert({
            user_id: user.id,
        });
        router.push("/mailbox");
    }
    
  return (
    <main className="relative min-h-screen bg-[#0E1A2B] text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-40"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        {/* Login Card */}
        <div className="w-full max-w-sm rounded-3xl bg-[#FFF9F6] px-8 py-10 shadow-2xl">
          {/* Title */}
          <h1 className="mb-8 text-center font-jersey text-3xl text-black">
            Sign Up
          </h1>

          {/* ID */}
          <div className="mb-5">
            <label className="font-jersey mb-1 block text-base text-gray-600">
              User Name
            </label>
            <input
              type="text"
              className="w-full border-b border-gray-400 bg-transparent py-2 text-black outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div className="mb-5">
            <label className="font-jersey mb-1 block text-base text-gray-600">
              Email
            </label>
            <input
              type="text"
              className="w-full border-b border-gray-400 bg-transparent py-2 text-black outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="font-jersey mb-1 block text-base text-gray-600">
              password
            </label>
            <input
              type="password"
              className="mb-6 w-full border-b border-gray-400 bg-transparent py-2 text-black outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* signup Button */}
          <button
            onClick={handleSignup}
            className="mb-6 w-full rounded-full bg-yellow-400 py-4 font-jersey text-lg text-black shadow-md hover:bg-yellow-300 hover:border-yellow-300 transition active:scale-95"
          >
            Sign up
          </button>

          <p className="font-jersey mb-6 text-center text-sm text-gray-600">
            Alread a member?{"  "}
            <Link href="/login">
              <span className="font-jersey cursor-pointer text-yellow-500 transition-all duration-300 hover:text-yellow-300 hover:opacity-80">
                Sign in
              </span>
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
