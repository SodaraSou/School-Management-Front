"use client";

import { use } from "react";
import { useUser } from "@/contexts/user-context";

import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard-header";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userPromise } = useUser();
  const user = use(userPromise);

  const courses = [
    {
      id: 1,
      name: "Introduction to Programming",
      code: "CS101",
      progress: 65,
      instructor: "Dr. Sarah Chen",
    },
    {
      id: 2,
      name: "Data Structures",
      code: "CS201",
      progress: 78,
      instructor: "Prof. Michael Williams",
    },
    {
      id: 3,
      name: "Web Development",
      code: "CS301",
      progress: 42,
      instructor: "Dr. James Rodriguez",
    },
    {
      id: 4,
      name: "Machine Learning",
      code: "CS401",
      progress: 90,
      instructor: "Prof. Emma Garcia",
    },
  ];

  const upcomingAssignments = [
    {
      id: 1,
      title: "Programming Exercise #5",
      course: "CS101",
      due: "Tomorrow, 11:59 PM",
      status: "Not started",
    },
    {
      id: 2,
      title: "Group Project Milestone",
      course: "CS301",
      due: "Mar 07, 11:59 PM",
      status: "In progress",
    },
    {
      id: 3,
      title: "Data Analysis Report",
      course: "CS401",
      due: "Mar 10, 11:59 PM",
      status: "Not started",
    },
  ];

  const recentGrades = [
    {
      id: 1,
      title: "Programming Quiz #3",
      course: "CS101",
      grade: "92/100",
      submitted: "Feb 28, 2025",
    },
    {
      id: 2,
      title: "Data Structures Assignment",
      course: "CS201",
      grade: "85/100",
      submitted: "Feb 25, 2025",
    },
    {
      id: 3,
      title: "Web Development Lab",
      course: "CS301",
      grade: "78/100",
      submitted: "Feb 20, 2025",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />
      <div className="flex">
        <DashboardSidebar user={user} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
