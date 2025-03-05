"use client";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
axios.defaults.withCredentials = true; // Send cookies with requests

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("/login", { email, password });
      const token = response.data.token;
      localStorage.setItem("token", token);
      enqueueSnackbar("Signed up successfully ✅", { variant: "success" });
      navigate(`/dashboard/${email}`);
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(
          error.response.data.msg || "An error occurred. Please try again."
        );
      } else {
        setMessage("An error occurred. Please try again.");
      }
      enqueueSnackbar(
        "Error: " + (error.response?.data.msg || "Invalid credentials"),
        { variant: "error" }
      );
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
            type="email"
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
            className={
              "bg-blue-950 text-white font-mono mt-8 mb-4 py-2 px-2 rounded-xl w-full cursor-pointer"
            }
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <p>{message}</p>
        </form>
      </div>
    </div>
  );
}
