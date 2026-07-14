"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import "@/styles/login.css";
import { authenticate } from "@/lib/auth";

export default function Home() {

    const router = useRouter();

    useEffect(() => {
        if (Cookies.get("authenticated") === "true") {
            router.replace("/calendar");
        }
    }, [router]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
  function login() {
    setError("");

    if (authenticate(username, password)) {
        Cookies.set("authenticated", "true");
        router.replace("/calendar");
    } else {
        setError("User not authenticated. Check Admin.");
    }
  }

  return (
    <main className="login-page">
      <div className="login-box">
        <h1 className="title">
            TimCam
        </h1>

        <input
            className="login-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />

        <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button
            className="login-button"
            onClick={login}
        >
            Login
        </button>

        <p className="error-message">
            {error}
        </p>
      </div>
    </main>
  );
}