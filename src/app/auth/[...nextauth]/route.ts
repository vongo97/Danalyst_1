// @ts-nocheck
import NextAuth from "next-auth";
import { authOptions } from "./options";

// Exportar el handler de NextAuth
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };