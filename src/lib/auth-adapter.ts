// @ts-nocheck
import { PrismaClient } from "@prisma/client";
import {
  Adapter,
  AdapterUser,
  AdapterSession,
  AdapterAccount,
} from "next-auth/adapters";

// Definir tipos para evitar errores
type UserData = {
  name?: string;
  email: string;
  emailVerified?: Date | null;
  image?: string;
  [key: string]: any;
};

export function CustomPrismaAdapter(prisma: PrismaClient): Adapter {
  return {
    createUser: async (data: UserData) => {
      const user = await prisma.user.create({
        data: {
          name: data.name || "",
          email: data.email,
        },
      });

      return {
        id: String(user.id),
        name: user.name,
        email: user.email,
        emailVerified: null,
        image: null,
      };
    },
    getUser: async (id: string) => {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });

      if (!user) return null;

      return {
        id: String(user.id),
        name: user.name,
        email: user.email,
        emailVerified: null,
        image: null,
      };
    },
    getUserByEmail: async (email: string) => {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) return null;

      return {
        id: String(user.id),
        name: user.name,
        email: user.email,
        emailVerified: null,
        image: null,
      };
    },
    getUserByAccount: async (data: {
      provider: string;
      providerAccountId: string;
    }) => {
      const { provider, providerAccountId } = data;

      const account = await prisma.account.findFirst({
        where: {
          provider: provider,
          providerAccountId: providerAccountId,
        },
        include: { user: true },
      });

      if (!account?.user) return null;

      return {
        id: String(account.user.id),
        name: account.user.name,
        email: account.user.email,
        emailVerified: null,
        image: null,
      };
    },
    updateUser: async (user: Partial<AdapterUser> & { id: string }) => {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(user.id) },
        data: {
          name: user.name || "",
          email: user.email,
        },
      });

      return {
        id: String(updatedUser.id),
        name: updatedUser.name,
        email: updatedUser.email,
        emailVerified: null,
        image: null,
      };
    },
    deleteUser: async (id: string) => {
      const user = await prisma.user.delete({
        where: { id: parseInt(id) },
      });

      return {
        id: String(user.id),
        name: user.name,
        email: user.email,
        emailVerified: null,
        image: null,
      };
    },
    linkAccount: async (data: AdapterAccount) => {
      const { ext_expires_in, ...accountData } = data as any;

      await prisma.account.create({
        data: {
          ...accountData,
          userId: parseInt(accountData.userId),
        },
      });

      return data;
    },
    unlinkAccount: async (data: {
      provider: string;
      providerAccountId: string;
    }) => {
      const { provider, providerAccountId } = data;
      await prisma.account.delete({
        where: {
          provider_providerAccountId: {
            provider,
            providerAccountId,
          },
        },
      });
    },
    createSession: async (data: {
      sessionToken: string;
      userId: string;
      expires: Date;
    }) => {
      await prisma.session.create({
        data: {
          ...data,
          userId: parseInt(data.userId),
        },
      });

      return {
        sessionToken: data.sessionToken,
        userId: data.userId,
        expires: data.expires,
      };
    },
    getSessionAndUser: async (sessionToken: string) => {
      const userAndSession = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      });

      if (!userAndSession) return null;

      const { user, ...session } = userAndSession;

      return {
        user: {
          id: String(user.id),
          name: user.name,
          email: user.email,
          emailVerified: null,
          image: null,
        },
        session: {
          sessionToken: session.sessionToken,
          userId: String(session.userId),
          expires: session.expires,
        },
      };
    },
    updateSession: async (
      data: Partial<AdapterSession> & { sessionToken: string }
    ) => {
      const session = await prisma.session.update({
        where: { sessionToken: data.sessionToken },
        data: {
          expires: data.expires,
        },
      });

      return {
        sessionToken: session.sessionToken,
        userId: String(session.userId),
        expires: session.expires,
      };
    },
    deleteSession: async (sessionToken: string) => {
      await prisma.session.delete({ where: { sessionToken } });
    },
    createVerificationToken: async (data: {
      identifier: string;
      token: string;
      expires: Date;
    }) => {
      const verificationToken = await prisma.verificationtoken.create({ data });
      return verificationToken;
    },
    useVerificationToken: async (data: {
      identifier: string;
      token: string;
    }) => {
      try {
        const verificationToken = await prisma.verificationtoken.delete({
          where: {
            identifier_token: {
              identifier: data.identifier,
              token: data.token,
            },
          },
        });
        return verificationToken;
      } catch {
        return null;
      }
    },
  };
}
