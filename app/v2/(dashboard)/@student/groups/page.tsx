import Link from "next/link";
import { fetchTeacherGroups } from "@/app/v2/(dashboard)/@teacher/groups/services";
import { type BreadcrumbItem } from "@/types";

import { Search, Users, BookOpen, Calendar } from "lucide-react";
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

  console.log(result);

  return (
    <StudentLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-col gap-6">
        <Card className="overflow-hidden">
          <CardHeader className="bg-indigo-100">
            <CardTitle className="text-4xl font-extrabold text-indigo-600">
              My Groups
            </CardTitle>
          </CardHeader>
        </Card>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {result.data.map((group: any) => (
            <Card key={group.id} className="overflow-hidden">
              <CardHeader className={`border-b bg-indigo-50`}>
                <CardTitle className="text-2xl font-bold text-indigo-700">
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
              <CardContent className="grid grid-cols-2 gap-4 p-6">
                <div className="flex flex-col items-center justify-center">
                  <Users className="w-5 h-5 mb-1 text-gray-700" />
                  <span className="text-sm text-gray-600">Students</span>
                  <span className="font-semibold text-gray-800">
                    {/* {group.total_students} */}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Calendar className="w-5 h-5 mb-1 text-gray-700" />
                  <span className="text-sm text-gray-600">Year</span>
                  <span className="font-semibold text-gray-800">
                    {group.year.name}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Users className="w-5 h-5 mb-1 text-gray-700" />
                  <span className="text-sm text-gray-600">Semester</span>
                  <span className="font-semibold text-gray-800">
                    {group.semester.name}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Calendar className="w-5 h-5 mb-1 text-gray-700" />
                  <span className="text-sm text-gray-600">School Year</span>
                  <span className="font-semibold text-gray-800">
                    {group.academic_year.name}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full border-indigo-200 hover:bg-indigo-50 hovernderline"
                  asChild
                >
                  <Link href={`/v2/groups/${group.id}`}>View Details</Link>
                </Button>
                {/* <Button
                  className="w-full ml-auto text-white bg-indigo-600 hover:bg-indigo-700"
                  asChild
                >
                  <Link href={`/v2/groups/${group.id}`}>View Details</Link>
                </Button> */}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}
