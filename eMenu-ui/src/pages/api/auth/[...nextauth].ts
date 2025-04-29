import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        nombre: { label: "Nombre", type: "string" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nombre: credentials?.nombre as string,
              email: credentials?.email as string,
            }),
          });

          const user = await response.json();
          if (response.ok && user?.payload) {
            return {
              id: user.payload.id,
              nombre: credentials?.nombre as string,
              email: credentials?.email as string,
            };
          }
          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        nombre: token.nombre as string,
        email: token.email as string,
      };
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.nombre = user.nombre;
        token.email = user.email;
      }
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET || "your-secret",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/auth/error",
  },
});
