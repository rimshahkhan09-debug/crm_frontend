"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/app/lib/axios"; // Adjust path if your lib folder is elsewhere

export default function LoginPage() {
  const router = useRouter();

  // Input States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Error States (for red validation text)
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEyeLogoPress = () => {
    setShowPassword(!showPassword);
  };

  // Button is enabled only if both fields have text
  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleLoginPress = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors at the start of every attempt
    setEmailError("");
    setPasswordError("");

    if (!isFormValid) return;

    setLoading(true);
    try {
      // POST to http://localhost:5282/api/auth/login
      const response = await api.post("/auth/login", {
        email: email,
        password: password,
      });

      console.log("Login Success:", response.data);
      
     
      // router.push("/portal");

    } catch (error: any) {
      const status = error.response?.status;
      const backendMessage = error.response?.data?.message || "";

      // Logic to show errors based on .NET backend verification results
      if (status === 401 || status === 400) {
        if (backendMessage.toLowerCase().includes("verified")) {
          setEmailError("This email address is not verified");
        } else if (backendMessage.toLowerCase().includes("password")) {
          setPasswordError("Enter a valid password");
        } else if (backendMessage.toLowerCase().includes("email") || backendMessage.toLowerCase().includes("user")) {
          setEmailError("Enter a valid email address");
        } else {
          // Fallback if the message is generic
          setPasswordError("Invalid email or password");
        }
      } else {
        // Handling 500 or network errors
        setEmailError("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-lato">
      {/* Left Side: Login Form */}
      <div className="flex flex-col justify-center items-center bg-ui-surface px-8 py-12">
        <div className="w-full max-w-150">
          <div className="mb-17.5 text-center">
            <h1 className="text-[40px] font-bold text-text-main mb-6">
              Let's get started
            </h1>
            <p className="text-[16px] text-text-muted">
              Enter your email and password to continue
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLoginPress}>
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
                  if (emailError) setEmailError(""); // Clear error when typing
                }}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-lg border bg-ui-background outline-none transition-all placeholder:text-gray-400 text-text-main ${
                  emailError 
                    ? "border-status-error ring-1 ring-status-error/20" 
                    : "border-ui-border focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                }`}
              />
              {emailError && (
                <p className="text-status-error text-[12px] mt-1 font-medium">{emailError}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-[14px] font-normal text-text-main mb-2">
                Enter Your Password<span className="text-status-error">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError(""); // Clear error when typing
                  }}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 rounded-lg border bg-ui-background outline-none transition-all placeholder:text-gray-400 text-text-main ${
                    passwordError 
                      ? "border-status-error ring-1 ring-status-error/20" 
                      : "border-ui-border focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-text-main"
                  onClick={handleEyeLogoPress}
                >
                  <Image
                    src="/logos/auth/open_eye.png"
                    alt="Toggle Password Visibility"
                    width={20}
                    height={20}
                    className={showPassword ? "opacity-100" : "opacity-50"}
                  />
                </button>
              </div>
              {passwordError && (
                <p className="text-status-error text-[12px] mt-1 font-medium">{passwordError}</p>
              )}

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
              disabled={!isFormValid || loading}
              className={`w-full font-bold py-3.5 rounded-lg transition-all shadow-md active:scale-[0.99] mt-17.5 ${
                isFormValid && !loading
                  ? "bg-brand-primary text-white hover:opacity-90"
                  : "bg-gray-500 text-white cursor-not-allowed opacity-70"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side: Illustration */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-brand-primary p-12 relative overflow-hidden text-white">
        <div className="relative z-10 w-full max-w-3xl flex flex-col items-center mt-[100]">
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