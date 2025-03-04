"use client";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true; // Global setting

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const baseUrl = import.meta.env.BASE_URL;
  axios.defaults.baseURL = baseUrl;
  axios.defaults.withCredentials = true; // Send cookies with requests

  const handleSignup = async () => {
    try {
      await axios.post("/signup", { username, password }); // JWT is stored in cookie
      setMessage("Signed up successfully ✅!");
      navigate("/dashboard"); // Redirect after signup
    } catch (error) {
      console.log(error);
      setMessage("Signup failed");
    }
  };

  return (
    <div className="bg-slate-950 h-screen w-screen relative">
      <div className="absolute h-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white rounded-xl shadow-lg">
        <p className="text-4xl font-mono font-bold text-blue-950 pb-6">
          Signup
        </p>
        <input
          className="w-full h-1/6 mb-4 py-2 px-2 border-blue-950 border-2 rounded-lg font-mono"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          className="bg-blue-950 text-white font-mono mt-8 mb-4 py-2 px-2 rounded-xl w-full cursor-pointer"
          onClick={handleSignup}
        >
          Signup
        </button>
        <pre>{message}</pre>
      </div>
    </div>
  );
}
