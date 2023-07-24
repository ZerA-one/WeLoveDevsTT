"use client";
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

import { Input } from "reactstrap";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === "" || email === "") {
      return;
    }

    signIn(email, password)
      .then((authUser) => {
        router.push("/");
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };

  return (
    <div className="h-full justify-center items-center flex">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col justify-between items-center pb-5">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={150}
              height={150}
              className="rounded-full"
            />
            <label className="text-black font-bold text-xl">Josh</label>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              name="email"
              id="loginEmail"
              placeholder="josh@xyz@.com"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              id="loginPassword"
              placeholder="******************"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              disabled={password === "" || email === ""}
              className="bg-[#2c3e50] hover:bg-[#bdc3c7] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-[#2c3e50] hover:text-blue-800"
              href="/signup"
            >
              Create account
            </a>
          </div>
        </form>
        <p className="text-center text-white text-xs">
          &copy;2023 Josh Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
}
