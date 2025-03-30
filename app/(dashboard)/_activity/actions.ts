"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const activitySchema = z.object({
  subject_id: z.number().min(1, {
    message: "Subject ID required!",
  }),
  group_id: z.number().min(1, {
    message: "Group ID required!",
  }),
  activity_type: z.number().min(1, {
    message: "Activity Type required!",
  }),
  title: z.string().min(1, {
    message: "Title required!",
  }),
  description: z.string().min(1, {
    message: "Description required!",
  }),
});

export const createActivity = async (prevState: any, formData: FormData) => {
  const token = (await cookies()).get("session")?.value;
  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }

  const validatedFields = activitySchema.safeParse({
    subject_id: Number(formData.get("subject_id")),
    group_id: Number(formData.get("group_id")),
    activity_type: Number(formData.get("activity_type")),
    title: formData.get("title"),
    description: formData.get("description"),
  });
  if (!validatedFields.success) {
    return {
      success: false,
      message: "All Field Reqired!",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const questionsString = formData.get("questions") as string;
  const questions = JSON.parse(questionsString);

  let activityId;
  try {
    const res = await fetch(`${BACKEND_URL}/api/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        subject_id: validatedFields.data.subject_id,
        group_id: validatedFields.data.group_id,
        activity_type_id: validatedFields.data.activity_type,
        title: validatedFields.data.title,
        description: validatedFields.data.description,
        questions: questions,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: `Error ${res.status}: ${data.message}`,
      };
    }

    activityId = data.data.id;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `Error: ${error.message}`,
    };
  }

  redirect(`/activity/${activityId}`);
};

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

  redirect(`/activity`);
};
