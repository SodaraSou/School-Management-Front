"use server";

import { cookies } from "next/headers";
import { ApiResponse } from "@/models/api-response";
import { Group } from "@/models/group";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getGroupById = async (id: string): Promise<ApiResponse<Group>> => {
  const token = (await cookies()).get("session")?.value;
  if (!token) {
    return {
      data: null,
      success: false,
      message: "Unauthorized: No token found.",
    };
  }
  try {
    const res = await fetch(`${BACKEND_URL}/api/groups/${id}`, {
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

export const getGroups = async (): Promise<ApiResponse<Group[]>> => {
  const token = (await cookies()).get("session")?.value;
  if (!token) {
    return {
      data: null,
      success: false,
      message: "Unauthorized: No token found.",
    };
  }
  try {
    const res = await fetch(`${BACKEND_URL}/api/groups/student`, {
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

export const getGroupSubjectById = async (
  group_id: string,
  subject_id: string
) => {
  const token = (await cookies()).get("session")?.value;
  if (!token) {
    return {
      data: null,
      success: false,
      message: "Unauthorized: No token found.",
    };
  }
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/groups/${group_id}/subjects/${subject_id}`,
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
