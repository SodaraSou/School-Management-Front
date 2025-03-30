import Link from "next/link";
import { usePathname } from "next/navigation";

import { User, LogOut, Users, Notebook, BarChart3, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";

export default function DashboardMobileSidebar({ user }: { user: any }) {
  const pathname = usePathname();

  const teacherNavItems = [
    { href: "/dashboard", icon: BarChart3, label: "Dashboard" },
    { href: "/subject", icon: Users, label: "Subject" },
    { href: "/assignment", icon: Notebook, label: "Assignment" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  const studentNavItems = [
    { href: "/dashboard", icon: BarChart3, label: "Dashboard" },
    { href: "/group", icon: Users, label: "Group" },
    { href: "/assignment", icon: Notebook, label: "Assignment" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  const navItems =
    user.role[0] === "teacher" ? teacherNavItems : studentNavItems;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex md:hidden items-center"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center p-4">
            <Avatar className="w-16 h-16 mb-4">
              <AvatarImage alt={user.name || ""} />
              <AvatarFallback>
                {user!.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h2 className="font-bold">{user!.name}</h2>
            {/* <p className="text-sm text-gray-500">{student.program}</p> */}
          </div>
          <nav className="mt-6 space-y-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={`shadow-none my-1 w-full justify-start ${
                    pathname === item.href ? "bg-gray-100" : ""
                  }`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
          <div className="pt-6 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
