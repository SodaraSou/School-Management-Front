"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const signInSchema = z.object({
  email: z.string().min(1, {
    message: "Required Email",
  }),
  password: z.string().min(8, {
    message: "Required Password",
  }),
});

export const signIn = async (_prevData: never, formData: FormData) => {
  const validatedData = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedData.success) {
    console.log(validatedData.error.flatten().fieldErrors);
    return {
      success: false,
      message: "All fields are required!",
      errors: validatedData.error.flatten().fieldErrors,
    };
  }
  try {
    const res = await fetch(`${BACKEND_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData.data),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error(data.message);
      return {
        success: false,
        message: `Error ${res.status}: ${data.message}`,
      };
    }
    const expirationDate = new Date(Date.now() + data.data.expires);
    (await cookies()).set("session", data.data.token, {
      expires: expirationDate,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: `Error: ${error.message}`,
    };
  }
  redirect("/dashboard");
};
