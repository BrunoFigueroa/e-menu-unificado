import NextAuth, { Account, DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  declare module "next-auth/jwt" {
    interface JWT {
      user: {
        id: string;
        nombre: string;
      };
    }
  }

  interface User {
    id: string;
    email: string;
    nombre: string;
  }

  interface Session {
    user: User;
  }

  interface DefaultSession {
    user: User;
  }
}
