import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchActivities = async (groupId: string) => {
  const token = (await cookies()).get("session")?.value;
  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }

  try {
    const res = await fetch(
      `${BACKEND_URL}/api/activities?groupId=${groupId}`,
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
  } catch (error: any) {
    console.error(error);
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const fetchActivityById = async (activityId: string) => {
  const token = (await cookies()).get("session")?.value;
  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/activities/${activityId}`, {
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
    return {
      success: true,
      message: data.message,
      data: data.data,
    };
  } catch (error: any) {
    console.error(error);
    return { success: false, message: `Error: ${error.message}` };
  }
};
