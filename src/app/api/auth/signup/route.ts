import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@/generated/prisma";
import { z } from "zod";

const prisma = new PrismaClient();

export default async function POST(req: Request) {
  const data = await req.json();

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
  });

  const { email, password, name } = schema.parse(data);

  const emailExists = await prisma.users.findUnique({
    where: { email },
  });

  if (emailExists) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.users.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  //   call the send-otp API after creating the user
  await fetch(`${process.env.BASE_URL}/api/auth/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return NextResponse.json(user);
}
