import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const laporan = await prisma.laporan.findUnique({
    where: { id: params.id },
  });

  if (!laporan) {
    return NextResponse.json({ error: "Laporan not found" }, { status: 404 });
  }

  return NextResponse.json(laporan);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { categoryId, title, description } = await request.json();

  const updatedLaporan = await prisma.laporan.update({
    where: { id: params.id },
    data: {
      categoryId,
      title,
      description,
    },
  });

  return NextResponse.json(updatedLaporan);
}
