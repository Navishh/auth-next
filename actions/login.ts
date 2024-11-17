/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import * as z from "zod";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { DEFAULT_LOGGIN_REDIRRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid fields!" };
  }
  const { email, password } = validatedFields.data;

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
    const twoFactorToken = await generateTwoFactorToken(existingUser.email);

    await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

    return { twoFactor: true };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGGIN_REDIRRECT,
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
