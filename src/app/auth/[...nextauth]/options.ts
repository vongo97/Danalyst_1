// @ts-nocheck
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import { CustomPrismaAdapter } from "@/lib/auth-adapter";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: CustomPrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Buscar usuario por email
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          // Si no existe el usuario o la contraseña no coincide
          if (
            !user ||
            !user.passwordHash ||
            !(await bcrypt.compare(credentials.password, user.passwordHash))
          ) {
            return null;
          }

          // Retornar el usuario sin incluir la contraseña
          return {
            id: String(user.id),
            name: user.name,
            email: user.email,
            role: user.role || "user", // Usar el rol de la base de datos
          };
        } catch (error) {
          console.error("Error en authorize:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Añadir userId y role al token JWT cuando el usuario inicia sesión
      if (user) {
        token.userId = user.id;
        token.role = user.role || "user";
      }
      // Guardar el token de acceso y actualización si están disponibles
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Añadir userId y role a la sesión para que estén disponibles en el frontend
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      try {
        // Verificar si el usuario existe
        if (user.email) {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          // Si el usuario existe, permitir el inicio de sesión
          if (existingUser) {
            return true;
          }

          // Si es un nuevo usuario, permitir la creación
          return true;
        }
        return true;
      } catch (error) {
        console.error("Error en signIn callback:", error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // Gestionar redirecciones de manera segura
      if (url.startsWith(baseUrl)) return url;
      // Si la URL contiene callbackUrl, extraerla y verificarla
      if (url.includes('callbackUrl=')) {
        const callbackUrl = new URL(url).searchParams.get('callbackUrl');
        if (callbackUrl && callbackUrl.startsWith(baseUrl)) {
          return callbackUrl;
        }
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/error", // Error code passed in query string as ?error=
  },
  useSecureCookies: process.env.NODE_ENV === "production",
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};

// Extender los tipos de NextAuth
declare module "next-auth" {
  interface User {
    id: string;
    role?: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    role?: string;
  }
}
