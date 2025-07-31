import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const laporan = await prisma.laporan.findUnique({
    where: { id: (await params).id },
  });

  if (!laporan) {
    return NextResponse.json({ error: "Laporan not found" }, { status: 404 });
  }

  return NextResponse.json(laporan);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { categoryId, title, description } = await request.json();

  const updatedLaporan = await prisma.laporan.update({
    where: { id: (await params).id },
    data: {
      categoryId,
      title,
      description,
    },
  });

  return NextResponse.json(updatedLaporan);
}
