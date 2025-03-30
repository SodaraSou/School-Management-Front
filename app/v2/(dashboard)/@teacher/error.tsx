"use client";

import { Button } from "@/components/ui/button";
import TeacherLayout from "@/components/v2/teacher/layout/teacher-layout";
import { useEffect } from "react";

export default function TeacherError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <TeacherLayout>
      <div className="flex flex-col items-center justify-center bg-gray-50 px-4 py-10">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-lg font-medium mb-4 text-center max-w-2xl">
          {error.message}
        </p>
        <Button
          onClick={reset}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition"
        >
          Retry
        </Button>
      </div>
    </TeacherLayout>
  );
}
