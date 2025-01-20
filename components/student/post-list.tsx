import { Post } from "@/models/post";
import PostItem from "./post-item";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <>
      {posts.map((post: Post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </>
  );
}
