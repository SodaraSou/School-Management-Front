import React from "react";
import Link from "next/link";
import { Subject } from "@/models/subject";

import StudentSubjectItem from "./subject-item";

export default function StudentSubjectList({
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
        <StudentSubjectItem
          key={subject.id}
          subject={subject}
          group_id={group_id}
        />
      ))}
    </div>
  );
}
