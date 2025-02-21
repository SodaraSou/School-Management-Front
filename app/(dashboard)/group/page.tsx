import { fetchStudentGroup } from "@/services/group";

import StudentGroupList from "@/components/student/group/group-list";

export default async function GroupIndexPage() {
  const res = await fetchStudentGroup();

  console.log(res);
  if (!res.success) {
    throw new Error(res.message);
  }

  return <StudentGroupList groups={res.data} />;
}
