import { type BreadcrumbItem } from "@/types";

import TeacherLayout from "@/components/v2/teacher/layout/teacher-layout";
import TeacherEditActivitiesForm from "@/components/v2/teacher/activities/teacher-edit-activities-form";

export default async function TeacherActivitiesEdit({
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
    {
      title: "Edit",
      href: `/v2/activities/${id}/edit`,
    },
  ];

  return (
    <TeacherLayout breadcrumbs={breadcrumbs}>
      <TeacherEditActivitiesForm />
    </TeacherLayout>
  );
}
