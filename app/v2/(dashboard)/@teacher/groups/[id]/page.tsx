import Link from "next/link";
import { format } from "date-fns";
import { type BreadcrumbItem } from "@/types";
import {
  fetchGroupSubjectStudentResult,
  fetchTeacherGroupById,
} from "@/app/v2/(dashboard)/@teacher/groups/services";

import {
  FileText,
  MessageCircle,
  Users,
  PlusCircle,
  Eye,
  GraduationCap,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import TeacherLayout from "@/components/v2/teacher/layout/teacher-layout";
import PostTab from "@/components/v2/teacher/groups/post-tab";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SubjectPromotionDialog from "@/components/v2/teacher/groups/subject-promotion-dialog";

export default async function TeacherGroupById({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ subject_id: string }>;
}) {
  const { id } = await params;
  const { subject_id } = await searchParams;

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Group",
      href: "/v2/groups",
    },
    {
      title: id,
      href: `/v2/groups/${id}`,
    },
  ];

  const groupName = "Mathematics 101";
  const groupCode = "MAT101";
  const students = 32;

  const result = await fetchTeacherGroupById(id, subject_id);
  const test = await fetchGroupSubjectStudentResult(id, subject_id);

  return (
    <TeacherLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-col gap-6">
        <Card className="bg-indigo-100">
          <CardHeader>
            <CardTitle className="mb-2 text-4xl font-extrabold text-indigo-700">
              {result.data.name}
            </CardTitle>
            <CardDescription>
              Code: {groupCode} • {result.data.total_students} Students
            </CardDescription>
          </CardHeader>
        </Card>
        <Tabs defaultValue="stream" className="w-full">
          <TabsList className="mb-4 bg-white border-b">
            <TabsTrigger
              value="stream"
              className="data-[state=active]:text-indigo-700 data-[state=active]:border-b-2 data-[state=active]:border-indigo-700"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Stream
            </TabsTrigger>
            <TabsTrigger
              value="assignments"
              className="data-[state=active]:text-indigo-700 data-[state=active]:border-b-2 data-[state=active]:border-indigo-700"
            >
              <FileText className="w-4 h-4 mr-2" />
              Assignments
            </TabsTrigger>
            <TabsTrigger
              value="people"
              className="data-[state=active]:text-indigo-700 data-[state=active]:border-b-2 data-[state=active]:border-indigo-700"
            >
              <Users className="w-4 h-4 mr-2" />
              People
            </TabsTrigger>
            <TabsTrigger
              value="result"
              className="data-[state=active]:text-indigo-700 data-[state=active]:border-b-2 data-[state=active]:border-indigo-700"
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Result
            </TabsTrigger>
          </TabsList>
          <TabsContent value="stream">
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between bg-indigo-100">
                <div>
                  <CardTitle className="text-2xl font-bold text-indigo-600">
                    Welcome to {groupName}!
                  </CardTitle>
                  <CardDescription>
                    Use this space to make announcements, post assignments, and
                    engage with your students.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <PostTab
                  groupId={id}
                  subjectId={subject_id}
                  posts={result.data.posts}
                />
                {/* <div className="space-y-4">
                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-3">
                        <div className="flex items-center justify-center w-10 h-10 font-bold text-indigo-700 bg-indigo-200 rounded-full">
                          TB
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">Teacher Name</p>
                          <p className="text-sm text-gray-500">
                            Posted on May 15, 2023
                          </p>
                        </div>
                      </div>
                      <p>
                        Here is our first assignment for the week. Please submit
                        by Friday.
                      </p>
                    </CardContent>
                  </Card>
                </div> */}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="assignments">
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between bg-indigo-100">
                <CardTitle className="text-2xl font-bold text-indigo-600">
                  Assignments
                </CardTitle>
                <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
                  <Link
                    href={{
                      pathname: "/v2/activities/create",
                      query: { group_id: id },
                    }}
                  >
                    <PlusCircle className="w-4 h-4" />
                    Create Assignment
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="mt-6">
                <div className="flex flex-col gap-6">
                  {result.data.activities.map(
                    (activity: any, index: number) => (
                      <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between">
                          <div>
                            <h4 className="font-medium text-indigo-700">
                              {activity.form.title}
                            </h4>
                            <p className="text-sm text-gray-500">
                              Type: {activity.activity_type.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Due:{" "}
                              {format(
                                new Date(activity.due_at),
                                "yyyy-MM-dd HH:mm"
                              )}
                            </p>
                          </div>
                          <div>
                            <Button
                              className="text-white bg-indigo-600 hover:bg-indigo-700"
                              asChild
                            >
                              <Link href={`/v2/activities/${activity.id}`}>
                                <Eye className="w-4 h-4" /> View Assignment
                              </Link>
                            </Button>
                          </div>
                        </CardHeader>
                      </Card>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="people">
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between bg-indigo-100">
                <CardTitle className="text-2xl font-bold text-indigo-600">
                  Students
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {result.data.students.map((student: any, index: number) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row gap-6">
                      <Avatar>
                        <AvatarImage src={student.image_url} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <h4 className="text-xl font-semibold text-indigo-900">
                        {student.name}
                      </h4>
                    </CardHeader>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="result">
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between bg-indigo-100">
                <CardTitle className="text-2xl font-bold text-indigo-600">
                  Results Ranking
                </CardTitle>
                <SubjectPromotionDialog group_id={id} subject_id={subject_id} />
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  {(() => {
                    const rankingData = test.data
                      .map((student: any) => ({
                        ...student,
                        totalScore: (student.activities || []).reduce(
                          (acc: number, act: any) => acc + act.scores,
                          0
                        ),
                      }))
                      .sort((a: any, b: any) => b.totalScore - a.totalScore);
                    return (
                      <Table className="min-w-full">
                        <TableHeader>
                          <TableRow className="bg-indigo-50">
                            <TableHead className="px-4 py-2 text-left text-sm font-bold text-indigo-700">
                              Rank
                            </TableHead>
                            <TableHead className="px-4 py-2 text-left text-sm font-bold text-indigo-700">
                              Student
                            </TableHead>
                            {test.data[0].activities.map((activity: any) => (
                              <TableHead
                                className="px-4 py-2 text-left text-sm font-bold text-indigo-700"
                                key={activity.id}
                              >
                                {activity.name}
                              </TableHead>
                            ))}
                            <TableHead className="px-4 py-2 text-left text-sm font-bold text-indigo-700">
                              Total Score
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {rankingData.map((student: any, index: number) => (
                            <TableRow
                              key={student.id}
                              className="border-t border-gray-200"
                            >
                              <TableCell className="px-4 py-2 text-sm text-gray-800">
                                {index + 1}
                              </TableCell>
                              <TableCell className="px-4 py-2 text-sm text-gray-800">
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage src={student.image_url} />
                                    <AvatarFallback>
                                      {student.name.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  {student.name}
                                </div>
                              </TableCell>
                              {student.activities.map((activty: any) => (
                                <TableCell
                                  className="px-4 py-2 text-sm text-gray-800"
                                  key={activty.id}
                                >
                                  {activty.scores}
                                </TableCell>
                              ))}
                              <TableCell className="px-4 py-2 text-sm text-gray-800">
                                {student.totalScore}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    );
                  })()}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TeacherLayout>
  );
}
