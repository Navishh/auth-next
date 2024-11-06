/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import * as z from "zod";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
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

  if (!existingUser || !existingUser.email || existingUser.password) {
    return { error: "Email does not exist!" };
  }
  // if (!existingUser || !existingUser.email || !existingUser.password) {
  //   return { error: "Email does not exist!" };
  // }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    return { success: "Confirmation email sent!" };
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

// import { signIn } from "@/auth";
// import { getUserByEmail } from "@/data/user";
// import { db } from "@/lib/db";
// import { generateAuthToken, generateVerificationToken } from "@/lib/tokens";
// import { LoginSchema } from "@/schemas";
// import bcrypt from "bcryptjs";
// import { AuthError } from "next-auth";
// import * as z from "zod";

// export const login = async (values: z.infer<typeof LoginSchema>) => {
//   const validatedFields = LoginSchema.safeParse(values);

//   // Check if fields are valid
//   if (!validatedFields.success) {
//     return { error: "Invalid fields!" };
//   }

//   const { email, password } = validatedFields.data;

//   // Get the existing user by email
//   const existingUser = await getUserByEmail(email);

//   if (!existingUser) {
//     return { error: "User does not exist!" };
//   }

//   // Check if passwords match
//   const passwordMatch = await bcrypt.compare(password, existingUser.password);
//   if (!passwordMatch) {
//     return { error: "Invalid credentials!" };
//   }

//   // Check if the email is verified
//   if (!existingUser.emailVerified) {
//     const verificationToken = await generateVerificationToken(
//       existingUser.email
//     );
//     // Logic to send verification email (not shown here)
//     return { success: "Confirmation email sent!" };
//   }

//   // Generate a new authentication token for this session
//   const newAuthToken = generateAuthToken(); // Define generateAuthToken function
//   await db.user.update({
//     where: { email },
//     data: { authenticationToken: newAuthToken },
//   });

//   try {
//     // Sign in using NextAuth
//     await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//     });
//     return { success: "Logged in successfully!" };
//   } catch (error) {
//     if (error instanceof AuthError) {
//       return { error: "An error occurred during sign-in!" };
//     }
//     throw error;
//   }
// };
