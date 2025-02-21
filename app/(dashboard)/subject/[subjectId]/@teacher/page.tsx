import { fetchGroupSubjectData } from "@/services/subject";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostList from "@/components/teacher/post-list";
import PostCreateForm from "@/components/teacher/post-create-form";
import UserList from "@/components/teacher/user-list";
import AssignmentList from "@/components/teacher/assignment-list";
import AssignmentCreateMenu from "@/components/teacher/assignment-create-menu";

export default async function TeacherSubjectShowPage({
  params,
  searchParams,
}: {
  params: Promise<{ subjectId: string }>;
  searchParams: Promise<{ groupId: string }>;
}) {
  const { subjectId } = await params;
  const { groupId } = await searchParams;

  const groupSubjectData = await fetchGroupSubjectData(groupId, subjectId);

  if (!groupSubjectData?.success) {
    throw new Error(groupSubjectData?.message);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Class Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Subject: <b>{groupSubjectData.data.name}</b>
          </p>
        </CardContent>
      </Card>
      <Tabs defaultValue="announcement">
        <TabsList>
          <TabsTrigger value="announcement">Announcement</TabsTrigger>
          <TabsTrigger value="assignments">Assignment</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
        </TabsList>
        <TabsContent value="announcement">
          <div className="space-y-4">
            <PostCreateForm groupId={groupId} subjectId={subjectId} />
            <PostList posts={groupSubjectData.data.posts} />
          </div>
        </TabsContent>
        <TabsContent value="assignments">
          <div className="space-y-4">
            <AssignmentCreateMenu groupId={groupId} subjectId={subjectId} />
            <AssignmentList groupId={groupId} />
          </div>
        </TabsContent>
        <TabsContent value="people">
          <div className="space-y-4">
            <UserList users={groupSubjectData.data.users} />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
