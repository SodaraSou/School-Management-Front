import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchTeacherGroups = async (query?: string) => {
  const token = (await cookies()).get("session")?.value;
  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }

  try {
    let res;
    if (query) {
      res = await fetch(`${BACKEND_URL}/api/v2/teacher/groups?name=${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      res = await fetch(`${BACKEND_URL}/api/v2/teacher/groups`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: `Error ${res.status}: ${data.message}`,
      };
    }
    return {
      success: data.success,
      message: data.message,
      data: data.data,
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: `Error: ${error.message}`,
    };
  }
};

export const fetchTeacherGroupById = async (id: string, subjectId: string) => {
  const token = (await cookies()).get("session")?.value;
  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }

  try {
    const res = await fetch(
      `${BACKEND_URL}/api/v2/teacher/subjects/${subjectId}/groups/${id}`,
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
      console.error(res);
      return {
        success: false,
        message: `Error ${res.status}: ${data.message}`,
      };
    }

    return {
      success: data.success,
      message: data.message,
      data: data.data,
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: `Error: ${error.message}`,
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

export const fetchGroupSubjectStudentResult = async (
  groupId: string,
  subjectId: string
) => {
  const token = (await cookies()).get("session")?.value;
  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }

  try {
    const res = await fetch(
      `${BACKEND_URL}/api/v2/teacher/subjects/${subjectId}/groups/${groupId}/scores`,
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
