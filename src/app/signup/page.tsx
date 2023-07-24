"use client";
import React from "react";
import Image from "next/image";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Input } from "reactstrap";

const Page = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setError(null);

    if (passwordOne === passwordTwo) {
      signUp(email, passwordOne)
        .then((authUser) => {
          router.push("/");
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      setError("Password do not match");
    }
    event.preventDefault();
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
              htmlFor="passwordOne"
            >
              Password
            </label>
            <Input
              type="password"
              name="passwordOne"
              value={passwordOne}
              onChange={(event) => setPasswordOne(event.target.value)}
              id="loginPassword"
              placeholder="******************"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="passwordTwo"
            >
              Confirm Password
            </label>
            <Input
              type="password"
              name="passwordTwo"
              value={passwordTwo}
              onChange={(event) => setPasswordTwo(event.target.value)}
              id="loginPassword"
              placeholder="******************"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {error && (
            <div className="mb-6">
              <label className="text-red-500 text-sm font-bold mb-2">
                {error}
              </label>
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              disabled={
                passwordOne === "" ||
                email === "" ||
                passwordTwo === "" ||
                passwordOne !== passwordTwo
              }
              className="bg-[#2c3e50] hover:bg-[#bdc3c7] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-[#2c3e50] hover:text-blue-800"
              href="/signin"
            >
              Already have an account? Sign In
            </a>
          </div>
        </form>
        <p className="text-center text-white text-xs">
          &copy;2023 Josh Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Page;
