"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";

interface Laporan {
  id: string;
  title: string;
  description: string;
  category?: {
    id: string;
    name: string;
  };
}

export default function LaporanPage() {
  const [laporans, setLaporans] = useState<Laporan[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Jumlah item per halaman
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/laporan")
      .then((response) => response.json())
      .then((data) => {
        setLaporans(data);
      })
      .catch((error) => console.error("Error fetching laporans:", error));
  }, []);

  const deleteLaporan = async (id: string) => {
    try {
      const response = await fetch("/api/laporan", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      setLaporans((prev) => prev.filter((laporan) => laporan.id !== data.id));

      // Jika item terakhir di halaman dihapus, kembali ke halaman sebelumnya
      if (filteredLaporans.length % itemsPerPage === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error("Error deleting laporan:", error);
    }
  };

  // Filter laporan berdasarkan search term
  const filteredLaporans = laporans.filter((laporan) =>
    // laporan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // laporan.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    laporan.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hitung total halaman
  const totalPages = Math.ceil(filteredLaporans.length / itemsPerPage);

  // Dapatkan item untuk halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLaporans.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Fungsi untuk ganti halaman
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 min-h-screen bg-gray-200 py-8 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <Link
          href="/dashboard/laporan/create"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Laporan
        </Link>

        {filteredLaporans.length > 0 && (
          <div className="text-gray-600">
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, filteredLaporans.length)} of{" "}
            {filteredLaporans.length} entries
          </div>
        )}
      </div>

      <div className="mb-4 max-w-2xl mx-auto px-4 p-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border border-gray-500 rounded text-lg font-normal bg-white focus:outline-none"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset ke halaman 1 saat search
          }}
        />
      </div>

      <div className="flex mb-4 mx-auto px-4 flex-col min-h-screen">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-left text-lg font-semibold rounded-md">
            <tr className="text-gray-600 rounded-md">
              <th scope="col" className="py-2 px-4">
                NO
              </th>
              <th scope="col" className="py-2 px-4">
                Title
              </th>
              <th scope="col" className="py-2 px-4">
                Description
              </th>
              <th scope="col" className="py-2 px-4">
                Category
              </th>
              <th scope="col" className="py-2 px-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white rounded-md">
            {currentItems.length > 0 ? (
              currentItems.map((laporan, index: number) => (
                <tr key={laporan.id} className="">
                  <td className="py-2 px-4">{indexOfFirstItem + index + 1}</td>
                  <td className="py-2 px-4">{laporan.title}</td>
                  <td className="py-2 px-4">{laporan.description}</td>
                  <td className="py-2 px-4">{laporan.category?.name || "-"}</td>
                  <td className="py-2 px-4">
                    <Link
                      href={`/dashboard/laporan/${laporan.id}/edit`}
                      className="mr-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => deleteLaporan(laporan.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  {searchTerm
                    ? "No matching results found"
                    : "No data available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-l-md ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 ${
                    currentPage === number
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {number}
                </button>
              )
            )}

            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-r-md ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
      <Footer />
    </div>
  );
}
