import Link from "next/link";
import { type BreadcrumbItem } from "@/types";

import { FileText, MessageCircle, Users, PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TeacherLayout from "@/components/v2/teacher/layout/teacher-layout";

export default async function TeacherGroupById({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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

  return (
    <TeacherLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-col gap-6">
        <Card className="bg-indigo-100">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold text-indigo-700 mb-2">
              {groupName}
            </CardTitle>
            <CardDescription>
              Code: {groupCode} • {students} Students
            </CardDescription>
          </CardHeader>
        </Card>
        <Tabs defaultValue="stream" className="w-full">
          <TabsList className="bg-white border-b mb-4">
            <TabsTrigger
              value="stream"
              className="data-[state=active]:text-indigo-700 data-[state=active]:border-b-2 data-[state=active]:border-indigo-700"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Stream
            </TabsTrigger>
            <TabsTrigger
              value="assignments"
              className="data-[state=active]:text-indigo-700 data-[state=active]:border-b-2 data-[state=active]:border-indigo-700"
            >
              <FileText className="h-4 w-4 mr-2" />
              Assignments
            </TabsTrigger>
            <TabsTrigger
              value="people"
              className="data-[state=active]:text-indigo-700 data-[state=active]:border-b-2 data-[state=active]:border-indigo-700"
            >
              <Users className="h-4 w-4 mr-2" />
              People
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
                <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
                  <Link
                    href={{
                      pathname: "/v2/activities/create",
                      query: { groupId: id },
                    }}
                  >
                    <PlusCircle className="h-4 w-4" />
                    Create Assignment
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                <Card className="border border-gray-200 mb-6">
                  <CardContent className="p-4">
                    <textarea
                      className="w-full p-3 border border-gray-200 rounded-md mb-3"
                      placeholder="Share something with your class..."
                      rows={3}
                    />
                    <div className="flex justify-end">
                      <Button className="bg-indigo-600 hover:bg-indigo-700">
                        Post
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <div className="space-y-4">
                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
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
                </div>
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
                    <PlusCircle className="h-4 w-4" />
                    Create Assignment
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="border border-gray-200">
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-indigo-700">
                            Assignment {i}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Due: May {15 + i}, 2023
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="people">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">People</h3>
                <div className="mb-6">
                  <h4 className="text-md font-medium text-gray-600 mb-2">
                    Teachers
                  </h4>
                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
                          TB
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">Teacher Name</p>
                          <p className="text-sm text-gray-500">
                            teacher@school.edu
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <h4 className="text-md font-medium text-gray-600">
                      Students
                    </h4>
                    <Button variant="outline" size="sm">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Invite
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Card key={i} className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold">
                              S{i + 1}
                            </div>
                            <div className="ml-3">
                              <p className="font-medium">
                                Student Name {i + 1}
                              </p>
                              <p className="text-sm text-gray-500">
                                student{i + 1}@school.edu
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TeacherLayout>
  );
}
