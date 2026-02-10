"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ResetPasswordPage() {
  // States for input values
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // States for toggling visibility
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Check if both fields are NOT empty
  const isFormValid = newPassword.trim() !== "" && confirmPassword.trim() !== "";

  const handleResetPress = () => {
    if (isFormValid) {
      console.log("Reset Password button pressed", { newPassword, confirmPassword });
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-lato">
      
      <div className="flex flex-col justify-center items-center bg-ui-surface px-2 ">
        <div className="w-full max-w-150">
          <div className="mb-10 text-center">
            <h1 className="text-[40px] font-bold text-text-main mb-6 leading-tight"> 
              Create new password
            </h1>
            <p className="text-[16px] text-text-muted">
              Your new password must be strong and unique
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          
            {/* New Password Field */}
            <div className="relative">
              <label className="block text-[14px] font-normal text-text-main mb-2 mt-17.5" >
                Enter New Password<span className="text-status-error">*</span>
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-4 rounded-lg border border-ui-border bg-ui-background outline-none transition-all placeholder:text-gray-400 text-text-main focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <Image
                    src="/logos/auth/open_eye.png"
                    alt="Toggle Visibility"
                    width={20}
                    height={20}
                    className={showNewPassword ? "opacity-100" : "opacity-50"}
                  />
                </button>
              </div>
             
              <p className="text-[12px] text-text-muted mt-2">
                Password must contain 12 characters minimum
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <label className="block text-[14px] font-normal text-text-main mb-2 mt-10">
                Confirm New Password<span className="text-status-error">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-4 rounded-lg border border-ui-border bg-ui-background outline-none transition-all placeholder:text-gray-400 text-text-main focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <Image
                    src="/logos/auth/open_eye.png"
                    alt="Toggle Visibility"
                    width={20}
                    height={20}
                    className={showConfirmPassword ? "opacity-100" : "opacity-50"}
                  />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full font-bold py-4.5 rounded-lg transition-all shadow-md active:scale-[0.98] mt-17.5 ${
                isFormValid 
                ? "bg-brand-primary text-white hover:opacity-90" 
                : "bg-gray-500 text-white cursor-not-allowed opacity-70"
              }`}
              onClick={handleResetPress}
            >
              Reset Password
            </button>

            <div className="text-center mt-10">
              <p className="text-[14px] text-text-muted ">
                Remember password?{" "}
                <Link 
                  href="/auth/login" 
                  className="font-semibold text-brand-primary hover:underline"
                >
                  Back to Login
                </Link>
              </p>
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