import Link from "next/link";
import { format } from "date-fns";
import { fetchTeacherActivities } from "@/app/v2/(dashboard)/@teacher/activities/services";
import { type BreadcrumbItem } from "@/types";

import { Calendar, BookOpen, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import TeacherLayout from "@/components/v2/teacher/layout/teacher-layout";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Activities",
    href: "/v2/activities",
  },
];

export default async function TeacherActivities() {
  const result = await Promise.all([fetchTeacherActivities()]);

  if (result[0].success === false) {
    throw new Error(result[0].message);
  }

  console.log(result[0]);

  return (
    <TeacherLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-col gap-6">
        <header className="flex items-center justify-between bg-indigo-50 p-6 rounded-lg">
          <div>
            <h1 className="text-4xl font-extrabold text-indigo-600 mb-2">
              Recent Activities
            </h1>
            <p className="text-lg text-gray-600">
              Stay updated with your ongoing tasks and upcoming events.
            </p>
          </div>
        </header>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-1">
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700"
            >
              Department
            </label>
            <Select>
              <SelectTrigger
                id="department"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="math">Math</SelectItem>
                <SelectItem value="history">History</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label
              htmlFor="academicYear"
              className="block text-sm font-medium text-gray-700"
            >
              Academic Year
            </label>
            <Select>
              <SelectTrigger
                id="academicYear"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2022-2023">2022-2023</SelectItem>
                <SelectItem value="2023-2024">2023-2024</SelectItem>
                <SelectItem value="2024-2025">2024-2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label
              htmlFor="schoolYear"
              className="block text-sm font-medium text-gray-700"
            >
              School Year
            </label>
            <Select>
              <SelectTrigger
                id="schoolYear"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <SelectContent>
                <SelectItem value="all">All School Years</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label
              htmlFor="groupName"
              className="block text-sm font-medium text-gray-700"
            >
              Group Name
            </label>
            <Input
              id="groupName"
              type="text"
              placeholder="Search group name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
        <main>
          {result[0].data.length === 0 ? (
            <div className="p-6">
              <h2 className="text-3xl font-bold text-indigo-600 text-center">
                No Activites
              </h2>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {result[0].data.map((activity: any) => (
                <Card key={activity.id}>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-indigo-600">
                      {activity.title}
                    </CardTitle>
                    <div className="flex gap-4">
                      <div className="flex items-center text-sm text-gray-00">
                        <Calendar className="h-4 w-4 inline mr-2" />
                        <span>
                          Due at:{" "}
                          {format(new Date(activity.due_at), "yy-MM-dd HH:mm")}
                        </span>
                      </div>
                      {activity.duration && (
                        <div className="flex items-center text-sm text-gray-00">
                          <Clock className="h-4 w-4 inline mr-2" />
                          <span>Duration: {activity.duration}</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="text-gray-700 space-y-2">
                    {/* <div className="flex items-center">
                    <Users className="h-4 w-4 text-indigo-600 mr-2" />
                    <span>
                      <strong>Group:</strong> {activity.groupName}
                    </span>
                  </div> */}
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 text-indigo-600 mr-2" />
                      <span>
                        <strong>Year:</strong> {activity.year}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-indigo-600 mr-2" />
                      <span>
                        <strong>Semester:</strong> {activity.semester}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 text-indigo-600 mr-2" />
                      <span>
                        <strong>School Year:</strong> {activity.school_year}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="ml-auto bg-indigo-600 text-white hover:bg-indigo-700"
                      asChild
                    >
                      <Link href={`/v2/activities/${activity.id}`}>
                        View Group
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </TeacherLayout>
  );
}
