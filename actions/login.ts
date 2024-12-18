/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import * as z from "zod";

import { signIn } from "@/auth";
import { gettwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { DEFAULT_LOGGIN_REDIRRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid fields!" };
  }
  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }
  // if (!existingUser || !existingUser.email || !existingUser.password) {
  //   return { error: "Email does not exist!" };
  // }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      //TODO: VERIFY CODE
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Invalid code!" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code expired!" };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await gettwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,

      redirectTo: callbackUrl ||DEFAULT_LOGGIN_REDIRRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "An error occurred!" };
      }
    }
    throw error;
  }
};
/* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// import * as z from "zod";

// import { signIn } from "@/auth";
// import { getUserByEmail, updateUserToken } from "@/data/user"; // Ensure updateUserToken is defined to update the token
// import { generateAuthToken, generateVerificationToken } from "@/lib/tokens"; // Assuming you have a token generation function
// import { DEFAULT_LOGGIN_REDIRECT } from "@/routes";
// import { LoginSchema } from "@/schemas";
// import { AuthError } from "next-auth";
// // "use server";

// // import * as z from "zod";

// // import { signIn } from "@/auth";
// // import { getUserByEmail } from "@/data/user";
// // import { generateVerificationToken } from "@/lib/tokens";
// // import { DEFAULT_LOGGIN_REDIRRECT } from "@/routes";
// // import { LoginSchema } from "@/schemas";
// // import { AuthError } from "next-auth";

// export const login = async (values: z.infer<typeof LoginSchema>) => {
//   const validatedFields = LoginSchema.safeParse(values);

//   if (!validatedFields.success) {
//     return { error: "Invalid fields!" };
//   }

//   const { email, password } = validatedFields.data;
//   const existingUser = await getUserByEmail(email);

//   if (!existingUser || !existingUser.email || !existingUser.password) {
//     return { error: "Email does not exist!" };
//   }

//   if (!existingUser.emailVerified) {
//     const verificationToken = await generateVerificationToken(
//       existingUser.email
//     );
//     return { success: "Confirmation email sent!" };
//   }

//   try {
//     // Attempt to sign in with credentials
//     const signInResult = await signIn("credentials", {
//       email,
//       password,
//       redirectTo: DEFAULT_LOGGIN_REDIRECT,
//     });

//     if (signInResult.error) {
//       return { error: "Invalid credentials!" };
//     }

//     // Generate a new auth token if login is successful
//     const newAuthToken = generateAuthToken();

//     // Update the user's token in the database
//     await updateUserToken(existingUser.id, newAuthToken);

//     return { success: "Logged in successfully!" };
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return { error: "Invalid credentials!" };
//         default:
//           return { error: "An error occurred!" };
//       }
//     }
//     throw error;
//   }
// };
