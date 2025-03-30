"use client";

import { use } from "react";
import { useUser } from "@/contexts/user-context";
import { format } from "date-fns";
import { Post } from "@/models/post";

import {
  EllipsisVertical,
  Star,
  Calendar,
  Clock,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PostDeleteDialog from "./post-delete-dialog";
import PostEditDialog from "./post-edit-dialog";

export default function PostItem({
  post,
  isLatest = false,
}: {
  post: Post;
  isLatest?: boolean;
}) {
  const { userPromise } = useUser();
  const user = use(userPromise);

  // Generate a consistent color based on user name
  const getUserColor = (name: string) => {
    const colors = [
      "bg-blue-100 text-blue-600 border-blue-200",
      "bg-purple-100 text-purple-600 border-purple-200",
      "bg-pink-100 text-pink-600 border-pink-200",
      "bg-emerald-100 text-emerald-600 border-emerald-200",
      "bg-amber-100 text-amber-600 border-amber-200",
      "bg-cyan-100 text-cyan-600 border-cyan-200",
    ];

    const hash = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const userColorClass = getUserColor(post.user.name);
  const randomGradient = `bg-gradient-to-r ${userColorClass
    .split(" ")[0]
    .replace("100", "50")} ${userColorClass
    .split(" ")[0]
    .replace("100", "100")}`;

  // Format date nicely
  const postDate = new Date(post.created_at);
  const formattedDate = format(postDate, "MMM d, yyyy");
  const formattedTime = format(postDate, "h:mm a");

  // Check if post is recent (within last 24 hours)
  const isRecent =
    new Date().getTime() - postDate.getTime() < 24 * 60 * 60 * 1000;

  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-md border ${
        isLatest ? "border-l-4 border-l-blue-500" : "border-gray-200"
      }`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Avatar
              className={`cursor-pointer size-10 ring-2 ${userColorClass
                .split(" ")[1]
                .replace("600", "400")}`}
            >
              <AvatarImage alt={post.user.name || ""} />
              <AvatarFallback className={userColorClass}>
                {post.user.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="font-normal">
              <div className="flex items-center">
                <h5 className="text-lg font-semibold">{post.user.name}</h5>
                {isLatest && (
                  <div className="ml-2 flex items-center px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600">
                    <Star className="h-3 w-3 mr-1" /> Latest
                  </div>
                )}
                {isRecent && !isLatest && (
                  <div className="ml-2 flex items-center px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-600">
                    New
                  </div>
                )}
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                <span className="mr-3">{formattedDate}</span>
                <Clock className="h-3 w-3 mr-1" />
                <span>{formattedTime}</span>
              </div>
            </div>
          </div>
          {user?.role[0] === "teacher" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <EllipsisVertical />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-auto p-0">
                <div className="flex flex-col">
                  <PostEditDialog />
                  <PostDeleteDialog />
                </div>
              </PopoverContent>
            </Popover>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        {post.caption.split("\n").map((paragraph, index) => (
          <p key={index} className={index > 0 ? "mt-4" : ""}>
            {paragraph}
          </p>
        ))}
      </CardContent>

      {/* <CardFooter
        className={`flex justify-between items-center text-sm text-gray-500 border-t mt-4 py-3 ${randomGradient} bg-opacity-20`}
      >
        <div className="flex items-center">
          <MessageSquare className="h-4 w-4 mr-1" />
          <span>{post.comments?.length || 0} comments</span>
        </div>
        {post.attachments && post.attachments.length > 0 && (
          <div className="flex items-center">
            <span className="bg-white px-2 py-1 rounded-full text-xs border">
              {post.attachments.length} attachment
              {post.attachments.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}
      </CardFooter> */}
    </Card>
  );
}
