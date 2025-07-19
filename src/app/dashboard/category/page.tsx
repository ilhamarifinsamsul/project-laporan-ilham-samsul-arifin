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
      <h1>Category</h1>
      {/* input categories */}
      <div>
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
        <ul className="mt-4">
          {categories.map((category: Category) => (
            <li className="flex justify-between" key={category.id}>
              <span className="mt-2 font-bold">{category?.name}</span>

              <div>
                <button
                  className="bg-yellow-500 text-white px-4 py-2 mt-2 rounded"
                  type="submit"
                  onClick={() => updateCategory(category.id)} // Pass the category ID to update
                >
                  Edit
                </button>
                {/* delete */}
                <button
                  className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
                  onClick={() => deleteCategory(category.id)} // Pass the category ID to delete
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
}
