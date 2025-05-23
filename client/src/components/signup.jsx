"use client";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
// import { jwtDecode } from "jwt-decode";

axios.defaults.withCredentials = true; // Send cookies with requests

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  axios.defaults.baseURL = import.meta.env.VITE_API_URL; // allows for shortening of url

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      setMessage("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/signup", { email, password });
      const token = response.data.token;
      localStorage.setItem("token", token);
      const user = response.data.user;
      // const decoded = jwtDecode(token);
      enqueueSnackbar(`Signed up successfully ${user}`, {
        variant: "success",
      });
      navigate(`/dashboard/${email}`);
    } catch (error) {
      console.log("Error:", error);
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
          <p>{message}</p>
        </form>
      </div>
    </div>
  );
}
