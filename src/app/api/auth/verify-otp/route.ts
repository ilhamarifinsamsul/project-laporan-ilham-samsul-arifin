import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  const user = await prisma.users.findUnique({ where: { email } });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const otpRecord = await prisma.otps.findFirst({
    where: {
      userId: user.id,
      code: otp,
      expires: { gt: new Date() },
    },
  });

  if (!otpRecord) {
    return new Response("Invalid OTP", { status: 400 });
  }

  //   otp valid, delete it
  await prisma.otps.deleteMany({
    where: {
      id: otpRecord.id,
    },
  });

  //   update verifiedAt
  await prisma.users.update({
    where: {
      id: user.id,
    },
    data: {
      verifiedAt: new Date(),
    },
  });
  return new Response("OTP verified successfully", { status: 200 });
}
