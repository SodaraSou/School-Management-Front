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

type AssignmentStatus = "Not started" | "In progress" | "Submitted";

export default function AssignmentItem() {
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span></span>
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
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          View Details
        </Button>
        <Button size="sm">
          Submit
          {/*{status === "Submitted" ? "Edit Submission" : "Submit"}*/}
        </Button>
      </CardFooter>
    </Card>
  );
}
