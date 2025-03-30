// import { fetchGroupSubjectData } from "@/services/subject";

// import { BookOpen, Users, Bell, FileText } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import PostList from "@/components/teacher/post-list";
// import UserList from "@/components/teacher/user-list";
// import AssignmentList from "@/components/teacher/assignment-list";

// export default async function StudentSubjectShowPage({
//   params,
//   searchParams,
// }: {
//   params: Promise<{ subjectId: string }>;
//   searchParams: Promise<{ groupId: string }>;
// }) {
//   const { subjectId } = await params;
//   const { groupId } = await searchParams;

//   const groupSubjectData = await fetchGroupSubjectData(groupId, subjectId);

//   if (!groupSubjectData?.success) {
//     throw new Error(groupSubjectData?.message);
//   }

//   const getSubjectThemeColor = (name: string) => {
//     const colors = [
//       "from-violet-600 to-indigo-600", // Purple-blue
//       "from-blue-600 to-cyan-500", // Blue-cyan
//       "from-emerald-600 to-teal-500", // Green
//       "from-orange-500 to-amber-500", // Orange
//       "from-pink-600 to-rose-500", // Pink
//     ];

//     const hash = name
//       .split("")
//       .reduce((acc, char) => acc + char.charCodeAt(0), 0);
//     return colors[hash % colors.length];
//   };

//   const themeColor = getSubjectThemeColor(groupSubjectData.data.name);
//   const tabsBgColor = `bg-gradient-to-r ${themeColor} text-white`;

//   return (
//     <section className="space-y-6">
//       <Card className="overflow-hidden border-none shadow-lg">
//         <div className={`bg-gradient-to-r ${themeColor} p-6`}>
//           <CardHeader className="p-0 pb-2">
//             <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
//               <BookOpen className="h-6 w-6" />
//               {groupSubjectData.data.name}
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-0 text-white/80">
//             <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-2">
//               <p className="flex items-center gap-1">
//                 <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
//                 Teacher:{" "}
//                 <b>{groupSubjectData.data.teacher?.name || "Not assigned"}</b>
//               </p>
//               {groupSubjectData.data.schedule && (
//                 <p className="flex items-center gap-1">
//                   <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
//                   Schedule: <b>{groupSubjectData.data.schedule}</b>
//                 </p>
//               )}
//               {groupSubjectData.data.users && (
//                 <p className="flex items-center gap-1">
//                   <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
//                   <b>{groupSubjectData.data.users.length}</b> Students
//                 </p>
//               )}
//             </div>
//           </CardContent>
//         </div>
//       </Card>
//       <div className="rounded-lg overflow-hidden shadow-md">
//         <Tabs defaultValue="announcement" className="w-full">
//           <TabsList
//             className={`w-full justify-start rounded-none ${tabsBgColor}`}
//           >
//             <TabsTrigger
//               value="announcement"
//               className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-t-lg data-[state=inactive]:text-white/70 data-[state=inactive]:hover:text-white/90 data-[state=inactive]:hover:bg-white/10 transition-all"
//             >
//               <Bell className="h-4 w-4 mr-2" />
//               Announcements
//             </TabsTrigger>
//             <TabsTrigger
//               value="assignments"
//               className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-t-lg data-[state=inactive]:text-white/70 data-[state=inactive]:hover:text-white/90 data-[state=inactive]:hover:bg-white/10 transition-all"
//             >
//               <FileText className="h-4 w-4 mr-2" />
//               Assignments
//             </TabsTrigger>
//             <TabsTrigger
//               value="people"
//               className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-t-lg data-[state=inactive]:text-white/70 data-[state=inactive]:hover:text-white/90 data-[state=inactive]:hover:bg-white/10 transition-all"
//             >
//               <Users className="h-4 w-4 mr-2" />
//               People
//             </TabsTrigger>
//           </TabsList>

//           <div className="bg-white p-4">
//             <TabsContent value="announcement" className="mt-0 pt-2">
//               <div className="space-y-4">
//                 <PostList posts={groupSubjectData.data.posts} />
//               </div>
//             </TabsContent>

//             <TabsContent value="assignments" className="mt-0 pt-2">
//               <div className="space-y-4">
//                 <AssignmentList groupId={groupId} />
//               </div>
//             </TabsContent>

//             <TabsContent value="people" className="mt-0 pt-2">
//               <div className="space-y-4">
//                 {groupSubjectData.data.users &&
//                 groupSubjectData.data.users.length > 0 ? (
//                   <UserList users={groupSubjectData.data.users} />
//                 ) : (
//                   <div className="text-center py-12 bg-gray-50 rounded-lg">
//                     <Users className="h-12 w-12 mx-auto text-gray-300 mb-3" />
//                     <p className="text-gray-500">No users in this class yet</p>
//                   </div>
//                 )}
//               </div>
//             </TabsContent>
//           </div>
//         </Tabs>
//       </div>
//     </section>
//   );
// }

