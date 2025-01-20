import React from "react";
import Link from "next/link";
import { Group } from "@/models/group";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StudentGroupItem from "./group-item";

export default function StudentGroupList({ groups }: { groups: Group[] }) {
  if (groups.length === 0) {
    return <div>No Group</div>;
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {groups.map((group: Group) => (
        <StudentGroupItem key={group.id} group={group} />
      ))}
    </div>
  );
}
