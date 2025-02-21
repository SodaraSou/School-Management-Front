import ActivityForm from "@/components/student/activity/activity-form";
import { fetchActivityById } from "@/services/activity";

export default async function StudentActivityShow({
  params,
}: {
  params: Promise<{ activityId: string }>;
}) {
  const { activityId } = await params;

  const res = await fetchActivityById(activityId);

  if (!res.success) {
    throw new Error(res.message);
  }

  return <ActivityForm activity={res.data} />;
}
