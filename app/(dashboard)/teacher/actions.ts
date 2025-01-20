"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { announcementSchema } from "./validation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getTeacherSubjects = async () => {
  const token = (await cookies()).get("session")?.value;
  if (!token) {
    return {
      data: null,
      success: false,
      message: "Unauthorized: No token found.",
    };
  }
  
  try {
    const res = await fetch(`${BACKEND_URL}/api/groups/teacher`, {
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
        data: null,
        success: false,
        message: `Error ${res.status}: ${data.message}`,
      };
    }
    return {
      data: data.data,
      success: data.success,
      message: data.message,
    };
  } catch (error) {
    const res = error as Error;
    console.error(res.message);
    return {
      data: null,
      success: false,
      message: `Error: ${res.message}`,
    };
  }
};

export const fetchGroupSubjectData = async (
  groupId: string,
  subjectId: string
) => {
  const token = (await cookies()).get("session")?.value;
  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }

  try {
    const res = await fetch(
      `${BACKEND_URL}/api/groups/${groupId}/subjects/${subjectId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: `Error ${res.status}: ${data.message}`,
      };
    }
    return {
      success: true,
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    console.log(error);
    const res = error as Error;
    return { success: false, message: res.message };
  }
};

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
