import { getTeacherSubjects } from "./actions";

import SubjectList from "@/components/teacher/subject-list";

export default async function TeacherHomePage() {
  // const groups = await getGroups();
  const subjects = await getTeacherSubjects();

  // if (!groups.success) {
  //   throw new Error(groups.message);
  // }

  if (!subjects.success) {
    throw new Error(subjects.message);
  }

  return (
    <section className={"flex-1 p-4 lg:p-8"}>
      <h2 className="text-2xl font-bold mb-4">My Subjects</h2>
      <SubjectList subjects={subjects.data!} />
    </section>
  );
}
