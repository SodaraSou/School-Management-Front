"use client";

import { useState } from "react";

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Search from "@/components/v2/search";

export default function TeacherAssignActivitiesDialog({
  groups,
  handleAssignGroupToActivity,
  defaultGroupId,
  defaultGroups,
}: {
  groups: any;
  handleAssignGroupToActivity: (groups: any[]) => void;
  defaultGroupId?: string;
  defaultGroups?: any[];
}) {
  if (groups.success === false) {
    throw new Error(groups.message);
  }

  const [selectedGroups, setSelectedGroups] = useState<number[]>(
    defaultGroupId
      ? [Number(defaultGroupId)]
      : defaultGroups
      ? defaultGroups.map((group) => group.id)
      : []
  );

  const handleGroupSelect = (groupId: number) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          Assign Group
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Assign Activities to Groups</DialogTitle>
          <DialogDescription>
            Select the groups you want to assign activities to. You can search
            for specific groups.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <div className="sticky top-0 bg-white z-10">
              <h3 className="text-lg font-medium mb-2">Available Groups</h3>
              <Search />
            </div>
            <div className="max-h-[400px] overflow-y-auto flex flex-col gap-6">
              {groups.data.length === 0 ? (
                <p className="text-muted-foreground">No groups</p>
              ) : (
                <>
                  {groups.data.map((group: any, index: number) => (
                    <Card
                      key={index}
                      className={`cursor-pointer transition-colors ${
                        selectedGroups.includes(group.id)
                          ? "border-indigo-500"
                          : ""
                      }`}
                      onClick={() => handleGroupSelect(group.id)}
                    >
                      <CardHeader className="p-4 flex flex-row items-center justify-between">
                        <div>
                          <h4 className="font-medium">{group.name}</h4>
                        </div>
                        {selectedGroups.includes(group.id) && (
                          <CheckCircle className="h-5 w-5 text-indigo-600" />
                        )}
                      </CardHeader>
                    </Card>
                  ))}
                </>
              )}
            </div>
          </div>
          <Separator orientation="vertical" className="hidden md:block" />
          <div className="w-full md:w-1/2 flex flex-col gap-2">
            <h3 className="text-lg font-medium">Groups Selected</h3>
            {selectedGroups.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  You've selected {selectedGroups.length} group(s) to assign
                  activities to
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedGroups.map((groupId: number) => (
                    <p key={groupId}>{groupId}</p>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Select groups from the left panel to assign activities
              </p>
            )}
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={selectedGroups.length === 0}
            onClick={() => handleAssignGroupToActivity(selectedGroups)}
          >
            Assign Activities
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
