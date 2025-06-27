"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    });

    return () => unsub();
  }, [router]);
  return (
    <div className="flex w-screen h-screen items-center justify-center text-muted-foreground">
      <Loader className="size-10 animate-spin" />
    </div>
  );
};

export default Home;
