"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
axios.defaults.withCredentials = true; // Global setting

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/dashboard/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResponse(response.data.message);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p>{isLoading ? "Loading" : `Welcome ${response}`}</p>{" "}
    </div>
  );
}
