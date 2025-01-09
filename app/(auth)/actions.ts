"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
import axios from "@/lib/axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

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
    return { ...validatedData.error.flatten().fieldErrors, success: false };
  }
  let user = null;
  try {
    const res = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData.data),
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData);
      return {
        message: errorData.message,
        success: false,
        status: res.status,
      };
    }
    user = await res.json();
    const expirationDate = new Date(Date.now() + user.data.expires);
    (await cookies()).set("session", user.data.token, {
      expires: expirationDate,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  } catch (error) {
    console.log(error);
    return {
      message: "An error occurred",
      success: false,
    };
  }
  if (user.data.role[0] === "student") {
    redirect("/student");
  } else if (user.data.role[0] === "teacher") {
    redirect("/teacher");
  }
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

export const signUp = async (_prevData: never, formData: FormData) => {
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
    (await cookies()).set("session", res.data.token, {
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
