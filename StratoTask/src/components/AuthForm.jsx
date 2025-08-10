import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
 // <-- use the hook file if split, else AuthContext

const AuthForm = () => {
  const { signup, login } = useAuth();
  const navigate = useNavigate(); // ✅ needed for redirects
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    email: "",
    password: "",
    displayName: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (mode === "signup") {
        if (!form.displayName) {
          setError("Please provide your name.");
          setLoading(false);
          return;
        }
        await signup(form.email, form.password, form.displayName);
      } else {
        await login(form.email, form.password);
      }
      // ✅ on success go to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to authenticate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">
        {mode === "signup" ? "Sign Up" : "Log In"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {mode === "signup" && (
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              name="displayName"
              className="w-full border rounded px-4 py-2"
              value={form.displayName}
              onChange={handleChange}
              disabled={loading}
              autoComplete="name"
            />
          </div>
        )}
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border rounded px-4 py-2"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border rounded px-4 py-2"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            required
          />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded font-semibold"
          disabled={loading}
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
      <p className="mt-6 text-center">
        {mode === "signup" ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              className="text-indigo-600 underline"
              onClick={() => setMode("login")}
              disabled={loading}
            >
              Log In
            </button>
          </>
        ) : (
          <>
            New here?{" "}
            <button
              type="button"
              className="text-indigo-600 underline"
              onClick={() => setMode("signup")}
              disabled={loading}
            >
              Sign Up
            </button>
          </>
        )}
      </p>
    </div>
  );
};

export default AuthForm;
