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

  // return (
  //   <Link href={`/activity/${activity.id}`}>
  //     <Card>
  //       <CardHeader>
  //         <CardTitle className="flex items-center justify-between">
  //           <span>{activity.forms.title}</span>
  //           <Badge variant="secondary">
  //             <span className="ml-1"></span>
  //           </Badge>
  //         </CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <div className="flex items-center text-sm text-muted-foreground">
  //           <CalendarIcon className="mr-2 h-4 w-4" />
  //           Due:
  //         </div>
  //       </CardContent>
  //     </Card>
  //   </Link>
  // );

  return (
    <div className="border p-4 rounded-lg">
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold text-lg">{activity.forms.title}</h3>
          <p className="text-sm text-gray-500">{/* {assignment.course} */}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">
            Due:
            {/* {assignment.due} */}
          </p>
          {/* <span
            className={`inline-block px-2 py-1 rounded text-xs ${
              assignment.status === "Not started"
                ? "bg-red-100 text-red-800"
                : assignment.status === "In progress"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {assignment.status}
          </span> */}
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button asChild>
          <Link href={`/activity/${activity.id}`}>Open Activity</Link>
        </Button>
      </div>
    </div>
  );
}
