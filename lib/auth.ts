"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "@/models/user";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getCurrentUserV2 = async (): Promise<User | null> => {
  const token = (await cookies()).get("session")?.value;
  if (!token) {
    return null;
  }
  try {
    const res = await fetch(`${BACKEND_URL}/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      return null;
    }
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const signOut = async () => {
  (await cookies()).delete("session");
  redirect("/sign-in");
};
