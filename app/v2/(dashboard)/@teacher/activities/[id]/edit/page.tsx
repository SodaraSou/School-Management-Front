import { fetchTeacherGroups } from "@/app/v2/(dashboard)/@teacher/groups/services";
import { fetchTeacherActivityById } from "@/app/v2/(dashboard)/@teacher/activities/services";
import { fetchActivityTypes } from "@/services/activity-type";
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

  const result = await Promise.all([
    fetchTeacherActivityById(id),
    fetchTeacherGroups(),
    fetchActivityTypes(),
  ]);

  return (
    <TeacherLayout breadcrumbs={breadcrumbs}>
      <TeacherEditActivitiesForm
        activity={result[0]}
        teacherGroups={result[1]}
        activitiesType={result[2]}
      />
    </TeacherLayout>
  );
}
