"use client";
import { supabase } from "../../lib/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";


export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    async function handleLogin() {
      console.log("LOGIN CLICKED");

      const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
      });

      console.log("RESULT", data, error);
      if (error) {
      alert(error.message);
      return;
      }
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
              Sign in
            </h1>

            {/* ID */}
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

            {/* Password */}
            <div className="mb-4">
              <label className="font-jersey mb-1 block text-base text-gray-600">
                password
              </label>
              <input
                type="password"
                className="w-full border-b border-gray-400 bg-transparent py-2 text-black outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Options */}
            <div className="mb-6 flex items-center justify-between text-sm">
              <label className="font-jersey flex items-center gap-2 text-gray-600">
                <input type="checkbox" />
                remember me
              </label>
              <Link href="/PWsetting">
                <button className="font-jersey text-yellow-500 transition-all duration-300 hover:text-yellow-300 hover:opacity-80">
                  forgot password?
                </button>
              </Link>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="mb-6 w-full rounded-full bg-yellow-400 py-4 font-jersey text-lg text-black shadow-md hover:bg-yellow-300 hover:border-yellow-300 transition active:scale-95"
            >
              Sign in
            </button>
            {/* Sign up */}
            <p className="font-jersey mb-6 text-center text-sm text-gray-600">
              Not a member?{"  "}
              <Link href="/signup">
                <span className="font-jersey cursor-pointer text-yellow-500 transition-all duration-300 hover:text-yellow-300 hover:opacity-80">
                  click here
                </span>
              </Link>
            </p>

            {/* Divider */}
            <div className="mb-2 font-jersey mb-4 flex items-center gap-3 text-gray-400">
              <div className="h-px flex-1 bg-gray-300" />
              <span className="text-sm">or log in with</span>
              <div className="h-px flex-1 bg-gray-300" />
            </div>

            {/*social*/}
            <div className="flex justify-center gap-6">
              {/* google*/}
              <button className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-100 hover:border-gray-300 transition-all">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-6 w-6"
                />
              </button>

              {/* facebook */}
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1877F2] shadow-sm hover:opacity-80 transition-all">
                <img
                  src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                  alt="Facebook"
                  className="h-6 w-6 brightness-0 invert"
                />
              </button>

              {/* apple */}
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-black shadow-sm hover:opacity-80 transition-all">
                <svg viewBox="0 0 399 500" width="30" height="30" fill="white">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    );
}
