import ActivityForm from "@/components/student/activity/activity-form";
import { fetchActivityById } from "@/services/activity";

export default async function StudentActivityDo({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetchActivityById(id);

  if (!res.success) {
    throw new Error(res.message);
  }

  return <ActivityForm activity={res.data} />;
}
