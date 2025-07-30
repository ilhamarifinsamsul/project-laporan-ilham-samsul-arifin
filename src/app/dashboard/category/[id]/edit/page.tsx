"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams(); // Menggunakan useParams hook
  const [name, setName] = useState("");

  // Load data kategori saat komponen dimount
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        if (!params?.id) return;

        const response = await fetch(`/api/categories/${params.id}`);
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [params?.id]); // Gunakan params?.id sebagai dependency

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!params?.id) return;

      const response = await fetch(`/api/categories/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        router.push("/dashboard/category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Edit Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">
            Category Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard/category")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
