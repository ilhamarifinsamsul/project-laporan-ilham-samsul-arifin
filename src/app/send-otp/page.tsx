"use client";
import { useState } from "react";

export default function SignIn() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);

  const sendOtp = async () => {
    const response = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (response.ok) {
      setStep(2);
    } else {
      console.error("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    const response = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });
    const data = await response.json();
    if (response.ok) alert("Login success");
    else alert(data.message || "Failed to verify OTP");
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <button onClick={sendOtp}>Send OTP</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}
    </div>
  );
}
