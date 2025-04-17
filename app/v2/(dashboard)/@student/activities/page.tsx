import { type BreadcrumbItem } from "@/types";
import { fetchStudentsActivities } from "@/app/v2/(dashboard)/@student/activities/services";

import StudentLayout from "@/components/v2/student/layout/student-layout";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Activities",
    href: "/v2/activities",
  },
];

export default async function StudentActivities() {
  const result = await fetchStudentsActivities();

  if (result.success === false) {
    throw new Error(result.message);
  }

  console.log(result.data);

  return (
    <StudentLayout breadcrumbs={breadcrumbs}>StudentActivities</StudentLayout>
  );
}
