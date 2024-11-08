// import { db } from "@/lib/db";

// export const getVerificationTokenByEmail = async (email: string) => {
//   try {
//     const verificationToken = await db.verificationToken.findFirst({
//       where: { email },
//     });
//   } catch {
//     return null;
//   }
// };
// export const getVerificationTokenByToken = async (token: string) => {
//   try {
//     const verificationToken = await db.verificationToken.findUnique({
//       where: { token },
//     });
//   } catch {
//     return null;
//   }
// };
import { db } from "@/lib/db";
import { VerificationToken } from "@prisma/client";

export const getVerificationTokenByEmail = async (
  email: string
): Promise<VerificationToken | null> => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async (
  token: string
): Promise<VerificationToken | null> => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch {
    return null;
  }
};
