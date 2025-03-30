"use client";

import { use } from "react";
import { useUser } from "@/contexts/user-context";

export default function DashboardLayout({
  teacher,
  student,
}: {
  teacher: React.ReactNode;
  student: React.ReactNode;
}) {
  const { userPromise } = useUser();
  const user = use(userPromise);

  return (
    <>
      {user?.role[0] === "teacher" && teacher}
      {user?.role[0] === "student" && student}
    </>
  );
}
