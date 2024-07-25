"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DLLoader } from "@/components";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/profile");
  }, [router]);

  return <DLLoader />;
}
