import Link from "next/link";
import { format } from "date-fns";
import { type BreadcrumbItem } from "@/types";
import { fetchTeacherActivityDashboardById } from "@/app/v2/(dashboard)/@teacher/activities/services";

import { CalendarIcon, ClockIcon, Edit, StarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import TeacherLayout from "@/components/v2/teacher/layout/teacher-layout";

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

  const result = await fetchTeacherActivityDashboardById(id);

  if (!result.success) {
    throw new Error(result.message);
  }

  return (
    <TeacherLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-col gap-6">
        <Card className="border-l-4 border-l-indigo-500">
          <CardHeader>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-extrabold text-indigo-600">
                {result.data.title}
              </h1>
              <Button className="bg-yellow-400 hover:bg-yellow-500" asChild>
                <Link href={`/v2/activities/${result.data.id}/edit`}>
                  <Edit /> Edit Activity
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <StarIcon className="h-4 w-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Subject</p>
                  <p className="font-medium">{result.data.subject.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <CalendarIcon className="h-4 w-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Due Date</p>
                  <p className="font-medium">
                    {format(new Date(result.data.due_at), "yyyy-MM-dd HH:mm")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <ClockIcon className="h-4 w-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{result.data.duration} min</p>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="bg-indigo-600 mb-6">
            <CardTitle className="text-2xl font-bold text-white">
              Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Submitted Date</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.data.students.map((student: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.group}</TableCell>
                    <TableCell>
                      {student.status === "not submitted" ? (
                        <Badge variant={"destructive"}>{student.status}</Badge>
                      ) : (
                        <Badge variant={"success"}>{student.status}</Badge>
                      )}
                    </TableCell>
                    <TableCell>{student.score}</TableCell>
                    <TableCell>{student.submit_date}</TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <Button className="bg-blue-500 hover:bg-blue-600">
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Submission Stats */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 overflow-hidden relative bg-gradient-to-br from-indigo-50 to-white">
            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-indigo-100 opacity-50"></div>
            <div className="absolute top-0 left-0 w-16 h-16 rounded-full bg-indigo-100 opacity-30 -translate-x-8 -translate-y-8"></div>

            <h2 className="text-lg font-semibold mb-4 text-indigo-800">
              Submission Overview
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 relative z-10">
              <div className="p-4 bg-white rounded-lg shadow-sm border border-indigo-100 transform hover:scale-105 transition-transform">
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-xl font-bold text-indigo-700">
                  {submissionStats.total}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm border border-indigo-100 transform hover:scale-105 transition-transform">
                <p className="text-sm text-gray-600">Submitted</p>
                <p className="text-xl font-bold text-indigo-700">
                  {submissionStats.submitted}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm border border-indigo-100 transform hover:scale-105 transition-transform">
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-xl font-bold text-indigo-700">
                  {submissionStats.inProgress}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm border border-indigo-100 transform hover:scale-105 transition-transform">
                <p className="text-sm text-gray-600">Not Started</p>
                <p className="text-xl font-bold text-indigo-700">
                  {submissionStats.notStarted}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-indigo-50 to-white">
            <h2 className="text-lg font-semibold mb-4 text-indigo-800">
              Progress Tracking
            </h2>
            <div className="mb-6">
              <div className="flex justify-between">
                <span className="text-indigo-700 font-medium">
                  Submission Progress
                </span>
                <span className="text-indigo-900 font-bold">
                  {Math.round(
                    (submissionStats.submitted / submissionStats.total) * 100
                  )}
                  %
                </span>
              </div>
              <Progress
                value={
                  (submissionStats.submitted / submissionStats.total) * 100
                }
                className="h-3 mt-2 bg-indigo-100"
                indicatorClassName="bg-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between">
                <span className="text-indigo-700 font-medium">
                  Average Score
                </span>
                <span className="text-indigo-900 font-bold">
                  {submissionStats.averageScore.toFixed(1)} /{" "}
                  {activity.totalPoints}
                </span>
              </div>
              <Progress
                value={
                  (submissionStats.averageScore / activity.totalPoints) * 100
                }
                className="h-3 mt-2 bg-indigo-100"
                indicatorClassName="bg-indigo-500"
              />
            </div>
          </Card>
        </div> */}

        {/* Student Submissions Table */}
        {/* <Card className="overflow-hidden border-indigo-200 shadow-md">
          <div className="p-4 bg-indigo-50">
            <h2 className="text-lg font-semibold text-indigo-800">
              Student Submissions
            </h2>
          </div>
          <div className="p-1">
            <Table>
              <TableHeader className="bg-indigo-50">
                <TableRow>
                  <TableHead className="text-indigo-700">Student</TableHead>
                  <TableHead className="text-indigo-700">Status</TableHead>
                  <TableHead className="text-indigo-700">Score</TableHead>
                  <TableHead className="text-indigo-700">
                    Submitted Date
                  </TableHead>
                  <TableHead className="text-indigo-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentSubmissions.map((student, index) => (
                  <TableRow
                    key={student.id}
                    className={
                      index % 2 === 0
                        ? "bg-white"
                        : "bg-indigo-50/30 hover:bg-indigo-50"
                    }
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="border-2 border-indigo-200">
                          <AvatarImage
                            src={student.avatarUrl}
                            alt={student.name}
                          />
                          <AvatarFallback className="bg-indigo-200 text-indigo-700">
                            {student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          student.status === "Submitted"
                            ? "success"
                            : student.status === "In Progress"
                            ? "warning"
                            : "default"
                        }
                        className={
                          student.status === "Submitted"
                            ? "bg-indigo-500"
                            : student.status === "In Progress"
                            ? "bg-amber-500"
                            : "bg-gray-500"
                        }
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {student.score ?? "N/A"}
                    </TableCell>
                    <TableCell>{student.submittedDate ?? "N/A"}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-indigo-200 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800"
                      >
                        {student.status === "Submitted" ? "Review" : "Remind"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card> */}
      </div>
    </TeacherLayout>
  );
}
