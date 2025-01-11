"use client";

import { useEffect } from "react";

export default function UserError({
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
    <main className="max-w-2xl mx-auto flex flex-col items-center justify-center p-6">
      <h2 className="text-center">{error.message}</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 tex-sm text-white transition-colors hover:bg-blue-400"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}
