import AssignmentCreateForm from "@/components/teacher/assignment-create-form";

export default async function TeacherAssignmentCreatePage({
  params,
  searchParams,
}: {
  params: Promise<{ group_id: string; subject_id: string }>;
  searchParams: Promise<{ activity: string; type: string }>;
}) {
  const { group_id, subject_id } = await params;
  const { activity, type } = await searchParams;

  return (
    <AssignmentCreateForm
      groupId={group_id}
      subjectId={subject_id}
      activity={activity}
      type={type}
    />
  );
}
