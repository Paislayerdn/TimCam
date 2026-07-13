"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ===========================
  // CHANGE THESE LATER
  // ===========================
  const ADMIN_USERNAME = "wongsathon";
  const ADMIN_PASSWORD = "youwouldntknowthispassword";
  // ===========================

  function login() {
    if (
      username.toLowerCase() === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD
    ) {
      router.push("/rainbow");
    } else {
      setError("User not authenticated. Check Admin.");
    }
  }

  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#111",
      }}
    >
      <div
        style={{
          background: "#222",
          padding: "40px",
          borderRadius: "12px",
          width: "350px",
        }}
      >
        <h1 style={{ color: "white", textAlign: "center" }}>
          TimCam
        </h1>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
          }}
        />

        <button
          onClick={login}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <p
          style={{
            color: "red",
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          {error}
        </p>
      </div>
    </main>
  );
}