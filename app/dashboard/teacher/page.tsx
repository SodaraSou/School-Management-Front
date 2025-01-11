import { getGroups } from "@/app/dashboard/student/actions";

import TeacherGroupList from "@/components/teacher-group-list";

export default async function TeacherHomePage() {
  const groups = await getGroups();

  if (!groups.success) {
    throw new Error(groups.message);
  }

  return (
    <section className={"flex-1 p-4 lg:p-8"}>
      <h2 className="text-2xl font-bold mb-4">My Groups</h2>
      <TeacherGroupList />
    </section>
  );
}
