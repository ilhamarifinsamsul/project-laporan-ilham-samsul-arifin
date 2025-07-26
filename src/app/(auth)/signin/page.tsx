"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import BaseAlert from "@/components/base-alert";
import LoaderSpinner from "@/components/loader-spinner";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({
    type: "",
    message: "",
    isShow: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setAlert({
        type: "error",
        message: result.error,
        isShow: true,
      });
    } else {
      setAlert({
        type: "success",
        message: "Login successful!",
        isShow: true,
      });
      router.push("/dashboard");
    }
    setIsLoading(false);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <form action="" className="space-y-6">
          <h5 className="text-center text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl">
            Sign In
          </h5>
          {alert.isShow && <BaseAlert alert={alert} />}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center gap-3 cursor-pointer"
          >
            {isLoading ? <LoaderSpinner /> : "Sign In"}
          </button>
          <p className="text-sm text-center text-gray-600">
            Don`t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
