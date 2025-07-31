"use client"; // Pastikan ini adalah Client Component

import { NextUIProvider } from "@nextui-org/react";

export function UIProviders({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
