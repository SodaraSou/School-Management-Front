import StudentSubjectItem from "./subject-item";

export default function StudentSubjectList({ subjects }: { subjects: any }) {
  if (subjects.length === 0) {
    return <div>No Subjects</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {subjects.map((subject: any) => (
        <StudentSubjectItem key={subject.id} subject={subject} />
      ))}
    </div>
  );
}
