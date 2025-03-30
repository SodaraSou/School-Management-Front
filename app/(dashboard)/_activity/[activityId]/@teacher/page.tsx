import { fetchActivityById } from "@/services/activity";

import AssignmentEditForm from "@/components/teacher/assignment-edit-form";

export default async function TeacherActivityShow({
  params,
}: {
  params: Promise<{ activityId: string }>;
}) {
  const { activityId } = await params;

  const res = await fetchActivityById(activityId);

  if (!res.success) {
    throw new Error(res.message);
  }

  return <AssignmentEditForm activity={res.data} />;
}
