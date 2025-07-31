import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import { PrismaClient } from "../../../../generated/prisma";
import { NextAuthOptions } from "next-auth";
import { z } from "zod";

// Import your credentials provider
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const schema = z.object({
          email: z.string().email(),
          password: z.string().min(6),
        });

        const { email, password } = schema.parse(credentials);

        const user = await prisma.users.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("No user found with the provided email.");
        }

        if (!user.password) {
          throw new Error("User does not have a password set.");
        }

        if (!user.verifiedAt) {
          throw new Error("User email is not verified.");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid password.");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
