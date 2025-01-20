import { getGroupById } from "../../actions";

import StudentSubjectList from "@/components/student/subject-list";

export default async function SingleStudentGroup({
  params,
}: {
  params: Promise<{ group_id: string }>;
}) {
  const { group_id } = await params;
  const group = await getGroupById(group_id);

  if (!group.success) {
    throw new Error(group.message);
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">{group.data!.name}</h2>
      <StudentSubjectList subjects={group.data!.subjects} group_id={group_id} />
    </div>
  );
}
