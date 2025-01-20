import { format } from "date-fns";

import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "@/models/post";

export default function PostItem({ post }: { post: Post }) {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="font-normal">
              <h5 className="text-lg">{post.user.name}</h5>
              <p className="text-sm">
                {format(new Date(post.created_at), "dd/MM/yyyy hh:mm a")}
              </p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{post.caption}</p>
      </CardContent>
    </Card>
  );
}
