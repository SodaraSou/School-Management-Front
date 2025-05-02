import { type BreadcrumbItem } from "@/types";
import { fetchTeacherProfile } from "@/app/v2/(dashboard)/@teacher/profile/service";

import {
  CalendarDays,
  GraduationCap,
  Mail,
  MapPin,
  School,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeacherLayout from "@/components/v2/teacher/layout/teacher-layout";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Profile",
    href: "/v2/profile",
  },
];

export default async function TeacherProfilePage() {
  const result = await fetchTeacherProfile();
  if (result.success === false) throw new Error(result.message);
  const profileData = result.data;

  console.log(profileData);

  return (
    <TeacherLayout breadcrumbs={breadcrumbs}>
      <div>
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage
                  src={profileData.image || "/placeholder.svg"}
                  alt={profileData.name}
                />
                <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xl">
                  {profileData.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {profileData.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{profileData.email}</span>
                </div>
                <Badge className="mt-2 bg-indigo-600 hover:bg-indigo-700">
                  Teacher ID: {profileData.id}
                </Badge>
              </div>
            </div>
          </div>

          <Tabs defaultValue="academic" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-indigo-100">
              <TabsTrigger
                value="academic"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                Teaching Info
              </TabsTrigger>
              <TabsTrigger
                value="personal"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                Personal Info
              </TabsTrigger>
            </TabsList>
            <TabsContent value="academic" className="mt-6 space-y-6">
              <Card className="overflow-hidden border-none shadow-md">
                <div className="h-2 bg-indigo-600" />
                <CardHeader className="bg-white pb-2">
                  <CardTitle className="flex items-center text-xl">
                    <GraduationCap className="mr-2 h-5 w-5 text-indigo-600" />
                    Teaching Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 bg-white pt-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-indigo-50 p-4">
                      <div className="mb-2 text-sm font-medium text-indigo-900">
                        Faculty
                      </div>
                      <div className="flex items-center gap-2">
                        <School className="h-4 w-4 text-indigo-600" />
                        <span className="font-semibold">
                          {profileData.faculty}
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-indigo-50 p-4">
                      <div className="mb-2 text-sm font-medium text-indigo-900">
                        Department
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-indigo-600" />
                        <span className="font-semibold">
                          {profileData.department}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="personal" className="mt-6">
              <Card className="overflow-hidden border-none shadow-md">
                <div className="h-2 bg-indigo-600" />
                <CardHeader className="bg-white pb-2">
                  <CardTitle className="flex items-center text-xl">
                    <User className="mr-2 h-5 w-5 text-indigo-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 bg-white pt-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-indigo-50 p-4">
                      <div className="mb-2 text-sm font-medium text-indigo-900">
                        Full Name
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-indigo-600" />
                        <span className="font-semibold">
                          {profileData.name}
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-indigo-50 p-4">
                      <div className="mb-2 text-sm font-medium text-indigo-900">
                        Email Address
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-indigo-600" />
                        <span className="font-semibold">
                          {profileData.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-indigo-200 shadow-lg">
                      <img
                        src={profileData.image || "/placeholder.svg"}
                        alt={profileData.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TeacherLayout>
  );
}
