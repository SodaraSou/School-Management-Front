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
        <header className="flex items-center justify-between bg-indigo-100 p-6 rounded-lg">
          <div>
            <h1 className="text-4xl font-extrabold text-indigo-600 mb-2">
              My Groups
            </h1>
            <p className="text-lg text-gray-600">
              Quickly manage and view your group details.
            </p>
          </div>
        </header>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search groups..." className="pl-10" />
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-indigo-600" />
              {/* <select className="border rounded-md px-3 py-1 text-sm bg-white">
                <option value="">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Computer Science">Computer Science</option>
              </select> */}
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
              <Calendar className="h-4 w-4 text-indigo-600" />
              {/* <select className="border rounded-md px-3 py-1 text-sm bg-white">
                <option value="">All Years</option>
                <option value="Year 1">Year 1</option>
                <option value="Year 2">Year 2</option>
                <option value="Year 3">Year 3</option>
              </select> */}
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
              <CardContent className="p-6 grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center">
                  <Users className="h-5 w-5 text-gray-700 mb-1" />
                  <span className="text-sm text-gray-600">Students</span>
                  <span className="font-semibold text-gray-800">
                    {group.total_students}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Calendar className="h-5 w-5 text-gray-700 mb-1" />
                  <span className="text-sm text-gray-600">Year</span>
                  <span className="font-semibold text-gray-800">
                    {group.year}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Users className="h-5 w-5 text-gray-700 mb-1" />
                  <span className="text-sm text-gray-600">Semester</span>
                  <span className="font-semibold text-gray-800">
                    {group.semester}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Calendar className="h-5 w-5 text-gray-700 mb-1" />
                  <span className="text-sm text-gray-600">School Year</span>
                  <span className="font-semibold text-gray-800">
                    {group.school_year}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full border-indigo-200 hover:bg-indigo-50 hovernderline"
                  asChild
                >
                  <Link href={`/v2/groups/${group.id}`}>View Details →</Link>
                </Button>
                {/* <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white ml-auto"
                  asChild
                >
                  <Link href={`/v2/groups/${group.id}`}>View Details</Link>
                </Button> */}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </TeacherLayout>
  );
}
