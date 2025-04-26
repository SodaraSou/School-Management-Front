import { fetchStudentsActivityById } from "@/app/v2/(dashboard)/@student/activities/services";

import ActivityForm from "@/components/student/activity/activity-form";

export default async function StudentActivityForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await fetchStudentsActivityById(id);

  if (result.success === false) {
    throw new Error(result.message);
  }

  console.log(result.data);

  return (
    <div className="container mx-auto p-6 md:p-10">
      <ActivityForm activity={result.data} />
    </div>
  );
}
