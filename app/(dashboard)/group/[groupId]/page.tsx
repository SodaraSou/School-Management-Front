import { fetchStudentGroupById } from "@/services/group";

import { Clock, Shapes } from "lucide-react";
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

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Shapes className="h-6 w-6 text-yellow-500 mr-2" />
          {res.data.name}
        </h1>
        <div className="text-sm bg-white rounded-full px-3 py-1 shadow-sm border flex items-center">
          <Clock className="h-4 w-4 inline mr-1 text-blue-500" />
          Tuesday, March 4, 2025
        </div>
      </div>
      <StudentSubjectList subjects={res.data.subjects} />
    </section>
  );
}
