import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchStudentProfile = async () => {
  const token = (await cookies()).get("session")?.value;
  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }
  try {
    let res = await fetch(`${BACKEND_URL}/api/v2/student/profile`, {
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
