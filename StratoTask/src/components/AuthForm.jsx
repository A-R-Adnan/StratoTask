import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { auth, googleProvider } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { syncUserToBackend } from "../utils/api";

const fieldStyles =
  "w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50";

const getPasswordStrength = (password) => {
  if (!password) return { label: "", color: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  switch (score) {
    case 0:
    case 1:
      return { label: "Weak", color: "text-red-500" };
    case 2:
      return { label: "Fair", color: "text-yellow-500" };
    case 3:
      return { label: "Good", color: "text-blue-500" };
    case 4:
      return { label: "Strong", color: "text-green-500" };
    default:
      return { label: "", color: "" };
  }
};

const AuthForm = () => {
  const { signup, login } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    email: "",
    password: "",
    displayName: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const passwordStrength = getPasswordStrength(form.password);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        if (!form.displayName) {
          setError("Please enter your name");
          setLoading(false);
          return;
        }
        if (passwordStrength.label === "Weak") {
          setError("Please choose a stronger password");
          setLoading(false);
          return;
        }
        await signup(form.email, form.password, form.displayName);
      } else {
        await login(form.email, form.password);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to authenticate.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncUserToBackend({
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName || "",
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 relative overflow-hidden px-4">
      {/* Decorative geometric shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute top-10 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-md bg-white/20 backdrop-blur-md rounded-3xl p-10 shadow-xl border border-white/30">
        {/* Logo & Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-white/80 flex items-center justify-center rounded-full shadow-lg mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#5B21B6"
              viewBox="0 0 24 24"
              className="w-10 h-10"
              aria-label="StratoTask logo"
              role="img"
            >
              <rect x="3" y="3" width="7" height="18" rx="2" />
              <rect x="14" y="3" width="7" height="12" rx="2" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-white select-none">
            {mode === "signup" ? "Create your account" : "Welcome back"}
          </h2>
          <p className="text-indigo-200 mt-2 mb-8 max-w-md text-center select-none">
            {mode === "signup"
              ? "Join StratoTask and boost your productivity."
              : "Log in to continue to your workspace."}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit} aria-live="polite" autoComplete="off">
          {mode === "signup" && (
            <div>
              <label htmlFor="displayName" className="block font-medium text-white mb-1">
                Name
              </label>
              <input
                id="displayName"
                type="text"
                name="displayName"
                value={form.displayName}
                disabled={loading}
                onChange={handleChange}
                className={`${fieldStyles} placeholder-indigo-300`}
                placeholder="Your full name"
                required
                aria-required="true"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block font-medium text-white mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              disabled={loading}
              onChange={handleChange}
              className={`${fieldStyles} placeholder-indigo-300`}
              placeholder="you@example.com"
              required
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium text-white mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              disabled={loading}
              onChange={handleChange}
              className={`${fieldStyles} placeholder-indigo-300`}
              placeholder="••••••••"
              required
              aria-required="true"
              aria-describedby="password-strength-text"
            />
            {mode === "signup" && form.password && (
              <p
                id="password-strength-text"
                className={`mt-1 text-sm font-semibold ${passwordStrength.color}`}
                aria-live="polite"
              >
                Password Strength: {passwordStrength.label}
              </p>
            )}
          </div>

          {error && (
            <div
              className="bg-red-200 text-red-800 border border-red-300 rounded px-3 py-2 text-center text-sm animate-pulse"
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold shadow-lg transition ${
              loading
                ? "bg-indigo-400 cursor-not-allowed text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {loading
              ? mode === "signup"
                ? "Signing Up..."
                : "Logging In..."
              : mode === "signup"
              ? "Sign Up"
              : "Log In"}
          </button>
        </form>

        {/* Social Login: Google Only */}
        <div className="mt-8">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 rounded-lg border border-white/50 bg-white/30 hover:bg-white/40 transition text-indigo-800 font-semibold py-2 shadow-md"
            aria-label="Sign in with Google"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M533.5 278.4c0-18.4-1.6-36.1-4.7-53.4H272v101.2h147.5c-6.4 34-25.8 62.9-54.8 82.4v68h88.4c51.8-47.7 81.4-118.1 81.4-198.2z"
                fill="#4285f4"
              />
              <path
                d="M272 544.3c73.4 0 135-24.2 180-65.6l-88.4-68c-24.7 16.5-56.6 26-91.6 26-70 0-129.3-47-150.6-110.1h-89v69.4c45.2 89 137.7 148.3 239.6 148.3z"
                fill="#34a853"
              />
              <path
                d="M121.4 323.1c-10.2-30.6-10.2-63.5 0-94.1v-69.5h-89c-38 75.9-38 164.5 0 240.4l89-69.4z"
                fill="#fbbc04"
              />
              <path
                d="M272 107c38.7 0 73.5 13.3 101 39.3l75.8-75.8C405.1 24.9 343.5 0 272 0 170.1 0 77.6 59.3 32.5 148.3l89 69.5c21.4-63.1 80.7-110.1 150.5-110.1z"
                fill="#ea4335"
              />
            </svg>
            Sign in with Google
          </button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-indigo-200 text-sm select-none">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                className="text-indigo-300 font-semibold hover:underline focus:outline-none"
                disabled={loading}
                onClick={() => setMode("login")}
              >
                Log In
              </button>
            </>
          ) : (
            <>
              New here?{" "}
              <button
                type="button"
                className="text-indigo-300 font-semibold hover:underline focus:outline-none"
                disabled={loading}
                onClick={() => setMode("signup")}
              >
                Sign Up
              </button>
            </>
          )}
        </p>
      </div>
      <style>
        {`
          /* Blob animation for decorative shapes */
          @keyframes blob {
            0%, 100% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}
      </style>
    </div>
  );
};

export default AuthForm;
