import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET : List all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// POST : Create a new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;
    if (!name) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}

// PUT : Update an existing category
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name } = body;
    if (!id || !name) {
      return NextResponse.json(
        { error: "Category ID and name are required" },
        { status: 400 }
      );
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name },
    });
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

// DELETE : Delete a category
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    const deletedCategory = await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json(deletedCategory, { status: 200 });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
