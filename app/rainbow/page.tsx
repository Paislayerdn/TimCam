"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [hue, setHue] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHue((h) => (h + 1) % 360);
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `hsl(${hue},100%,50%)`,
        transition: "background 0.02s linear",
      }}
    >
      <h1
        style={{
          color: "white",
          fontSize: "72px",
          fontWeight: "bold",
        }}
      >
        TimCam
      </h1>
    </main>
  );
}