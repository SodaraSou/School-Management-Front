import React from "react";

import {
  CalendarIcon,
  CheckCircleIcon,
  CircleIcon,
  FileIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type AssignmentStatus = "Not started" | "In progress" | "Submitted";

export default function AssignmentItem({ activity }: { activity: any }) {
  const statusColor: Record<AssignmentStatus, string> = {
    "Not started": "bg-yellow-500",
    "In progress": "bg-blue-500",
    Submitted: "bg-green-500",
  };

  const statusIcon: Record<AssignmentStatus, React.ReactNode> = {
    "Not started": <CircleIcon className="h-4 w-4" />,
    "In progress": <FileIcon className="h-4 w-4" />,
    Submitted: <CheckCircleIcon className="h-4 w-4" />,
  };

  return (
    <Link href={`/activity/${activity.id}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{activity.forms.title}</span>
            <Badge variant="secondary">
              <span className="ml-1"></span>
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Due:
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
