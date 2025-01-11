import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getGroups } from "@/app/dashboard/student/actions";

import GroupList from "@/components/group-list";

export default async function StudentHomePage() {
  const token = (await cookies()).get("session")?.value;

  if (!token) {
    redirect("/sign-in");
  }

  const groups = await getGroups();
  return (
    <section className={"flex-1 p-4 lg:p-8"}>
      <h2 className="text-2xl font-bold mb-4">My Groups</h2>
      <GroupList groups={groups.data!} />
    </section>
  );
}
