"use client";
import { useRouter, useParams } from "next/navigation";
import CategoryForm from "@/components/CategoryForm";
import { useEffect, useState } from "react";

export default function EditCategoryPage() {
  const router = useRouter();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/categories/${id}`)
      .then((res) => res.json())
      .then((data) => setName(data.name));
  }, [id]);

  async function handleSubmit(newName: string) {
    setLoading(true);
    await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
    setLoading(false);
    router.push("/categories");
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Edit Category</h1>
      <CategoryForm
        onSubmit={handleSubmit}
        initialName={name}
        loading={loading}
      />
    </div>
  );
}
