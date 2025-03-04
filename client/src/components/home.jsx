import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold">Welcome</h1>
      <p>
        Click to signup{" "}
        <a href="/signup" className="text-blue-800 underline">
          {" "}
          Signup
        </a>
      </p>
      <p>
        Click to login{" "}
        <a href="/login" className="text-blue-800 underline">
          {" "}
          Login
        </a>
      </p>
    </div>
  );
}
