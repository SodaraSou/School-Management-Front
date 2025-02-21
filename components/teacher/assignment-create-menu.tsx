import Link from "next/link";
import { fetchActivityTypes } from "@/services/activity-type";

import { Plus, TriangleAlert, FileText } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function AssignmentCreateMenu({
  groupId,
  subjectId,
}: {
  groupId: string;
  subjectId: string;
}) {
  const activityTypes = await fetchActivityTypes();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-blue-500 text-white" variant={"outline"}>
          <Plus /> Create
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {!activityTypes.success ? (
          <div className="flex justify-center items-center gap-2">
            <TriangleAlert />
            <p className="text-lg text-center font-medium">Error</p>
          </div>
        ) : (
          <>
            {activityTypes.data.map((activityType: any) => (
              <DropdownMenuItem key={activityType.id} asChild>
                <Link
                  href={{
                    pathname: "/activity/create",
                    query: {
                      groupId: groupId,
                      subjectId: subjectId,
                      activity: activityType.name,
                      type: activityType.id,
                    },
                  }}
                >
                  <FileText /> {activityType.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
