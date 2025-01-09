import React from "react";
import Link from "next/link";
import { Subject } from "@/model/subject";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SubjectList({
  subjects,
  group_id,
}: {
  subjects: Subject[];
  group_id: string;
}) {
  if (subjects.length === 0) {
    return <div>No Subjects</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {subjects.map((subject: Subject) => (
        <Card key={subject.id}>
          <CardHeader>
            <CardTitle>
              <Link
                href={`/student/group/${group_id}/subject/${subject.id}`}
                className="hover:underline"
              >
                {subject.name}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Teacher Name: {subject.teacher.name}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
