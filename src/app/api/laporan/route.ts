import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

// GET : List all laporan
export async function GET() {
  try {
    const laporan = await prisma.laporan.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(laporan);
  } catch (error) {
    console.error("Error fetching laporan:", error);
    return NextResponse.json(
      { error: "Failed to fetch laporan" },
      { status: 500 }
    );
  }
}

// POST : Create a new laporan
// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { categoryId, title, description } = body;

//     const newLaporan = await prisma.laporan.create({
//       data: {
//         categoryId,
//         title,
//         description,
//       },
//     });
//     return NextResponse.json(newLaporan, { status: 201 });
//   } catch (error) {
//     console.error("Error creating laporan:", error);
//     return NextResponse.json(
//       { error: "Failed to create laporan" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const categoryId = formData.get("categoryId") as string;
    const file = formData.get("image") as File;

    if (!file || !file.name) {
      return NextResponse.json(
        { error: "Gambar tidak ditemukan" },
        { status: 400 }
      );
    }

    // Simpan gambar ke folder public/uploads
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);

    await writeFile(filePath, buffer);

    // Simpan metadata laporan ke database
    const newLaporan = await prisma.laporan.create({
      data: {
        categoryId,
        title,
        description,
        image: `/uploads/${fileName}`,
      },
    });

    return NextResponse.json(newLaporan, { status: 201 });
  } catch (error) {
    console.error("Error creating laporan:", error);
    return NextResponse.json(
      { error: "Failed to create laporan" },
      { status: 500 }
    );
  }
}

// DELETE : Delete a laporan
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    const deletedLaporan = await prisma.laporan.delete({
      where: { id },
    });

    return NextResponse.json(deletedLaporan, { status: 200 });
  } catch (error) {
    console.error("Error deleting laporan:", error);
    return NextResponse.json(
      { error: "Failed to delete laporan" },
      { status: 500 }
    );
  }
}

// PUT : Update an existing laporan
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, categoryId, title, description } = body;

    const updatedLaporan = await prisma.laporan.update({
      where: { id },
      data: {
        categoryId,
        title,
        description,
      },
    });
    return NextResponse.json(updatedLaporan);
  } catch (error) {
    console.error("Error updating laporan:", error);
    return NextResponse.json(
      { error: "Failed to update laporan" },
      { status: 500 }
    );
  }
}
