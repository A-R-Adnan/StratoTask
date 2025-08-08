import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { 
  auth, 
  googleProvider 
} from "../firebase/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from "firebase/auth";

const AuthForm = () => {
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urlMode = searchParams.get("mode");
    if (urlMode === "signup" || urlMode === "login") {
      setMode(urlMode);
    }
  }, [searchParams]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setDisplayName("");
    setError("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 px-4 sm:px-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-gray-300">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900 tracking-tight drop-shadow-md">
          {mode === "login" ? "Welcome Back!" : "Create Your Account"}
        </h2>
        <div className="flex rounded-full overflow-hidden shadow-lg mb-6 max-w-xs mx-auto">
          <button
            className={`flex-1 py-2 text-lg font-semibold text-center transition-colors duration-300 focus:outline-none ${
              mode === "login"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-400"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => {
              setMode("login");
              resetForm();
            }}
            disabled={loading}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 text-lg font-semibold text-center transition-colors duration-300 focus:outline-none ${
              mode === "signup"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-400"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => {
              setMode("signup");
              resetForm();
            }}
            disabled={loading}
          >
            Sign Up
          </button>
        </div>
        <form onSubmit={mode === "login" ? handleLogin : handleSignup} className="space-y-6">
          {mode === "signup" && (
            <div>
              <label htmlFor="displayName" className="block text-gray-700 font-semibold mb-1 text-base">
                Name
              </label>
              <input
                id="displayName"
                type="text"
                placeholder="Your Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required={mode === "signup"}
                disabled={loading}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                autoComplete="name"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1 text-base">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1 text-base">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
            />
          </div>
          {error && (
            <div className="text-red-600 text-center text-sm font-medium">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-xl shadow-md text-base transition"
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="mt-8 text-center">
          <p className="mb-4 text-gray-700 text-sm font-medium">Or continue with</p>
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex items-center justify-center w-full border border-gray-300 rounded-full py-2 shadow-sm hover:shadow-md hover:bg-gray-100 transition disabled:opacity-60 disabled:cursor-not-allowed text-sm"
          >
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M488 261.8c0-17.4-1.5-34.2-4.3-50.5H249v95.5h134.9c-5.8 31.3-23.4 57.8-50.1 75.6v62.7h81c47.3-43.6 74.2-107.9 74.2-183.3zM249 492c67 0 123.2-22.1 164.3-60.1l-81-62.7c-22.7 15.3-51.8 24.4-83.3 24.4-63.9 0-118-43.2-137.4-101.5H27.5v63.7C67.9 439 151.7 492 249 492zM111.7 298.6c-6.6-19.6-6.6-40.9 0-60.5V174.4H27.5c-28.3 56.9-28.3 123.9 0 180.8l84.2-57.4zM249 96c35.1 0 66.7 12.1 91.6 35.9l68.6-68.3C366.8 24.6 311.3 0 249 0 151.7 0 67.9 53 27.5 138.8l84.2 63.7c19.5-58.3 73.5-101.5 137.3-101.5z" />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
