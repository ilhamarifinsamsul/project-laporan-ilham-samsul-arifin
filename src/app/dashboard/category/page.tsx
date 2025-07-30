"use client";

import { useState, useEffect } from "react";

interface Category {
  id: string;
  name: string;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("/api/categories")
      .then((response: Response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Category:", error);
      });
  }, []);

  // Add a new category
  const addCategory = async () => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const newCategory = await response.json();
      setCategories((prev) => [...prev, newCategory]);
      setName(""); // Clear input after adding
      // Go to the last page if the new item would be on a new page
      const newTotalPages = Math.ceil((categories.length + 1) / itemsPerPage);
      setCurrentPage(newTotalPages);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Update the categories list
  // const updateCategory = async (id: string) => {
  //   try {
  //     const newName = prompt("Enter new category name:");

  //     if (!newName) {
  //       throw new Error("Failed to fetch categories");
  //     }
  //     const response = await fetch("/api/categories", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ id, name: newName }),
  //     });

  //     const data = await response.json();
  //     setCategories((prev) => prev.map((cat) => (cat.id === id ? data : cat)));
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // };
  const navigateToEdit = (id: string) => {
    const url = `/dashboard/category/${id}/edit`; // Replace with your edit page route
    window.location.href = url;
  };

  const deleteCategory = async (id: string) => {
    try {
      const response = await fetch("/api/categories", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      setCategories((prev) => prev.filter((cat) => cat.id !== data.id));

      // Adjust current page if the last item on the current page was deleted
      if (categories.length % itemsPerPage === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* input categories */}
      <div className="flex items-center">
        <input
          type="text"
          className="border p-2 rounded mr-2"
          placeholder="Add new category"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addCategory}
        >
          Add Category
        </button>
      </div>
      {categories.length > 0 ? (
        <>
          {/* List of categories */}
          <table className="mt-8 min-w-full rounded-md text-gray-900 table-auto">
            <thead className="bg-gray-100 text-left text-lg font-semibold rounded-md ">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">
                  No
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  Category
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white border border-gray-200 min-w-full">
              {currentItems.map((category: Category, index: number) => (
                <tr key={category.id} className="border border-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm ">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm ">
                    {category.name}
                  </td>
                  <td>
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 mt-2 rounded"
                      type="submit"
                      onClick={() => navigateToEdit(category.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 mt-2 rounded ml-2"
                      onClick={() => deleteCategory(category.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Component */}
          <div className="flex justify-center mt-4">
            <nav className="inline-flex rounded-md shadow">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-l-md border ${
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
                    className={`px-3 py-1 border-t border-b ${
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
                className={`px-3 py-1 rounded-r-md border ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Next
              </button>
            </nav>
          </div>
        </>
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
}
