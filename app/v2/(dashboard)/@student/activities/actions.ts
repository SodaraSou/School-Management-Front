"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const submitActivity = async (prevData: any, formData: FormData) => {
  const token = (await cookies()).get("session")?.value;
  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }

  const activityId = formData.get("activity_id") as string;
  const answersString = formData.get("answers") as string;
  const answers = JSON.parse(answersString);

  try {
    const res = await fetch(`${BACKEND_URL}/api/answers/bulk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        answers: answers,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data);
      return {
        success: false,
        message: `Error ${res.status}: ${data.message}`,
      };
    }
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `Error: ${error.message}`,
    };
  }

  redirect(`/v2/activities/${activityId}`);
};
