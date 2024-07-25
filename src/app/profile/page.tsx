"use client";
import DLMainContainer from "@/container/Main/DLMainContainer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { account } from "../appwrite";
import { Models } from "appwrite";
import { DLLoader } from "@/components";

export default function Home() {
  const [user, setUser] = useState<Models.User<{}> | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch (error) {
        router.push("/auth/login");
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return <DLLoader />;

  return (
    <>
      <DLMainContainer />;
    </>
  );
}
