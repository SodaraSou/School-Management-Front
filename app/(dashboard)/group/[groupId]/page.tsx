import { fetchStudentGroupById } from "@/services/group";

import StudentSubjectList from "@/components/student/subject/subject-list";

export default async function GroupShowPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;

  const res = await fetchStudentGroupById(groupId);
  
  if (!res.success) {
    throw new Error(res.message);
  }

  return <StudentSubjectList subjects={res.data.subjects} />;
}
