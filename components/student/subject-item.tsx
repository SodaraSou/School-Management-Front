import Link from "next/link";
import { Subject } from "@/models/subject";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentSubjectItem({
  subject,
  group_id,
}: {
  subject: Subject;
  group_id: string;
}) {
  return (
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
  );
}
