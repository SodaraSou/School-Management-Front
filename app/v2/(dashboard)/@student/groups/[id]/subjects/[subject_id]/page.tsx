import Link from "next/link";
import {
  fetchGroupSubjectById,
  fetchGroupSubjectStudentScore,
} from "@/app/v2/(dashboard)/@student/groups/services";
import {
  FileText,
  MessageCircle,
  Users,
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
import StudentLayout from "@/components/v2/student/layout/student-layout";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function StudentGroupsSubject({
  params,
}: {
  params: Promise<{ id: string; subject_id: string }>;
}) {
  const { id, subject_id } = await params;
  const result = await fetchGroupSubjectById(id, subject_id);
  const studentScore = await fetchGroupSubjectStudentScore(id, subject_id);

  if (result.success === false) {
    throw new Error(result.message);
  }

  // Filter out students from the users list
  const students = result.data.users.filter((user: any) =>
    user.role.includes("student")
  );

  return (
    <StudentLayout>
      <div className="flex flex-col gap-6">
        <Card className="bg-indigo-600">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center text-white">
              {result.data.name}
            </CardTitle>
            <CardDescription className="mt-2 text-lg text-indigo-100 text-center">
              {result.data.group_user.name}
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
              Activities
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

          {/* Stream Tab */}
          <TabsContent value="stream">
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between bg-indigo-600">
                <div>
                  <CardTitle className="text-2xl font-bold text-white">
                    Announcements & Posts
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {result.data.posts && result.data.posts.length > 0 ? (
                  result.data.posts.map((post: any) => (
                    <Card key={post.id} className="mb-4 border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center mb-4">
                          <div className="flex items-center justify-center w-10 h-10 font-bold text-indigo-700 bg-indigo-200 rounded-full">
                            {post.user.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium">{post.user.name}</p>
                            <p className="text-sm text-gray-500">
                              Posted on{" "}
                              {format(
                                new Date(post.created_at),
                                "dd-MM-yyyy HH:mm a"
                              )}
                            </p>
                          </div>
                        </div>
                        <p>{post.caption}</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p>No posts available.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments">
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between bg-indigo-600">
                <CardTitle className="text-2xl font-bold text-white">
                  Activities
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-6 flex flex-col gap-6">
                {result.data.activities && result.data.activities.length > 0 ? (
                  result.data.activities.map((activity: any) => (
                    <Card key={activity.id}>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <h4 className="font-medium text-indigo-600">
                            {activity.forms.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Type: {activity.activityType.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Due:{" "}
                            {format(
                              new Date(activity.due_at),
                              "dd-MM-yyyy HH:mm a"
                            )}
                          </p>
                        </div>
                        <div>
                          <Button
                            className="text-white bg-indigo-600 hover:bg-indigo-700"
                            asChild
                          >
                            <Link href={`/v2/activities/${activity.id}`}>
                              <Eye />
                              View Activity
                            </Link>
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  ))
                ) : (
                  <p>No activities available.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* People Tab */}
          <TabsContent value="people">
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between bg-indigo-600">
                <CardTitle className="text-2xl font-bold text-white">
                  People
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-6 flex flex-col gap-6">
                {students && students.length > 0 ? (
                  students.map((student: any) => (
                    <Card key={student.id} className="mb-4">
                      <CardHeader className="flex flex-row gap-6 items-center">
                        <Avatar>
                          <AvatarImage src={student.image_url || ""} />
                          <AvatarFallback>
                            {student.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <h4 className="text-xl font-semibold text-indigo-900">
                          {student.name}
                        </h4>
                      </CardHeader>
                    </Card>
                  ))
                ) : (
                  <p>No students available.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="result">
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between bg-indigo-600">
                <CardTitle className="text-2xl font-bold text-white">
                  Result
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {studentScore.success === false ? (
                  <div className="text-center">
                    <h4 className="text-xl font-semibold">
                      {studentScore.message}
                    </h4>
                  </div>
                ) : (
                  <>
                    {studentScore.data.length === 0 ? (
                      <div className="text-center">
                        <h4 className="text-xl font-semibold">No Data</h4>
                      </div>
                    ) : (
                      <Table className="min-w-full">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="px-4 py-2 text-left text-sm font-bold text-indigo-700">
                              Activity
                            </TableHead>
                            <TableHead className="px-4 py-2 text-left text-sm font-bold text-indigo-700">
                              Type
                            </TableHead>
                            <TableHead className="px-4 py-2 text-left text-sm font-bold text-indigo-700">
                              Score
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {studentScore.data.map((result: any) => (
                            <TableRow
                              key={result.name}
                              className="border-t border-gray-200"
                            >
                              <TableCell className="px-4 py-2 text-sm text-gray-800">
                                {result.name}
                              </TableCell>
                              <TableCell className="px-4 py-2 text-sm text-gray-800"></TableCell>
                              <TableCell className="px-4 py-2 text-sm text-gray-800">
                                {result.scores}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  );
}
