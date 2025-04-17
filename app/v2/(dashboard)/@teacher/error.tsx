"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import TeacherLayout from "@/components/v2/teacher/layout/teacher-layout";

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
      <div className="flex flex-col items-center justify-center px-4 py-10 bg-gray-50">
        <h1 className="mb-4 text-4xl font-bold text-red-600">
          Oops! Something went wrong.
        </h1>
        <p className="max-w-2xl mb-4 text-lg font-medium text-center">
          {error.message}
        </p>
        <Button
          onClick={reset}
          className="px-6 py-3 text-white transition bg-blue-600 rounded-lg shadow hover:bg-blue-500"
        >
          Retry
        </Button>
      </div>
    </TeacherLayout>
  );
}
