"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import "@/styles/dashboard.css";

export default function DashboardPage() {

    const router = useRouter();

    useEffect(() => {
        if (Cookies.get("authenticated") !== "true") {
            router.push("/login");
        }
    }, []);

    return (
        <main className="dashboard-page">
            <h1 className="rainbow-text">
                It worked lmao
            </h1>
        </main>
    );
}