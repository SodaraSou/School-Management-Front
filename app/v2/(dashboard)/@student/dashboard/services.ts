import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchStudentDashboard = async () => {
  const token = (await cookies()).get("session")?.value;
  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/v2/student/dashboard`, {
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
  } catch (error) {
    const res = error as Error;
    console.error(res.message);
    return {
      success: false,
      message: `Error: ${res.message}`,
    };
  }
};
