import { getGroupSubjectById } from "@/app/dashboard/student/actions";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function ShowGroupSubjectPage({
  params,
}: {
  params: Promise<{ id: string; subject_id: string }>;
}) {
  const { id, subject_id } = await params;
  const res = await getGroupSubjectById(id, subject_id);

  if (!res.success) {
    throw new Error(res.message);
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h2 className={"text-2xl font-bold"}>{res.data[0].name}</h2>
      <Card>
        <CardHeader>
          <CardTitle>Class Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Teacher: {res.data[0].teacher.name}</p>
          <p>Class Code: </p>
        </CardContent>
      </Card>
      <Tabs defaultValue="stream">
        <TabsList>
          <TabsTrigger value="stream">Stream</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
        </TabsList>
        <TabsContent value="stream">
          <Card>
            <CardHeader>
              <CardTitle>Class Stream</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Recent announcements and updates will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="assignments">
          <div className="space-y-4">
            {/*{sampleAssignments.map((assignment) => (*/}
            {/*  <AssignmentItem />*/}
            {/*))}*/}
          </div>
        </TabsContent>
        <TabsContent value="people">
          <Card>
            <CardHeader>
              <CardTitle>People</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                List of teachers and students in this class will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
