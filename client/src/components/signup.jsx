"use client";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true; // Global setting

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const baseUrl = import.meta.env.BASE_URL;
  axios.defaults.baseURL = baseUrl;
  axios.defaults.withCredentials = true; // Send cookies with requests

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent form submission refresh

    // Basic validation
    if (!email || !password) {
      setMessage("Please fill in all fields");
      return;
    }

    try {
      await axios.post("/signup", { email, password });
      setMessage("Signed up successfully ✅!");
      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Signup failed. Please try again.";
      setMessage(errorMessage);
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
            Signup
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
