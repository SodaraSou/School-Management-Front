import Link from "next/link";
import { type BreadcrumbItem } from "@/types";
import { fetchStudentDashboard } from "@/app/v2/(dashboard)/@student/dashboard/services";

import { CalendarCheck, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StudentLayout from "@/components/v2/student/layout/student-layout";
import { format } from "date-fns";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/v2/dashboard",
  },
];

export default async function StudentDashboard() {
  const result = await fetchStudentDashboard();

  if (result.success === false) {
    throw new Error(result.message);
  }

  console.log(result);

  return (
    <StudentLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-col gap-6">
        <Card className="bg-indigo-600">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold text-white text-center">
              Student Dashboard
            </CardTitle>
          </CardHeader>
        </Card>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="overflow-hidden border hover:shadow-md">
            <div className={`h-2 bg-indigo-500`}></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-indigo-800">
                Total Groups
              </CardTitle>
              <Users className="w-5 h-5 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-900">
                {result.data.total_groups}
              </div>
            </CardContent>
          </Card>
          {/* <Card className="overflow-hidden border hover:shadow-md">
          <div className={`h-2 bg-indigo-500`}></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-indigo-800">
              Total Students
            </CardTitle>
            <GraduationCap className="w-5 h-5 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-900">
              
            </div>
            <p className="mt-1 text-xs text-indigo-500">Students enrolled</p>
          </CardContent>
        </Card> */}
          <Card className="overflow-hidden border hover:shadow-md">
            <div className={`h-2 bg-indigo-500`}></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-indigo-800">
                Current Academic Year
              </CardTitle>
              <CalendarCheck className="w-5 h-5 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-900">
                {result.data.current_semester.name}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="bg-indigo-600">
            <CardTitle className="text-2xl font-semibold text-white">
              Up Comming Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-6">
            <div className="flex flex-col gap-6">
              {result.data.future_activities.length > 0 ? (
                result.data.future_activities.map((activity: any) => (
                  <Card key={activity.id}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <h4 className="font-medium text-indigo-600">
                          {activity.form.title}
                        </h4>
                        <p className="text-sm text-gray-500">Activity Type</p>
                        <p className="text-sm text-gray-500">
                          Due At: {format(new Date(activity.due_at), 'dd-MM-yyyy HH:mm a')}
                        </p>
                      </div>
                      <Button
                        className="bg-indigo-600 hover:bg-indigo-700"
                        asChild
                      >
                        <Link href={`/v2/activities/${activity.id}`}>
                          View Activity
                        </Link>
                      </Button>
                    </CardHeader>
                  </Card>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No upcoming activities.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
