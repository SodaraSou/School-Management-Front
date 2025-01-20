import { fetchGroupSubjectData } from "@/app/(dashboard)/teacher/actions";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostList from "@/components/teacher/post-list";
import PostCreateForm from "@/components/teacher/post-create-form";
import UserList from "@/components/teacher/user-list";

export default async function TeacherSubjectShow({
  params,
}: {
  params: Promise<{ group_id: string; subject_id: string }>;
}) {
  const { group_id, subject_id } = await params;

  const groupSubjectData = await fetchGroupSubjectData(group_id, subject_id);

  if (!groupSubjectData?.success) {
    throw new Error(groupSubjectData?.message);
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
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
      <Tabs defaultValue="post">
        <TabsList>
          <TabsTrigger value="post">Post</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
        </TabsList>
        <TabsContent value="post">
          <div className="space-y-4">
            <PostCreateForm groupId={group_id} subjectId={subject_id} />
            <PostList posts={groupSubjectData.data.posts} />
          </div>
        </TabsContent>
        <TabsContent value="assignments">
          <div className="space-y-4"></div>
        </TabsContent>
        <TabsContent value="people">
          <div className="space-y-4">
            <UserList users={groupSubjectData.data.users} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
