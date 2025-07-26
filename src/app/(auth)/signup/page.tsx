"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoaderSpinner from "@/components/loader-spinner";
import BaseAlert from "@/components/base-alert";

export default function SignUpPage() {
  const router = useRouter();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [alert, setAlert] = useState({
    type: "",
    message: "",
    isShow: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: registerEmail,
        password: registerPassword,
        name: registerName,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setAlert({
        type: "success",
        message: "Registration successful! Redirecting to login...",
        isShow: true,
      });
      setIsLoading(false);
      localStorage.setItem("pendingVerifyEmail", registerEmail);
      setTimeout(() => {
        router.push("/verify");
      }, 1000);
    } else {
      setAlert({
        type: "error",
        message: data.message || "Registration failed. Please try again.",
        isShow: true,
      });
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <form action="" className="space-y-6">
          <h5 className="text-center text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl">
            Sign Up
          </h5>
          {alert.isShow && <BaseAlert alert={alert} />}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="button"
            onClick={handleRegister}
            className="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            {isLoading ? "loadeing" : "Register to your account"}
            {isLoading && <LoaderSpinner />}
          </button>
          <p className="text-sm text-gray-500 font-medium text-center">
            Already have an account?{" "}
            <Link href="/signin" className="text-blue-500">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
