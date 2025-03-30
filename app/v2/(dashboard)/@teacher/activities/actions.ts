"use server";

import { format } from "date-fns";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createActivity = async (prevState: any, formData: FormData) => {
  const token = (await cookies()).get("session")?.value;
  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }

  const activityTypeId = formData.get("activity_type");
  console.log(activityTypeId);
  const dueDateString = formData.get("due_date") as string;
  const dueDate = dueDateString
    ? format(new Date(dueDateString), "yyyy-MM-dd HH:mm")
    : null;
  console.log(dueDate);
  const duration = formData.get("duration");
  console.log(duration);
  const title = formData.get("title");
  console.log(title);
  const description = formData.get("description");
  console.log(description);
  const questionsString = formData.get("questions") as string;
  const questions = JSON.parse(questionsString);
  console.log(questions);
  const groupsString = formData.get("groups") as string;
  const groups = JSON.parse(groupsString);
  console.log(groups);

  try {
    const res = await fetch(`${BACKEND_URL}/api/v2/teacher/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        activity_type_id: activityTypeId,
        due_at: dueDate,
        duration,
        title,
        description,
        group_ids: groups,
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
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `Error: ${error.message}`,
    };
  }

  redirect("/v2/activities");
};

export const updateActivity = async (prevState: any, formData: FormData) => {
  const token = (await cookies()).get("session")?.value;
  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }

  const activityTypeId = formData.get("activity_type");
  console.log(activityTypeId);
  const dueDateString = formData.get("due_date") as string;
  const dueDate = dueDateString
    ? format(new Date(dueDateString), "yyyy-MM-dd HH:mm")
    : null;
  console.log(dueDate);
  const duration = formData.get("duration");
  console.log(duration);
  const title = formData.get("title");
  console.log(title);
  const description = formData.get("description");
  console.log(description);
  const questionsString = formData.get("questions") as string;
  const questions = JSON.parse(questionsString);
  console.log(questions);
  const groupsString = formData.get("groups") as string;
  const groups = JSON.parse(groupsString);
  console.log(groups);

  try {
    const res = await fetch(`${BACKEND_URL}/api/v2/teacher/activities`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        activity_type_id: activityTypeId,
        due_at: dueDate,
        duration,
        title,
        description,
        group_ids: groups,
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
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `Error: ${error.message}`,
    };
  }

  redirect("/v2/activities");
};