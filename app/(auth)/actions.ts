"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
import axios from "@/lib/axios";

const signInSchema = z.object({
  email: z.string().min(1, {
    message: "Required Email",
  }),
  password: z.string().min(8, {
    message: "Required Password",
  }),
});

export const signIn = async (prevData: any, formData: FormData) => {
  const validatedData = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedData.success) {
    console.log(validatedData.error.flatten().fieldErrors);
    return { ...validatedData.error.flatten().fieldErrors, success: false };
  }
  var user = null;
  try {
    const res = await axios.post("/api/login", { ...validatedData.data });
    user = res.data;
    const expirationDate = new Date(Date.now() + res.data.expires);
    cookies().set("session", res.data.token, {
      expires: expirationDate,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  } catch (error: any) {
    console.log(error);
    return { message: error.response, success: false };
  }
  if (user.is_super_admin) {
    redirect("/dashboard");
  }
  redirect("/");
};

const signUpSchema = z.object({
  name: z.string().min(1, {
    message: "Required Name",
  }),
  email: z.string().min(1, {
    message: "Required Email",
  }),
  password: z.string().min(8, {
    message: "Required Password",
  }),
  password_confirmation: z.string().min(8, {
    message: "Required Confirm Password",
  }),
});

export const signUp = async (prevData: any, formData: FormData) => {
  const validatedData = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    password_confirmation: formData.get("confirmPassword"),
  });
  if (!validatedData.success) {
    console.log(validatedData.error.flatten().fieldErrors);
    return { ...validatedData.error.flatten().fieldErrors, success: false };
  }
  try {
    const res = await axios.post("/api/register", { ...validatedData.data });
    const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);
    cookies().set("session", res.data.token, {
      expires: expiresInOneDay,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  } catch (error: any) {
    console.log(error);
    return { message: error.response, success: false };
  }
  redirect("/");
};
