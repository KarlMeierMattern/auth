"use client";

import axios from "axios";
axios.defaults.withCredentials = true; // Global setting
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const baseUrl = import.meta.env.BASE_URL;
  axios.defaults.baseURL = baseUrl;

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior

    if (!email || !password) {
      setMessage("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("/login", { email, password });
      setMessage("Logged in successfully!");
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      setMessage(errorMessage);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 h-screen w-screen relative">
      <div className="absolute h-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white rounded-xl shadow-lg">
        <p className="text-4xl font-mono font-bold text-blue-950 pb-6">Login</p>
        <form onSubmit={handleLogin}>
          <input
            className="w-full h-1/6 mb-4 py-2 px-2 border-blue-950 border-2 rounded-lg font-mono"
            type="email" // Changed to email type for built-in validation
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full h-1/6 mb-4 py-2 px-2 border-blue-950 border-2 rounded-lg font-mono"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`bg-blue-950 text-white font-mono mt-8 mb-4 py-2 px-2 rounded-xl w-full ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <pre>{message}</pre>
        </form>
      </div>
    </div>
  );
}
