// import { fetchStudentGroup } from "@/services/group";

// import { Clock, Shapes } from "lucide-react";
// import StudentGroupList from "@/components/group/group-list";

// export default async function GroupIndexPage() {
//   const res = await fetchStudentGroup();

//   if (!res.success) {
//     throw new Error(res.message);
//   }

//   return (
//     <section className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold flex items-center">
//           <Shapes className="h-6 w-6 text-yellow-500 mr-2" />
//           My Group
//         </h1>
//         <div className="text-sm bg-white rounded-full px-3 py-1 shadow-sm border flex items-center">
//           <Clock className="h-4 w-4 inline mr-1 text-blue-500" />
//           Tuesday, March 4, 2025
//         </div>
//       </div>
//       <StudentGroupList groups={res.data} />
//     </section>
//   );
// }

import { fetchStudentGroup } from "@/services/group";
import { 
  Shapes, Clock, Search, Filter, BookOpen, 
  Users, Briefcase, Calendar, ChevronRight 
} from "lucide-react";
import StudentGroupList from "@/components/group/group-list";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default async function GroupIndexPage() {
  const res = await fetchStudentGroup();

  if (!res.success) {
    throw new Error(res.message);
  }

  // Extract stats from the data
  const totalGroups = res.data.length;
  const totalSubjects = res.data.reduce((acc, group) => acc + (group.subjects?.length || 0), 0);
  const currentSemester = "Spring 2025"; // This would come from your data

  // Format date for header
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <section className="space-y-8">
      {/* Header with date and page title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 font-normal">
              <Clock className="h-3 w-3 mr-1" />
              {formattedDate}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-normal">
              {currentSemester}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold flex items-center">
            <Shapes className="h-7 w-7 text-yellow-500 mr-3" />
            My Groups
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Academic Calendar
          </Button>
          <Button variant="default" size="sm" className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700">
            <ChevronRight className="h-4 w-4 mr-1" />
            Go To Latest Group
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-100">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 bg-yellow-500 rounded-full flex items-center justify-center">
              <Shapes className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-yellow-700">Total Groups</p>
              <p className="text-2xl font-bold">{totalGroups}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-700">Total Subjects</p>
              <p className="text-2xl font-bold">{totalSubjects}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-green-700">Current Activities</p>
              <p className="text-2xl font-bold">
                {res.data.reduce((acc, group) => acc + (group.activities?.length || 0), 0)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search groups..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Academic Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2024-2025">2024-2025</SelectItem>
                  <SelectItem value="2023-2024">2023-2024</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Group Categories */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Groups</TabsTrigger>
          <TabsTrigger value="current">Current Semester</TabsTrigger>
          <TabsTrigger value="past">Past Groups</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <StudentGroupList groups={res.data} />
        </TabsContent>
        
        <TabsContent value="current" className="mt-0">
          <StudentGroupList groups={res.data.filter(group => 
            group.academic_year === "2024-2025" && group.semester === "2")} 
          />
        </TabsContent>
        
        <TabsContent value="past" className="mt-0">
          <StudentGroupList groups={res.data.filter(group => 
            group.academic_year === "2023-2024")} 
          />
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-0">
          {/* This would be populated based on your actual data */}
          <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-gray-600">No Upcoming Groups</h3>
            <p className="text-gray-500 mt-1">You don't have any upcoming groups scheduled yet.</p>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}