import { fetchGroupSubjectData } from "@/services/subject";
import {
  BookOpen,
  Users,
  Bell,
  FileText,
  Calendar,
  Info,
  BarChart,
  Bookmark,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PostList from "@/components/teacher/post-list";
import UserList from "@/components/teacher/user-list";
import AssignmentList from "@/components/teacher/assignment-list";

export default async function StudentSubjectShowPage({
  params,
  searchParams,
}: {
  params: Promise<{ subjectId: string }>;
  searchParams: Promise<{ groupId: string }>;
}) {
  const { subjectId } = await params;
  const { groupId } = await searchParams;

  const groupSubjectData = await fetchGroupSubjectData(groupId, subjectId);

  if (!groupSubjectData?.success) {
    throw new Error(groupSubjectData?.message);
  }

  const getSubjectThemeColor = (name: string) => {
    const colors = [
      "from-violet-600 to-indigo-600", // Purple-blue
      "from-blue-600 to-cyan-500", // Blue-cyan
      "from-emerald-600 to-teal-500", // Green
      "from-orange-500 to-amber-500", // Orange
      "from-pink-600 to-rose-500", // Pink
    ];

    const hash = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const themeColor = getSubjectThemeColor(groupSubjectData.data.name);
  const bgGradient = `bg-gradient-to-r ${themeColor}`;

  // Extract upcoming assignments (this would need to be implemented)
  const upcomingAssignments =
    groupSubjectData.data.activities?.slice(0, 3) || [];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero Section */}
      <div className={`${bgGradient} rounded-xl overflow-hidden shadow-lg`}>
        <div className="p-8 md:p-10 text-white relative">
          <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">
                {groupSubjectData.data.code || "CS101"}
              </Badge>
              <div className="h-1.5 w-1.5 rounded-full bg-white/50"></div>
              <span className="text-white/80 text-sm">
                {groupSubjectData.data.academic_year || "2024-2025"}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3 mb-4">
              <BookOpen className="h-8 w-8" />
              {groupSubjectData.data.name}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-white/30">
                  {groupSubjectData.data.teacher?.avatar ? (
                    <AvatarImage src={groupSubjectData.data.teacher.avatar} />
                  ) : (
                    <AvatarFallback className="bg-white/20 text-white">
                      {groupSubjectData.data.teacher?.name?.charAt(0) || "T"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="text-white/70 text-sm">Instructor</p>
                  <p className="font-medium">
                    {groupSubjectData.data.teacher?.name || "Not assigned"}
                  </p>
                </div>
              </div>

              {groupSubjectData.data.schedule && (
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Schedule</p>
                    <p className="font-medium">
                      {groupSubjectData.data.schedule}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">Students</p>
                  <p className="font-medium">
                    {groupSubjectData.data.users?.length || 0} Enrolled
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="announcement" className="w-full">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="announcement" className="flex-1">
                <Bell className="h-4 w-4 mr-2" />
                Announcements
              </TabsTrigger>
              <TabsTrigger value="assignments" className="flex-1">
                <FileText className="h-4 w-4 mr-2" />
                Assignments
              </TabsTrigger>
              <TabsTrigger value="people" className="flex-1">
                <Users className="h-4 w-4 mr-2" />
                People
              </TabsTrigger>
            </TabsList>

            <div className="bg-white rounded-lg shadow-sm border p-1">
              <TabsContent value="announcement" className="mt-0">
                <div className="space-y-4 p-4">
                  <PostList posts={groupSubjectData.data.posts} />
                </div>
              </TabsContent>

              <TabsContent value="assignments" className="mt-0">
                <div className="space-y-4 p-4">
                  <AssignmentList groupId={groupId} />
                </div>
              </TabsContent>

              <TabsContent value="people" className="mt-0">
                <div className="space-y-4 p-4">
                  {groupSubjectData.data.users &&
                  groupSubjectData.data.users.length > 0 ? (
                    <UserList users={groupSubjectData.data.users} />
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <Users className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500">
                        No users in this class yet
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingAssignments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAssignments.map((assignment: any, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`h-10 w-10 rounded-full ${bgGradient} flex items-center justify-center text-white flex-shrink-0`}
                      >
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{assignment.title}</p>
                        <p className="text-sm text-gray-500">
                          Due {assignment.due_date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No upcoming deadlines</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Assignments
              </Button>
            </CardFooter>
          </Card>

          {/* Course Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-gray-500" />
                Course Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-8 w-8 rounded-md ${bgGradient} flex items-center justify-center text-white`}
                    >
                      <FileText className="h-4 w-4" />
                    </div>
                    <span>Syllabus</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Button>

              <Button variant="ghost" className="w-full justify-start">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-8 w-8 rounded-md ${bgGradient} flex items-center justify-center text-white`}
                    >
                      <Info className="h-4 w-4" />
                    </div>
                    <span>Course Information</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Button>

              <Button variant="ghost" className="w-full justify-start">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-8 w-8 rounded-md ${bgGradient} flex items-center justify-center text-white`}
                    >
                      <BarChart className="h-4 w-4" />
                    </div>
                    <span>My Progress</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
