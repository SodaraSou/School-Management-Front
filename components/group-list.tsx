import React from "react";
import Link from "next/link";
import { Group } from "@/model/group";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GroupList({ groups }: { groups: Group[] }) {
  if (groups.length === 0) {
    return <div>No Group</div>;
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {groups.map((group: Group) => (
        <Card key={group.id}>
          <CardHeader>
            <CardTitle>
              <Link
                href={`/student/group/${group.id}`}
                className="hover:underline"
              >
                {group.name}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Academic Year: {group.academic_year}
            </p>
            <p className="text-sm text-muted-foreground">
              Class Year: {group.year}
            </p>
            <p className="text-sm text-muted-foreground">
              Class Semester: {group.semester}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
