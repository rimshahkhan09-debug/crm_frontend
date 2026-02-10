"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/app/lib/axios"; // Adjust this path to your axios instance

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleSendCodePress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === "") return;

    setLoading(true);
    setEmailError("");

    try {
      // 1. Call the backend API
      await api.post("/user/forgot-password", { email });

      // 2. If successful, navigate to the verification screen
      // We pass the email as a query param so the next screen knows who to verify
      router.push(`/auth/verification_screen?email=${encodeURIComponent(email)}`);
      
    } catch (error: any) {
      console.error("Forgot Password Error:", error);
      
      // Handle "User not found" or other errors
      if (error.response?.status === 404) {
        setEmailError("No account found with this email");
      } else {
        setEmailError("Failed to send code. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

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

          <form className="space-y-6" onSubmit={handleSendCodePress}>
            {/* Email Field */}
            <div>
              <label className="block text-[14px] font-normal text-text-main mb-2">
                Enter Your Email<span className="text-status-error">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-lg border bg-ui-background outline-none transition-all placeholder:text-gray-400 text-text-main ${
                  emailError 
                  ? "border-status-error ring-1 ring-status-error/20" 
                  : "border-ui-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                }`}
              />
              {emailError && (
                <p className="text-status-error text-[12px] mt-2 font-medium">{emailError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isEmailEmpty || loading}
              className={`w-full font-bold py-3.5 rounded-lg transition-all shadow-md active:scale-[0.98] mt-10 ${
                isEmailEmpty || loading
                  ? "bg-gray-500 text-white cursor-not-allowed opacity-70" 
                  : "bg-brand-primary hover:bg-brand-primary/90 text-white cursor-pointer"
              }`}
            >
              {loading ? "Sending..." : "Send Code"}
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

      {/* Right Side Illustration */}
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