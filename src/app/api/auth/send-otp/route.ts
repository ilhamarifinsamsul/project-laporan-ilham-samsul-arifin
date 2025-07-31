import { PrismaClient } from "../../../../generated/prisma";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.users.findUnique({ where: { email } });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

  await prisma.otps.create({
    data: {
      userId: user.id,
      code: otp,
      expires,
    },
  });

  // send to email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Your OTP code",
    text: `Your OTP is ${otp}. It will expire in 15 minutes.`,
  });

  return new Response("OTP sent successfully", { status: 200 });
}
