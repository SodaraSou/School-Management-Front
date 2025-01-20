import { Group } from "@/models/group";

import SubjectItem from "@/components/teacher/subject-item";

export default function SubjectList({ subjects }: { subjects: any[] }) {
  if (subjects.length === 0) {
    return <div>No Subjects</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {subjects.map((subject: Group) => (
        <SubjectItem key={subject.id} subject={subject} />
      ))}
    </div>
  );
}
