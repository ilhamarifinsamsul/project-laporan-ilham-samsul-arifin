"use client";
import { useRouter } from "next/navigation";
import CategoryForm from "@/components/CategoryForm";
import { useState } from "react";

export default function NewCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(name: string) {
    setLoading(true);
    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setLoading(false);
    router.push("/categories");
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Add Category</h1>
      <CategoryForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
