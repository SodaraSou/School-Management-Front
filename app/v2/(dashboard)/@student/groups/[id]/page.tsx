import { type BreadcrumbItem } from "@/types";

import StudentLayout from "@/components/v2/student/layout/student-layout";
import { fetchStudentGroupById } from "@/app/v2/(dashboard)/@student/groups/services";

export default async function StudentGroupById({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Groups",
      href: "/v2/groups",
    },
    {
      title: id,
      href: `/v2/groups/${id}`,
    },
  ];

  const result = await fetchStudentGroupById(id);

  if (result.success === false) {
    throw new Error(result.message);
  }

  console.log(result);

  return (
    <StudentLayout breadcrumbs={breadcrumbs}>
      <div>
        
      </div>
    </StudentLayout>
  );
}
