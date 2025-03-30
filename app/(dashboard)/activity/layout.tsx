"use client";

import { use } from "react";
import { useUser } from "@/contexts/user-context";

export default function ActivityLayout({
  teacher,
  student,
}: {
  teacher: React.ReactNode;
  student: React.ReactNode;
}) {
  const { userPromise } = useUser();
  const user = use(userPromise);

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col gap-4">
      {user?.role[0] === "teacher" && teacher}
      {user?.role[0] === "student" && student}
    </div>
  );
}
