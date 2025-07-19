"use client";
import { useState } from "react";

export default function CategoryForm({
  onSubmit,
  initialName = "",
  loading = false,
}: {
  onSubmit: (name: string) => void;
  initialName?: string;
  loading?: boolean;
}) {
  const [name, setName] = useState(initialName);

  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(name);
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        className="border rounded-md p-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category Name"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 disabled:bg-gray-300"
        disabled={loading}
      >
        {loading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}
