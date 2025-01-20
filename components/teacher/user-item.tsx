import React from "react";
import { User } from "@/models/user";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserItem({ user }: { user: User }) {
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
              <h4 className="text-xl font-semibold">{user.name}</h4>
              <p>{user.role[0]}</p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
