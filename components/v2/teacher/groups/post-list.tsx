import { Post } from "@/models/post";
import { MessageCircle } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import PostItem from "@/components/v2/teacher/groups/post-item";

export default function PostList({ posts }: { posts: any[] }) {
  if (posts.length === 0) {
    return (
      <Card className="text-center border-none shadow-none">
        <CardHeader>
          <MessageCircle className="h-12 w-12 mx-auto text-indigo-500" />
          <p className="text-indigo-500">No announcements yet</p>
        </CardHeader>
      </Card>
    );
  }

  console.log(posts);

  return (
    <div className="space-y-6">
      {posts.map((post: any, index) => (
        <PostItem key={post.id} post={post} isLatest={index === 0} />
      ))}
    </div>
  );
}
