"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const announcementSchema = z.object({
  caption: z.string().min(1, {
    message: "Caption Required",
  }),
});

export const postAnnouncement = async (prevState: any, formData: FormData) => {
  const token = (await cookies()).get("session")?.value;
  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }

  const validatedFields = announcementSchema.safeParse({
    caption: formData.get("caption"),
  });
  if (!validatedFields.success) {
    return {
      message: "All Fields Required",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { caption } = validatedFields.data;
  const subjectId = formData.get("subjectId");
  const groupId = formData.get("groupId");
  try {
    const res = await fetch(`${BACKEND_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        caption,
        subject_id: subjectId,
        group_id: groupId,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${data.message}`);
    }
  } catch (error) {
    console.log(error);
    const res = error as Error;
    throw new Error(res.message);
  }

  revalidatePath(`/dashboard/teacher/group/${groupId}/subject/${subjectId}`);
};
