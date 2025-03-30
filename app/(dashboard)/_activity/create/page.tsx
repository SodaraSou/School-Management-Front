import AssignmentCreateForm from "@/components/teacher/assignment-create-form";

export default async function ActivityCreatePage({
  searchParams,
}: {
  searchParams: Promise<{
    groupId: string;
    subjectId: string;
    activity: string;
    type: string;
  }>;
}) {
  const { groupId, subjectId, activity, type } = await searchParams;
  return (
    <AssignmentCreateForm
      groupId={groupId}
      subjectId={subjectId}
      activity={activity}
      type={type}
    />
  );
}
