import Link from "next/link";
import { fetchTeacherGroups } from "@/app/v2/(dashboard)/@teacher/groups/services";
import { type BreadcrumbItem } from "@/types";

import { Search, Users, BookOpen, Calendar, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StudentLayout from "@/components/v2/student/layout/student-layout";
import { fetchStudentGroups } from "@/app/v2/(dashboard)/@student/groups/services";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Group",
    href: "/v2/groups",
  },
];

export default async function StudentGroups() {
  const result = await fetchStudentGroups();

  if (result.success === false) {
    throw new Error(result.message);
  }

  return (
    <StudentLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-col gap-6">
        <Card className="bg-indigo-600">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center text-white">
              My Groups
            </CardTitle>
          </CardHeader>
        </Card>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {result.data.map((group: any) => (
            <Card key={group.id}>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-indigo-900">
                  {group.name}
                </CardTitle>
                {/* <div className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center bg-white`}
                  >
                    {group.name.charAt(0)}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">
                      {group.name}
                    </CardTitle>
                    <CardDescription className="text-sm font-medium text-gray-700">
                      {group.subject}
                    </CardDescription>
                  </div>
                </div> */}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    <span className="font-medium text-gray-800">Year:</span>
                    <span>{group.year.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                    <span className="font-medium text-gray-800">
                      Academic Year:
                    </span>
                    <span>{group.academic_year.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-5 h-5 text-indigo-600" />
                    <span className="font-medium text-gray-800">Semester:</span>
                    <span>{group.semester.name}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/v2/groups/${group.id}`}
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
