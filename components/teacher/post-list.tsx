import { Post } from "@/models/post";
import PostItem from "./post-item";
import { MessageCircle } from "lucide-react";

export default function PostList({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <MessageCircle className="h-12 w-12 mx-auto text-gray-300 mb-3" />
        <p className="text-gray-500">No announcements yet</p>
        <p className="text-sm text-gray-400 mt-2">
          Check back later for updates
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post: Post, index) => (
        <PostItem key={post.id} post={post} isLatest={index === 0} />
      ))}
    </div>
  );
}
