import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET : Fetch a specific category by ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}

// PUT : Update a specific category by ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id: params.id,
      },
      data: {
        name,
      },
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

// DELETE : Delete a specific category by ID
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deletedCategory = await prisma.category.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(deletedCategory);
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
