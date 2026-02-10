"use client";

import { useState } from "react"; // Added useState
import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState(""); // 1. State for email input

  const handleSendCodePress = () => {
    if (email.trim() !== "") {
      console.log("Send Code button pressed for:", email);
    }
  };

  // 2. Logic to check if field is empty
  const isEmailEmpty = email.trim() === "";

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-lato">
      
      <div className="flex flex-col justify-center items-center bg-ui-surface px-8 py-12">
        <div className="w-full max-w-150">
          <div className="mb-10 text-center ">
            <h1 className="text-[40px] font-bold text-text-main mb-6 leading-tight"> 
              Forgot Password
            </h1>
            <p className="text-[14px] text-text-muted px-10 mb-11.75">
              Enter your registered email address to receive a verification code.
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Email Field */}
            <div>
              <label className="block text-[14px] font-normal text-text-main mb-2">
                Enter Your Email<span className="text-status-error">*</span>
              </label>
              <input
                type="email"
                value={email} // 3. Link state to input
                onChange={(e) => setEmail(e.target.value)} // 4. Update state on change
                placeholder="Enter your email"
                className="w-full px-4 py-3 mb-21.75 rounded-lg border border-ui-border bg-ui-background outline-none transition-all placeholder:text-gray-400 text-text-main focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
              />
            </div>

            {/* 5. Dynamic Button Styling and Disabled state */}
            <button
              type="button"
              disabled={isEmailEmpty}
              className={`w-full font-bold text-[14px] py-3.5 rounded-lg transition-all shadow-md active:scale-[0.98] ${
                isEmailEmpty 
                  ? "bg-gray-500 text-white cursor-not-allowed opacity-70" 
                  : "bg-brand-primary hover:bg-brand-primary/90 text-white cursor-pointer"
              }`}
              onClick={handleSendCodePress}
            >
              Send Code
            </button>

            <div className="text-center mt-6">
              <Link 
                href="/auth/login" 
                className="text-[14px] font-semibold text-brand-primary hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex flex-col justify-center items-center bg-brand-primary p-12 relative overflow-hidden text-white">
        <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
          <Image
            src="/images/auth/lock-passworsd.png" 
            alt="Forgot Password Illustration"
            width={750}
            height={750}
            priority
            className="w-full h-auto mb-8 drop-shadow-2xl"
          />
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full -ml-20 -mb-20 blur-3xl" />
      </div>
    </div>
  );
}