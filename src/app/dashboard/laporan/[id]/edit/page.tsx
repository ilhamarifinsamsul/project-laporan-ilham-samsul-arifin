"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditLaporanPage() {
  const router = useRouter();
  const params = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState(""); // State baru untuk nama kategori

  // Load data laporan saat komponen dimount
  useEffect(() => {
    const fetchLaporan = async () => {
      try {
        if (!params?.id) return;

        // Ambil data laporan
        const laporanResponse = await fetch(`/api/laporan/${params.id}`);
        const laporanData = await laporanResponse.json();
        setTitle(laporanData.title);
        setDescription(laporanData.description);
        setCategoryId(laporanData.categoryId);

        // Ambil data kategori berdasarkan categoryId
        if (laporanData.categoryId) {
          const categoryResponse = await fetch(
            `/api/categories/${laporanData.categoryId}`
          );
          const categoryData = await categoryResponse.json();
          setCategoryName(categoryData.name || "Unknown Category");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLaporan();
  }, [params?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!params?.id) return;

      const response = await fetch(`/api/laporan/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, categoryId }),
      });

      if (response.ok) {
        router.push("/dashboard/laporan");
      }
    } catch (error) {
      console.error("Error updating laporan:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Laporan</h1>
      <form action="" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1 font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-1 font-medium">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={categoryName}
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
            disabled
          />
          {/* Menyimpan categoryId sebagai hidden input untuk keperluan submit */}
          <input type="hidden" name="categoryId" value={categoryId} />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Update
        </button>
        <button
          type="button"
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={() => router.push("/dashboard/laporan")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
