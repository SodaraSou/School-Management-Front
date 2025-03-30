"use client";

import { useState } from "react";
import {
  Home,
  Calendar,
  BookOpen,
  GraduationCap,
  LineChart,
  Bell,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      icon: <Home className="w-5 h-5" />,
      label: "Dashboard",
      href: "/v2/student",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Schedule",
      href: "/v2/student/schedule",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      label: "Courses",
      href: "/v2/student/courses",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <LineChart className="w-5 h-5" />,
      label: "Grades",
      href: "/v2/student/grades",
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      label: "Profile",
      href: "/v2/student/profile",
      color: "bg-rose-100 text-rose-600",
    },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar - desktop */}
      <div
        className={`hidden md:flex flex-col bg-white border-r transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          {!collapsed && (
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Learning Space
            </h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-slate-500 hover:bg-slate-100 rounded-full"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-6 flex-1">
          <ul className="space-y-2 px-2">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <li key={index}>
                  <Link href={item.href}>
                    <div
                      className={`flex items-center p-3 rounded-xl transition-colors ${
                        isActive
                          ? item.color
                          : "hover:bg-slate-100 text-slate-600"
                      }`}
                    >
                      <div
                        className={`${
                          !isActive && "bg-slate-100"
                        } p-2 rounded-lg`}
                      >
                        {item.icon}
                      </div>
                      {!collapsed && (
                        <span className="ml-3 font-medium">{item.label}</span>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {!collapsed && (
          <div className="p-4 border-t mt-auto">
            <div className="flex items-center space-x-3">
              <Avatar className="border-2 border-blue-100">
                <AvatarFallback className="bg-blue-600 text-white">
                  JD
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">John Doe</p>
                <p className="text-xs text-slate-500">Student</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              {/* Mobile menu trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden rounded-full">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <div className="p-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white">
                    <h2 className="text-xl font-bold">Learning Space</h2>
                  </div>
                  <nav className="mt-6">
                    <ul className="space-y-2 px-2">
                      {menuItems.map((item, index) => {
                        const isActive = pathname === item.href;
                        return (
                          <li key={index}>
                            <Link href={item.href}>
                              <div
                                className={`flex items-center p-3 rounded-xl transition-colors ${
                                  isActive
                                    ? item.color
                                    : "hover:bg-slate-100 text-slate-600"
                                }`}
                              >
                                <div className="p-2 rounded-lg">{item.icon}</div>
                                <span className="ml-3 font-medium">{item.label}</span>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </SheetContent>
              </Sheet>
              <h1 className="text-xl font-medium text-slate-800">
                {pathname === "/v2/student" ? "My Dashboard" : 
                 menuItems.find(item => item.href === pathname)?.label || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full text-slate-600 hover:bg-slate-100">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar className="border-2 border-blue-100 md:hidden">
                <AvatarFallback className="bg-blue-600 text-white">
                  JD
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-5 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}
