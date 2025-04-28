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
import TeacherLayout from "@/components/v2/teacher/layout/teacher-layout";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Group",
    href: "/v2/groups",
  },
];

export default async function TeacherGroups() {
  const result = await fetchTeacherGroups();

  if (result.success === false) {
    throw new Error(result.message);
  }

  return (
    <TeacherLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-col gap-6">
        <Card className="bg-indigo-600">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold text-white">
              My Groups
            </CardTitle>
          </CardHeader>
        </Card>
        {/* <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="relative w-full md:w-72">
            <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
            <Input placeholder="Search groups..." className="pl-10" />
          </div>
          <div className="flex flex-wrap w-full gap-2 md:w-auto">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Groups</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Years</SelectLabel>
                    <SelectItem value="apple">Year 1</SelectItem>
                    <SelectItem value="banana">Year 2</SelectItem>
                    <SelectItem value="blueberry">Year 3</SelectItem>
                    <SelectItem value="grapes">Year 4</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div> */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {result.data.map((group: any) => (
            <Card
              key={group.id}
              className="border-l-4 border-l-indigo-500 overflow-hidden"
            >
              <CardHeader>
                <div className="mb-6">
                  <h1 className="text-2xl font-extrabold text-indigo-600">
                    {group.name}
                  </h1>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-2">
                    <div className="bg-indigo-100 p-2 rounded-full">
                      <Users className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Students</p>
                      <p className="font-medium">{group.total_students}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-indigo-100 p-2 rounded-full">
                      <Calendar className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Year</p>
                      <p className="font-medium">{group.year.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-indigo-100 p-2 rounded-full">
                      <Users className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Semester</p>
                      <p className="font-medium">{group.semester.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-indigo-100 p-2 rounded-full">
                      <Calendar className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">School Year</p>
                      <p className="font-medium">{group.academic_year.name}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardFooter>
                <Link
                  href={{
                    pathname: `/v2/groups/${group.id}`,
                    query: { subject_id: group.subject.id },
                  }}
                  className="inline-block text-indigo-600 font-semibold hover:text-indigo-800 text-sm underline transition-colors"
                >
                  View Details →
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </TeacherLayout>
  );
}
