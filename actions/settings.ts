"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { SettingsSchema } from "@/schemas";
import * as z from "zod";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  if (!user.id) {
    return { error: "Unauthorized" };
  }
  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unautherized" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const exitingUser = await getUserByEmail(values.email);

    if (exitingUser && exitingUser.id !== user.id) {
      return { error: "Email already in use" };
    }
  }

  // const verificationToken = values.email ? await generateVerificationToken(values.email) : null;

  // if (verificationToken) {
  //   await sendVerificationEmail(
  //     verificationToken.email,
  //     verificationToken.token
  //   );
  // }

  const verificatioToken = await generateVerificationToken(values.email || "");

  await sendVerificationEmail(verificatioToken.email, verificatioToken.token);
  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "Settings updated!" };
};
