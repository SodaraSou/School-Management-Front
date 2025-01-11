import React from "react";

export default async function TeacherSubjectShow({
  params,
}: {
  params: Promise<{ subject_id: string }>;
}) {
  const { subject_id } = await params;
  return <div>{subject_id}</div>;
}
