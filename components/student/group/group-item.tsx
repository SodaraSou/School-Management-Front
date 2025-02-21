import Link from "next/link";
import { Group } from "@/models/group";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentGroupItem({ group }: { group: Group }) {
  return (
    <Card key={group.id}>
      <CardHeader>
        <CardTitle>
          <Link href={`/group/${group.id}`} className="hover:underline">
            {group.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span className="flex space-x-2">
          <p className="text-sm text-muted-foreground">Year: {group.year}</p>
          <p className="text-sm text-muted-foreground">
            Semester: {group.semester}
          </p>
        </span>
        <p className="text-sm text-muted-foreground">
          Academic Year: {group.academic_year}
        </p>
      </CardContent>
    </Card>
  );
}
