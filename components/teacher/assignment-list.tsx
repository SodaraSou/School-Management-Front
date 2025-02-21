import { fetchActivities } from "@/services/activity";

import AssignmentItem from "../assignment-item";

export default async function AssignmentList({ groupId }: { groupId: string }) {
  const res = await fetchActivities(groupId);

  if (!res.success) {
    throw new Error(res.message);
  }

  return (
    <div className="flex flex-col gap-4">
      {res.data.map((activity: any) => (
        <AssignmentItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
