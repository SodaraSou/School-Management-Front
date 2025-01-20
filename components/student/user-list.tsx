import { User } from "@/models/user";
import UserItem from "./user-item";

export default function UserList({ users }: { users: any[] }) {
  if (users.length === 0) {
    return <div>No Users</div>;
  }

  return (
    <>
      {users.map((user: User) => (
        <UserItem key={user.id} user={user} />
      ))}
    </>
  );
}
