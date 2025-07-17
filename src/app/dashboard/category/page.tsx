"use client";

import React from "react";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
};

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  //   Function to handle adding a new category
  const handleAddCategory = async () => {
    await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    fetchCategories();
    setName("");
  };

  //   Function to handle updating an existing category
  const handleUpdateCategory = async () => {
    if (editId) {
      await fetch(`/api/categories/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: editId, name: editName }),
      });
      fetchCategories();
      setEditId(null);
      setEditName("");
    }
  };

  //   Function to handle deleting a category
  const handleDeleteCategory = async (id: string) => {
    await fetch(`/api/categories`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  //   Render the categories and provide options to add, edit, and delete categories
  return (
    <main className="flex min-h-screen flex-col p-6">
      <h1 className="text-2xl font-bold gap-4 mb-4">Categories List</h1>

      <div className="">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category name"
          className="border p-4 mr-2 rounded-md mb-4 border-gray-300 text-xl outline-2 placeholder:text-gray-400 gap-2"
        />
        <button
          type="submit"
          onClick={handleAddCategory}
          className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Category
        </button>
      </div>
      {loading ? (
        <p className="text-gray-500 text-xl font-bold mt-4">Loading...</p>
      ) : (
        <ul className="space-y-4">
          {categories.map((category: Category) => (
            <li key={category?.id}>
              {editId === category.id ? (
                <>
                  <input
                    type="text"
                    className="border p-4 mr-2 rounded-md border-gray-300 text-xl outline-2 placeholder:text-gray-400 gap-2"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Edit category name"
                  />
                  <button
                    onClick={handleUpdateCategory}
                    className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                    type="submit"
                  >
                    Update
                  </button>
                </>
              ) : (
                <>
                  <span className="text-xl">{category.name}</span>
                  <button
                    onClick={() => {
                      setEditId(category.id);
                      setEditName(category.name);
                    }}
                    className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors ml-2"
                  >
                    Edit
                  </button>
                  {/* button to delete category */}
                  <button
                    onClick={() => handleDeleteCategory(category.id.toString())}
                    className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors ml-2"
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
