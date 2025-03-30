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

  console.log(result[1]);

  return (
    <TeacherLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between bg-indigo-50 p-6 rounded-lg">
          <div>
            <h1 className="text-4xl font-extrabold text-indigo-600 mb-2">
              Teacher Dashboard
            </h1>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border overflow-hidden hover:shadow-md">
            <div className={`h-2 bg-indigo-500`}></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-indigo-800">
                Total Groups
              </CardTitle>
              <Users className="h-5 w-5 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-900">
                {result[0].data.total_groups}
              </div>
              <p className="text-xs text-indigo-500 mt-1">
                Active teaching groups
              </p>
            </CardContent>
          </Card>
          <Card className="border overflow-hidden hover:shadow-md">
            <div className={`h-2 bg-indigo-500`}></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-indigo-800">
                Total Students
              </CardTitle>
              <GraduationCap className="h-5 w-5 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-900">
                {result[0].data.total_students}
              </div>
              <p className="text-xs text-indigo-500 mt-1">Students enrolled</p>
            </CardContent>
          </Card>
          <Card className="border overflow-hidden hover:shadow-md">
            <div className={`h-2 bg-indigo-500`}></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-indigo-800">
                Current Academic Year
              </CardTitle>
              <CalendarCheck className="h-5 w-5 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-900">
                {result[0].data.current_semester.name}
              </div>
              <p className="text-xs text-indigo-500 mt-1">Academic period</p>
            </CardContent>
          </Card>
        </div>

        {/* Teaching groups */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between bg-indigo-50 rounded-t-xl">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600" />
                <span className="text-indigo-900">My Teaching Groups</span>
              </CardTitle>
              <CardDescription className="text-indigo-600">
                Manage your classes and student groups
              </CardDescription>
            </div>
            <Link href="/v2/groups">
              <Button
                variant="outline"
                size="sm"
                className="border-indigo-200 hover:bg-indigo-100 text-indigo-700"
              >
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {result[0].data.groups.map((group: any) => (
                <div
                  key={group.id}
                  className="flex items-center justify-between p-4 hover:bg-indigo-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 p-2 rounded-full">
                      <BookOpen className="h-5 w-5 text-indigo-600" />
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
                      variant="ghost"
                      size="sm"
                      className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100"
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
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-indigo-50 rounded-t-xl">
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-indigo-600" />
              <span className="text-indigo-900">Create Activities</span>
            </CardTitle>
            <CardDescription className="text-indigo-600">
              Create and manage assessments for your students
            </CardDescription>
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
                    className="h-28 w-full flex flex-col gap-2 items-center justify-center border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 group transition-all"
                  >
                    <div className="bg-indigo-100 p-3 rounded-full group-hover:bg-indigo-200 transition-colors">
                      <FileText className="h-6 w-6 text-indigo-600" />
                    </div>
                    <span className="text-indigo-600 font-medium">
                      {activityType.name}
                    </span>
                  </Button>
                </Link>
              ))}
              {/* <Link href="/v2/activities/create?type=assignment">
                <Button
                  variant="outline"
                  className="h-28 w-full flex flex-col gap-2 items-center justify-center border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 group transition-all"
                >
                  <div className="bg-indigo-100 p-3 rounded-full group-hover:bg-indigo-200 transition-colors">
                    <FileText className="h-6 w-6 text-indigo-600" />
                  </div>
                  <span className="text-indigo-600 font-medium">
                    Assignment
                  </span>
                </Button>
              </Link>
              <Link href="/v2/activities/create?type=midterm">
                <Button
                  variant="outline"
                  className="h-28 w-full flex flex-col gap-2 items-center justify-center border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 group transition-all"
                >
                  <div className="bg-indigo-100 p-3 rounded-full group-hover:bg-indigo-200 transition-colors">
                    <Target className="h-6 w-6 text-indigo-600" />
                  </div>
                  <span className="text-indigo-600 font-medium">Mid Term</span>
                </Button>
              </Link>
              <Link href="/v2/activities/create?type=final">
                <Button
                  variant="outline"
                  className="h-28 w-full flex flex-col gap-2 items-center justify-center border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 group transition-all"
                >
                  <div className="bg-indigo-100 p-3 rounded-full group-hover:bg-indigo-200 transition-colors">
                    <TrendingUp className="h-6 w-6 text-indigo-600" />
                  </div>
                  <span className="text-indigo-600 font-medium">Final</span>
                </Button>
              </Link> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </TeacherLayout>
  );
}
