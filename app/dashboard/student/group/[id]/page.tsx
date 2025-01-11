import { getGroupById } from "@/app/dashboard/student/actions";

import SubjectList from "@/components/subject-list";

export default async function SingleStudentGroup({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const group = await getGroupById(id);

  if (!group.success) {
    throw new Error(group.message);
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">{group.data!.name}</h2>
      <SubjectList subjects={group.data!.subjects} group_id={id} />
    </div>
  );
}
