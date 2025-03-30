import { fetchActivities } from "@/services/activity";

import AssignmentItem from "../assignment-item";
import { MessageCircle } from "lucide-react";

export default async function AssignmentList({ groupId }: { groupId: string }) {
  const res = await fetchActivities(groupId);

  if (!res.success) {
    throw new Error(res.message);
  }

  if (!res.data || res.data.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <MessageCircle className="h-12 w-12 mx-auto text-gray-300 mb-3" />
        <p className="text-gray-500">No activities yet</p>
        <p className="text-sm text-gray-400 mt-2">
          Check back later for updates
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {res.data.map((activity: any) => (
        <AssignmentItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
