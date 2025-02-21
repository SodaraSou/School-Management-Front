"use client";

import { use } from "react";
import { useUser } from "@/contexts/user-context";
import { format } from "date-fns";
import { Post } from "@/models/post";

import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PostDeleteDialog from "./post-delete-dialog";
import PostEditDialog from "./post-edit-dialog";

export default function PostItem({ post }: { post: Post }) {
  const { userPromise } = useUser();
  const user = use(userPromise);

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Avatar className="cursor-pointer size-9">
              <AvatarImage alt={user?.name || ""} />
              <AvatarFallback>
                {user?.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="font-normal">
              <h5 className="text-lg">{post.user.name}</h5>
              <p className="text-sm">
                {format(new Date(post.created_at), "dd/MM/yyyy hh:mm a")}
              </p>
            </div>
          </div>
          {user?.role[0] === "teacher" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
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
      <CardContent>
        <p>{post.caption}</p>
      </CardContent>
    </Card>
  );
}
