import PostCreateForm from "@/components/v2/teacher/groups/post-create-form";
import PostList from "@/components/v2/teacher/groups/post-list";

export default function PostTab({
  groupId,
  subjectId,
  posts,
}: {
  groupId: string;
  subjectId: string;
  posts: any[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <PostCreateForm groupId={groupId} subjectId={subjectId} />
      <PostList posts={posts} />
    </div>
  );
}
