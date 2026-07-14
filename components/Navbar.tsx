"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import "@/styles/navbar.css";

export default function Navbar() {

    const router = useRouter();

    function logout() {
        Cookies.remove("authenticated");
        router.replace("/login");
    }

    return (
        <nav className="navbar">

            <div className="navbar-title">
                TimCam
            </div>

            <div className="navbar-links">

                <Link href="/statistics">
                    Statistics
                </Link>

                <Link href="/calendar">
                    Calendar
                </Link>

                <Link href="/members">
                    Members
                </Link>

                <button
                    className="logout-button"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}