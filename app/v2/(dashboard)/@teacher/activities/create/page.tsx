import { fetchTeacherGroups } from "@/app/v2/(dashboard)/@teacher/groups/services";
import { fetchActivityTypes } from "@/services/activity-type";
import { type BreadcrumbItem } from "@/types";

import TeacherLayout from "@/components/v2/teacher/layout/teacher-layout";
import TeacherCreateActivitiesForm from "@/components/v2/teacher/activities/teacher-create-activities-form";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Activities",
    href: "/v2/activities",
  },
  {
    title: "Create",
    href: "/v2/activities/create",
  },
];

export default async function TeacherActivitiesCreate({
  searchParams,
}: {
  searchParams: Promise<{
    activity_type_id: string;
    group_id: string;
    query?: string;
  }>;
}) {
  const { activity_type_id, group_id, query } = await searchParams;
  const result = await Promise.all([
    fetchTeacherGroups(query),
    fetchActivityTypes(),
  ]);

  return (
    <TeacherLayout breadcrumbs={breadcrumbs}>
      <TeacherCreateActivitiesForm
        activityTypeId={activity_type_id}
        groupId={group_id}
        teacherGroups={result[0]}
        activitiesType={result[1]}
      />
    </TeacherLayout>
  );
}
