"use client";

import { useState, useEffect } from "react";

interface Category {
  id: string;
  name: string;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
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
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Update the categories list
  const updateCategory = async (id: string) => {
    try {
      const newName = prompt("Enter new category name:");

      if (!newName) {
        throw new Error("Failed to fetch categories");
      }
      const response = await fetch("/api/categories", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name: newName }),
      });

      const data = await response.json();
      setCategories((prev) => prev.map((cat) => (cat.id === id ? data : cat)));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
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
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

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
        // List of categories
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
            {categories.map((category: Category, index: number) => (
              <tr key={category.id} className="border border-gray-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm ">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">
                  {category.name}
                </td>
                <td>
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 mt-2 rounded"
                    type="submit"
                    onClick={() => updateCategory(category.id)} // Pass the category ID to update
                  >
                    Edit
                  </button>
                  {/* delete */}
                  <button
                    className="bg-red-500 text-white px-4 py-2 mt-2 rounded ml-2"
                    onClick={() => deleteCategory(category.id)} // Pass the category ID to delete
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
}
