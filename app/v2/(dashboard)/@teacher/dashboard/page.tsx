import Link from "next/link";
import { fetchTeacherDashboardData } from "@/app/v2/(dashboard)/@teacher/dashboard/services";
import { fetchActivityTypes } from "@/services/activity-type";
import { type BreadcrumbItem } from "@/types";

import {
  Award,
  BookOpen,
  CalendarCheck,
  FileText,
  GraduationCap,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TeacherLayout from "@/components/v2/teacher/layout/teacher-layout";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/v2/dashboard",
  },
];

export default async function TeacherDashboard() {
  const result = await Promise.all([
    fetchTeacherDashboardData(),
    fetchActivityTypes(),
  ]);

  if (result[0].success === false) {
    throw new Error(result[0].message);
  }

  if (result[1].success === false) {
    throw new Error(result[1].message);
  }

  return (
    <TeacherLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-col gap-6">
        <Card className="bg-indigo-600">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold text-white">
              Teacher Dashboard
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Quick stats */}
        <div className="grid gap-4 md:grid-cols-3">
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
                {result[0].data.total_groups}
              </div>
              <p className="mt-1 text-xs text-indigo-500">
                Active teaching groups
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden border hover:shadow-md">
            <div className={`h-2 bg-indigo-500`}></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-indigo-800">
                Total Students
              </CardTitle>
              <GraduationCap className="w-5 h-5 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-900">
                {result[0].data.total_students}
              </div>
              <p className="mt-1 text-xs text-indigo-500">Students enrolled</p>
            </CardContent>
          </Card>
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
                {result[0].data.current_semester.name}
              </div>
              <p className="mt-1 text-xs text-indigo-500">Academic period</p>
            </CardContent>
          </Card>
        </div>

        {/* Teaching groups */}
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between bg-indigo-600 rounded-t-xl">
            <CardTitle className="text-2xl font-semibold text-white">
              My Teaching Groups
            </CardTitle>
            <Link href="/v2/groups">
              <Button variant="outline" size="sm" className="text-indigo-700">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {result[0].data.groups.map((group: any) => (
                <div
                  key={group.id}
                  className="flex items-center justify-between p-4 transition-colors hover:bg-indigo-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-full">
                      <BookOpen className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-indigo-900">
                        {group.name}
                      </h3>
                      <p className="text-sm text-indigo-600">
                        {group.department} • {group.total_students} students
                      </p>
                    </div>
                  </div>
                  <Link href={`/v2/groups/${group.id}`}>
                    <Button
                      size="sm"
                      className="text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Manage
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Create Activities */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-indigo-600">
            <CardTitle className="text-white text-2xl font-semibold">
              Create Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-3">
              {result[1].data.map((activityType: any) => (
                <Link
                  key={activityType.id}
                  href={{
                    pathname: "/v2/activities/create",
                    query: { activity_type_id: activityType.id },
                  }}
                >
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center w-full gap-2 transition-all border-indigo-200 h-28 hover:bg-indigo-50 hover:border-indigo-300 group"
                  >
                    <div className="p-3 transition-colors bg-indigo-100 rounded-full group-hover:bg-indigo-200">
                      <FileText className="w-6 h-6 text-indigo-600" />
                    </div>
                    <span className="font-medium text-indigo-600">
                      {activityType.name}
                    </span>
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </TeacherLayout>
  );
}
