import { getGroupSubjectById } from "@/app/(dashboard)/student/actions";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostList from "@/components/student/post-list";
import UserList from "@/components/student/user-list";

export default async function ShowGroupSubjectPage({
  params,
}: {
  params: Promise<{ group_id: string; subject_id: string }>;
}) {
  const { group_id, subject_id } = await params;
  const res = await getGroupSubjectById(group_id, subject_id);

  if (!res.success) {
    throw new Error(res.message);
  }

  console.log(res.data);

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h2 className={"text-2xl font-bold"}></h2>
      <Card>
        <CardHeader>
          <CardTitle>Class Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Subject: <b>{res.data.name}</b>
          </p>
          <p>Teacher:</p>
          <p>Class Code: </p>
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
            <PostList posts={res.data.posts} />
          </div>
        </TabsContent>
        <TabsContent value="assignments"></TabsContent>
        <TabsContent value="people">
          <div className="space-y-4">
            <UserList users={res.data.users} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
