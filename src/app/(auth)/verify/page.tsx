"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoaderSpinner from "@/components/loader-spinner";
import BaseAlert from "@/components/base-alert";

export default function VerifyPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [otp, setOtp] = useState("");
  const [alert, setAlert] = useState({
    type: "",
    message: "",
    isShow: false,
  });
  const [email, setEmail] = useState("");

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    const response = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp, email }),
    });
    const data = await response.json();

    if (response.ok) {
      setAlert({
        type: "success",
        message: "OTP verified successfully!",
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
        message: data.message || "Failed to verify OTP. Please try again.",
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md border border-gray-200">
        <form action="" className="space-y-4">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-center mb-4">
              Enter Verification OTP
            </h1>
            <p className="text-gray-600 text-center">
              Please enter the OTP sent to your email address.
              <span>ilham@gmail.com</span>
            </p>
            {alert.isShow && (
              <BaseAlert alert={{ type: alert.type, message: alert.message }} />
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              OTP
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
              placeholder="Enter your OTP"
            />
          </div>
          <div className="mb-4">
            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={isLoading}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center gap-3 cursor-pointer"
            >
              {isLoading ? "Loading" : "Verify OTP"}
              {isLoading && <LoaderSpinner />}
            </button>
            <div className="mt-2 text-sm text-gray-500 font-medium text-center">
              Didnt&apos;t receive the OTP?{" "}
              <button
                type="button"
                onClick={sendOtp}
                className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                Resend OTP
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
