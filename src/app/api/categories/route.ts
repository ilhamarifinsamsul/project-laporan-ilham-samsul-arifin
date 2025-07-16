// src/app/api/categories/route.ts

const categories = [
  { id: "1", name: "Banjir" },
  { id: "2", name: "Gempa Bumi" },
];

// GET /api/categories untuk mengambil semua kategori
export async function GET() {
  return new Response(JSON.stringify(categories), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// POST /api/categories untuk menambahkan kategori baru
export async function POST(request: Request) {
  const body = await request.json();
  const { name } = body;

  const newCategory = {
    id: Date.now().toString(),
    name,
  };

  categories.push(newCategory);

  return new Response(JSON.stringify(newCategory), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// PUT /api/categories untuk mengupdate kategori
export async function PUT(request: Request) {
  const body = await request.json();
  const { id, name } = body;

  const existingCategory = categories.find((c) => c.id === id);

  if (!existingCategory) {
    return new Response(JSON.stringify({ error: "Category not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  existingCategory.name = name;

  return new Response(
    JSON.stringify({
      ...existingCategory,
      name,
      message: "Category updated successfully",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

// DELETE /api/categories untuk menghapus kategori
export async function DELETE(request: Request) {
  const body = await request.json();
  const { id } = body;

  const existingCategory = categories.find((c) => c.id === id);

  if (!existingCategory) {
    return new Response(JSON.stringify({ message: "Category not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  categories.splice(categories.indexOf(existingCategory), 1);

  return new Response(
    JSON.stringify({ message: "Category deleted successfully" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
