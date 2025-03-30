import { Group } from "@/models/group";

import GroupItem from "./group-item";

export default function GroupList({ groups }: { groups: Group[] }) {
  if (groups.length === 0) {
    return <div>No Group</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {groups.map((group: Group) => (
        <GroupItem key={group.id} group={group} />
      ))}
    </div>
  );
}
