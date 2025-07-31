import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  const user = await prisma.users.findUnique({ where: { email } });
  if (!user)
    return Response.json({ message: "User not found" }, { status: 404 });

  const otpRecord = await prisma.otps.findFirst({
    where: {
      userId: user.id,
      code: otp,
      expires: { gte: new Date() },
    },
  });

  if (!otpRecord)
    return Response.json(
      { message: "Invalid or expired OTP" },
      { status: 400 }
    );

  // OTP valid, delete it (optional)
  await prisma.otps.delete({ where: { id: otpRecord.id } });

  // ✅ update verifiedAt
  await prisma.users.update({
    where: { id: user.id },
    data: { verifiedAt: new Date() },
  });

  return Response.json({ message: "OTP verified" });
}
