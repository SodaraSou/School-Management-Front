import { getGroupSubjectById } from "@/app/(user)/student/group/actions";

export default async function ShowGroupSubjectPage({
  params,
}: {
  params: Promise<{ id: string; subject_id: string }>;
}) {
  const { id, subject_id } = await params;
  const res = await getGroupSubjectById(id, subject_id);

  if (!res.success) {
    throw new Error(res.message);
  }

  return <div className="container mx-auto px-4 py-6 space-y-4"></div>;
}
