"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import Navbar from "@/components/Navbar";

export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter();
    const [authorized, setAuthorized] = useState<boolean | null>(null);

    useEffect(() => {

        if (Cookies.get("authenticated") === "true") {
            setAuthorized(true);
        } else {
            setAuthorized(false);
            router.replace("/login");
        }

    }, [router]);

    if (authorized === null) {
        return null;
    }

    if (!authorized) {
        return null;
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    );
}