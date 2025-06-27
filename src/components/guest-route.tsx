"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const GuestRoute = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push("/dashboard");
        }
    }, [loading, user, router]);

    if (loading) return null;

    return <>{children}</>;
}

export default GuestRoute;