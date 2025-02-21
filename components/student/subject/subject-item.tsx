import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentSubjectItem({ subject }: { subject: any }) {
  return (
    <Card key={subject.id}>
      <CardHeader>
        <CardTitle>
          <Link
            href={{
              pathname: `/subject/${subject.id}`,
              query: {
                groupId: subject.group.id,
              },
            }}
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
