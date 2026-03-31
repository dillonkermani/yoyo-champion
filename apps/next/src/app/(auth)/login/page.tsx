"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore, selectIsLoading, useOnboardingStore } from "@yoyo/store";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");

  const isLoading = useUserStore(selectIsLoading);
  const loginWithCredentials = useUserStore((s) => s.loginWithCredentials);
  const login = useUserStore((s) => s.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const success = await loginWithCredentials(email, password);
    if (success) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#F7F8FA]">
      <div className="w-full max-w-[420px]">
        {/* Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-block mb-4">
            <span className="text-[22px] font-extrabold tracking-tight text-gray-900">
              YoYo<span className="text-[#9bedff]">Champion</span>
            </span>
          </Link>
          <h1 className="text-[22px] font-extrabold text-gray-900 mb-1">Welcome back</h1>
          <p className="text-[15px] text-[#536471]">Sign in to continue your yo-yo journey</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[20px] shadow-lg p-7 border border-[#E1E8ED]">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error */}
            {error && (
              <div className="rounded-[14px] bg-red-50/80 border border-red-200/50 px-4 py-3 text-[13px] text-red-500">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[13px] font-semibold text-gray-900">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-[14px] border border-[#E1E8ED] px-4 py-3.5 text-sm text-gray-900 placeholder-[#8899A6] focus:outline-none focus:ring-2 focus:ring-[#9bedff] focus:border-transparent transition-all"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-[13px] font-semibold text-gray-900">
                Password
              </label>
              <div className="relative flex items-center rounded-[14px] border border-[#E1E8ED] focus-within:ring-2 focus-within:ring-[#9bedff] focus-within:border-transparent transition-all">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="flex-1 rounded-[14px] border-0 px-4 py-3.5 text-sm text-gray-900 placeholder-[#8899A6] focus:outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="pr-4 text-[13px] font-semibold text-[#8899A6] hover:text-[#536471] transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <button type="button" className="text-[13px] font-semibold text-[#1CB0F6] hover:text-[#0e9ad8] transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-[14px] bg-[#9bedff] px-4 py-3 text-base font-bold text-gray-900 hover:bg-[#7dd9f0] active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed mt-1"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-4">
            <div className="flex-1 h-px bg-[#E1E8ED]" />
            <span className="text-xs font-semibold text-[#8899A6]">OR</span>
            <div className="flex-1 h-px bg-[#E1E8ED]" />
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-[#536471]">
            Don&apos;t have an account?{" "}
            <Link href="/onboarding?step=account_user" className="font-bold text-[#1CB0F6] hover:text-[#0e9ad8] transition-colors">
              Sign up free
            </Link>
          </p>
        </div>

        {/* Dev skip */}
        <div className="mt-6 text-center space-y-2">
          <button
            onClick={() => {
              login({ id: 'dev-user', email: 'dev@yoyochampion.com', displayName: 'Dev User', createdAt: new Date().toISOString() });
              useOnboardingStore.getState().completeOnboarding();
              router.replace('/dashboard');
            }}
            className="text-[13px] font-semibold text-[#FF9600] hover:text-orange-600 transition-colors"
          >
            Skip (dev mode)
          </button>
          <p>
            <Link href="/" className="text-[13px] text-[#8899A6] hover:text-[#536471] transition-colors">
              &larr; Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
