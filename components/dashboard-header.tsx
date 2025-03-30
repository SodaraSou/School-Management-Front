import { BookOpen, Bell, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardMobileSidebar from "./dashboard-mobile-sidebar";

export default function DashboardHeader({ user }: { user: any }) {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold">EduConnect</span>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <DashboardMobileSidebar user={user} />
          {/* <Avatar className="h-8 w-8">
            <AvatarImage alt={user!.name || ""} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar> */}
        </div>
      </div>
    </header>
  );
}
