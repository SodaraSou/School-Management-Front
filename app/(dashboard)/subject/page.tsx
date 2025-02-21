import { getTeacherSubjects } from "@/services/subject";

import SubjectList from "@/components/teacher/subject-list";

export default async function SubjectIndexPage() {
  const subjects = await getTeacherSubjects();

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
