import { type BreadcrumbItem } from "@/types";

import TeacherLayout from "@/components/v2/teacher/layout/teacher-layout";
import { fetchTeacherActivityById } from "@/app/v2/(dashboard)/@teacher/activities/services";

export default async function TeacherActivitiesById({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Activities",
      href: "/v2/activities",
    },
    {
      title: `${id}`,
      href: `/v2/activities/${id}`,
    },
  ];

  const result = await fetchTeacherActivityById(id);

  if (!result.success) {
    throw new Error(result.message);
  }

  console.log(result);
  

  return (
    <TeacherLayout breadcrumbs={breadcrumbs}>
      TeacherActivitiesById
    </TeacherLayout>
  );
}
