"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
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

  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <>
      {user?.role[0] === "teacher" && teacher}
      {user?.role[0] === "student" && student}
    </>
  );
}
