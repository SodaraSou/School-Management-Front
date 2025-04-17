import StudentLayout from "@/components/v2/student/layout/student-layout";

export default async function StudentGroupsSubject({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ subject_id: string }>;
}) {
  const { id } = await params;
  const { subject_id } = await searchParams;

  return <StudentLayout>StudentGroupsSubject</StudentLayout>;
}
