import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchActivityTypes = async () => {
  const token = (await cookies()).get("session")?.value;
  if (!token) {
    redirect("/sign-in");
  }
  try {
    const res = await fetch(`${BACKEND_URL}/api/activity-types`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: `Error ${res.status}: ${data.message}`,
      };
    }
    return { ...data };
  } catch (error: any) {
    console.error(error);
    return { success: false, message: error.message };
  }
};
