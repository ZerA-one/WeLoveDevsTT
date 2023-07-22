"use client";

import { useAuthContext } from "@/context/AuthContext";
import { getAllData } from "@/firebase/firestore/getData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, signout } = useAuthContext();
  const router = useRouter();

  const getAllJobs = async () => {
    const res = await getAllData("jobs");
    console.log("res", res);
  }

  useEffect(() => {
    console.log("user", user);
    if (!user) {
      router.push("/signin");
    } else {
      getAllJobs();
    }
  }, [router, user]);

  return (
    <main>
      <div className="flex-row items-center bg-sky-500">
        <label className="text-xl font-bold text-center text-white">
          Welcome {user?.email}
        </label>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={async () => {
          await signout();
          router.push("/signin");
        }}>
          Signout
        </button>
      </div>        
    </main>
  );
}
