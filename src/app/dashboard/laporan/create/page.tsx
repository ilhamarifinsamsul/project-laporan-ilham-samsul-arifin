"use client";

import { useState, useEffect } from "react";
// import BaseAlert from "@/components/base-alert";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
}

export default function CreateLaporanPage() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [alert, setAlert] = useState({ type: "", message: "", isShow: false });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Fetch categories untuk dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setAlert({
          type: "error",
          message: "Gagal memuat kategori",
          isShow: true,
        });
      }
    };

    fetchCategories();
  }, []);

  const addLaporan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validasi input
    if (!title || !description || !categoryId) {
      setAlert({
        type: "error",
        message: "Harap isi semua field yang wajib diisi",
        isShow: true,
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/laporan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          categoryId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal menambahkan laporan");
      }

      setAlert({
        type: "success",
        message: "Laporan berhasil ditambahkan",
        isShow: true,
      });

      router.push("/dashboard/laporan");

      // Reset form
      setTitle("");
      setDescription("");
      setCategoryId("");
    } catch (error) {
      console.error("Error adding laporan:", error);
      setAlert({
        type: "error",
        message: "Terjadi kesalahan saat menambahkan laporan",
        isShow: true,
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setAlert({ type: "", message: "", isShow: false });
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Tambah Laporan Baru
        </h1>

        {alert.isShow && (
          <div
            className={`mb-4 p-4 rounded ${
              alert.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {alert.message}
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={addLaporan}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Title
              </label>
              <input
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="title"
                type="text"
                placeholder="Masukkan judul laporan"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Deskripsi*
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="description"
                placeholder="Masukkan deskripsi laporan"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="category"
              >
                Kategori*
              </label>
              <select
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                <option value="">Pilih Kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end">
              <button
                className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Simpan Laporan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
