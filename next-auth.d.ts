import { UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExtendUser = DefaultSession["user"] & {
  role: UserRole;
};

declare module "next-auth" {
  interface Session {
    user: ExtendUser;
  }
}
