"use client";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true; // Global setting

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true; // Send cookies with requests

  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      setMessage("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      await axios.post("/signup", { email, password });
      setMessage("Signed up successfully ✅!");
      navigate("/dashboard");
    } catch (error) {
      // More detailed error logging
      console.error("Full error:", error);
      console.error("Error response:", error.response?.data);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "Signup failed. Please try again.";
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 h-screen w-screen relative">
      <div className="absolute h-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white rounded-xl shadow-lg">
        <form onSubmit={handleSignup}>
          <p className="text-4xl font-mono font-bold text-blue-950 pb-6">
            Signup
          </p>
          <input
            className="w-full h-1/6 mb-4 py-2 px-2 border-blue-950 border-2 rounded-lg font-mono"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full h-1/6 mb-4 py-2 px-2 border-blue-950 border-2 rounded-lg font-mono"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>
            Already signed up?{" "}
            <a href="/login" className="underline text-blue-800">
              Login
            </a>
          </p>
          <button
            type="submit"
            className="bg-blue-950 text-white font-mono mt-8 mb-4 py-2 px-2 rounded-xl w-full cursor-pointer"
          >
            {isLoading ? "Signing up..." : "Signup"}
          </button>
          <p
            className={`text-center ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>{" "}
        </form>
      </div>
    </div>
  );
}
