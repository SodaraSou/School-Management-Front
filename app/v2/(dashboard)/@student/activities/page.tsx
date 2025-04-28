import Link from "next/link";
import { type BreadcrumbItem } from "@/types";
import { fetchStudentsActivities } from "@/app/v2/(dashboard)/@student/activities/services";

import StudentLayout from "@/components/v2/student/layout/student-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Activities",
    href: "/v2/activities",
  },
];

export default async function StudentActivities() {
  const result = await fetchStudentsActivities();

  if (result.success === false) {
    throw new Error(result.message);
  }

  const activities = result.data;

  return (
    <StudentLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-col gap-6">
        <Card className="bg-indigo-600">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center text-white">
              My Activities
            </CardTitle>
          </CardHeader>
        </Card>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {activities.map((activity: any) => (
            <Card key={activity.id}>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-indigo-900">
                  {activity.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    <span className="font-medium text-gray-800">Due Date:</span>
                    <span>{new Date(activity.due_at).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <span className="font-medium text-gray-800">Duration:</span>
                    <span>{activity.duration} mins</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/v2/activities/${activity.id}`}
                  className="inline-block text-indigo-600 font-semibold hover:text-indigo-800 text-sm underline transition-colors"
                >
                  View Details →
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}
