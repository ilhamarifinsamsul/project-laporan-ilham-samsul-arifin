"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoaderSpinner from "@/components/loader-spinner";
import BaseAlert from "@/components/base-alert";

export default function Page() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
    isShow: false,
  });
  const router = useRouter();

  const verifyOtp = async () => {
    setIsLoading(true);
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, otp }),
    });

    const data = await res.json();

    if (res.ok) {
      setAlert({
        type: "success",
        message: "Verification successful, you can now login",
        isShow: true,
      });
      setIsLoading(false);
      localStorage.removeItem("pendingVerifyEmail");

      setTimeout(() => {
        router.push("/signin");
      }, 1000);
    } else {
      setAlert({
        type: "error",
        message: data.message || "Verification failed",
        isShow: true,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const pendingVerifyEmail = localStorage.getItem("pendingVerifyEmail");
    setEmail(pendingVerifyEmail || "");
  }, []);

  const sendOtp = async () => {
    await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <form className="">
          <div className="mb-3">
            <h5 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-xl">
              Enter verification OTP
            </h5>
            <p className="text-center text-[14px] text-gray-500 mb-2">
              We&apos;ve send a code to{" "}
              <span className="font-bold text-gray-700">ilham@gmail.com</span>
            </p>
            {alert.isShow && (
              <BaseAlert alert={{ type: alert.type, message: alert.message }} />
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              OTP
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="134524"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button
            onClick={verifyOtp}
            type="button"
            disabled={isLoading}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center gap-3 cursor-pointer"
          >
            {isLoading ? "Loading" : "Verify OTP"}
            {isLoading && <LoaderSpinner />}
          </button>

          <div className="text-sm font-medium text-gray-500 mt-4">
            Didn&apos;t receive the code?{" "}
            <button
              onClick={sendOtp}
              className="text-blue-700 hover:underline cursor-pointer"
            >
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
