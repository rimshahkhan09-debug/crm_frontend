"use client";

import { useState } from "react"; // Added useState
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  // 1. State to track visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleEyeLogoPress = () => {
    // 2. Toggle the boolean state
    setShowPassword(!showPassword);
  };

  const handleLoginPress = () => {
    console.log("Login button pressed");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-lato">
      
      <div className="flex flex-col justify-center items-center bg-ui-surface px-8 py-12">
        <div className=" w-full max-w-150">
          <div className="mb-17.5 text-center ">
            <h1 className="text-[40px] font-bold text-text-main mb-6"> 
              Let's get started
            </h1>
            <p className=" text-[16px] text-text-muted ">
              Enter your email and password to continue
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-[14px] font-normal text-text-main mb-2">
                Enter Your Email<span className="text-status-error">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-ui-border bg-ui-background focus:ring-status-error/20 focus:border-brand-primary outline-none transition-all placeholder:text-gray-400 text-text-main"
              />
            </div>

            <div className="relative">
              <label className="block text-[14px] font-normal text-text-main mb-2">
                Enter Your Password<span className="text-status-error">*</span>
              </label>
              
              {/* 3. Input type is now dynamic based on showPassword state */}
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-ui-border bg-ui-background focus:ring-status-error/20 focus:border-brand-primary outline-none transition-all placeholder:text-gray-400 text-text-main"
              />
              
              <button
                type="button"
                className="absolute right-4 top-12 text-gray-400 hover:text-text-main"
                onClick={handleEyeLogoPress}
              >
                {/* 4. Optional: You could change the icon src based on state if you have a closed_eye.png */}
                <Image
                  src={showPassword ? "/logos/auth/open_eye.png" : "/logos/auth/open_eye.png"}
                  alt="Toggle Password Visibility"
                  width={20}
                  height={20}
                  className={showPassword ? "opacity-100" : "opacity-50"} // Visual cue
                />
              </button>
              
              <div className="mt-2 text-right">
                <Link
                  href="/auth/forget_password"
                  className="text-[14px] font-semibold text-brand-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-500 hover:bg-brand-primary text-white font-bold py-3.5 rounded-lg transition-colors shadow-md active:scale-[0.99] mt-17.5"
              onClick={handleLoginPress}
            >
              Login
            </button>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex flex-col justify-center items-center bg-brand-primary p-12 relative overflow-hidden text-white">
        <div className="relative z-10 w-full max-w-3xl flex flex-col items-center mt-[100]" >
          <Image
            src="/images/auth/login-computer-security.png"
            alt="Security Illustration"
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