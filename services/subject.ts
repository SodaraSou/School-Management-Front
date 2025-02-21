import { cookies } from "next/headers";

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
  } catch (error: any) {
    console.log(error);
    return { success: false, message: error.message };
  }
};
