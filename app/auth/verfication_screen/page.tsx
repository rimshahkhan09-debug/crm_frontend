"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function VerificationPage() {
  const [seconds, setSeconds] = useState(120);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  
  // Initialize the ref with an empty array of the correct length
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const handleInputChange = (value: string, index: number) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace if current is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  const handleVerifyPress = () => {
    if (isOtpComplete) {
      console.log("Verifying OTP:", otp.join(""));
    }
  };

  const handleResend = () => {
    if (seconds === 0) {
      setSeconds(120);
      console.log("OTP Resent");
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const secs = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-lato">
      <div className="flex flex-col justify-center items-center bg-ui-surface px-8 py-12">
        <div className="w-full max-w-125">
          <div className="mb-10 text-center">
            <h1 className="text-[40px] font-bold text-text-main mb-4 leading-tight">
              Enter your OTP
            </h1>
            <p className="text-[16px] text-text-muted px-12">
              Please enter the 6 digit OTP we sent to your Phone Number
            </p>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col items-start">
              <label className="block text-[14px] font-normal text-text-main mb-4">
                Enter your OTP
              </label>
              
              <div className="flex justify-between w-full gap-2 sm:gap-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    // Fixed Ref Assignment
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    placeholder="0"
                    onChange={(e) => handleInputChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 sm:w-16 sm:h-16 text-center text-xl font-semibold border border-ui-border rounded-xl bg-ui-background outline-none transition-all focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 placeholder:text-gray-300 text-text-main"
                  />
                ))}
              </div>
            </div>

            <div className="text-center space-y-2">
               <p className="text-[14px] font-bold text-text-main">
                 {formatTime(seconds)}
               </p>

               <p className="text-[14px] text-text-muted">
                Didn't receive the code?{" "}
                <button 
                  type="button" 
                  disabled={seconds > 0}
                  onClick={handleResend}
                  className={`font-semibold transition-colors ${
                    seconds > 0 
                      ? "text-gray-400 cursor-not-allowed" 
                      : "text-brand-primary hover:underline cursor-pointer"
                  }`}
                >
                  Resend
                </button>
              </p>
            </div>

            <button
              type="button"
              disabled={!isOtpComplete}
              className={`w-full font-bold py-3.5 rounded-lg transition-all shadow-md active:scale-[0.98] ${
                isOtpComplete 
                  ? "bg-brand-primary text-white cursor-pointer" 
                  : "bg-gray-500 text-white cursor-not-allowed opacity-70"
              }`}
              onClick={handleVerifyPress}
            >
              Verify
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
            alt="Security Illustration"
            width={750}
            height={750}
            priority
            className="w-full h-auto drop-shadow-2xl"
          />
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full -ml-20 -mb-20 blur-3xl" />
      </div>
    </div>
  );
}