import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Group } from "@/models/group";

export default function SubjectItem({ subject }: { subject: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link
            href={`/subject/${subject.subjects[0].id}?groupId=${subject.id}`}
            className="hover:underline"
          >
            {subject.subjects[0].name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Group: {subject.name}</p>
        <span className="flex space-x-2">
          <p className="text-sm text-muted-foreground">
            Year: {subject.year.name}
          </p>
          <p className="text-sm text-muted-foreground">
            Semester: {subject.semester.name}
          </p>
        </span>
        <p className="text-sm text-muted-foreground">
          Academic Year: {subject.academic_year.name}
        </p>
      </CardContent>
    </Card>
  );
}
