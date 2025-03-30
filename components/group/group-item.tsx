// import Link from "next/link";
// import { Group } from "@/models/group";

// import { BookOpen, Calendar, GraduationCap } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardTitle,
//   CardFooter,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// export default function StudentGroupItem({ group }: { group: Group }) {
//   const getColor = (name: string) => {
//     const colors = [
//       "bg-gradient-to-br from-pink-500 to-orange-400",
//       "bg-gradient-to-br from-blue-500 to-cyan-400",
//       "bg-gradient-to-br from-purple-500 to-indigo-400",
//       "bg-gradient-to-br from-green-500 to-emerald-400",
//       "bg-gradient-to-br from-yellow-400 to-amber-500",
//     ];

//     const hash = name
//       .split("")
//       .reduce((acc, char) => acc + char.charCodeAt(0), 0);
//     return colors[hash % colors.length];
//   };

//   return (
//     <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
//       <div className={`${getColor(group.name)} p-6 text-white`}>
//         <CardTitle className="text-2xl font-bold mb-1">{group.name}</CardTitle>
//         <CardDescription className="text-white/90 font-medium">
//           Course Code:
//         </CardDescription>
//       </div>

//       <CardContent className="pt-6">
//         <div className="space-y-4">
//           <div className="grid grid-cols-1 gap-3">
//             <div className="flex items-center gap-2">
//               <Calendar className="h-5 w-5 text-gray-500" />
//               <p className="text-sm">
//                 Academic Year:{" "}
//                 <span className="font-medium">{group.academic_year}</span>
//               </p>
//             </div>
//             <div className="flex items-center gap-2">
//               <BookOpen className="h-5 w-5 text-gray-500" />
//               <p className="text-sm">
//                 Year: <span className="font-medium">{group.year}</span> •
//                 Semester: <span className="font-medium">{group.semester}</span>
//               </p>
//             </div>
//             <div className="flex items-center gap-2">
//               <GraduationCap className="h-5 w-5 text-gray-500" />
//               <p className="text-sm">Students: </p>
//             </div>
//           </div>
//         </div>
//       </CardContent>

//       <CardFooter className="pb-6">
//         <Button
//           className={`w-full ${getColor(
//             group.name
//           )} border-none hover:opacity-90 transition-opacity`}
//           asChild
//         >
//           <Link href={`/group/${group.id}`}>Go To Group</Link>
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
import Link from "next/link";
import { Group } from "@/models/group";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Users,
  ChevronRight,
  Bell,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function StudentGroupItem({ group }: { group: Group }) {
  const getColorScheme = (name: string) => {
    const colors = [
      {
        gradient: "bg-gradient-to-r from-violet-600 to-indigo-600",
        light: "bg-violet-50 text-violet-700 border-violet-200",
        accent: "text-violet-600",
        badge: "bg-violet-100 text-violet-800 border-violet-200",
        hover: "hover:bg-violet-700",
        muted: "text-violet-200",
      },
      {
        gradient: "bg-gradient-to-r from-blue-600 to-cyan-500",
        light: "bg-blue-50 text-blue-700 border-blue-200",
        accent: "text-blue-600",
        badge: "bg-blue-100 text-blue-800 border-blue-200",
        hover: "hover:bg-blue-700",
        muted: "text-blue-200",
      },
      {
        gradient: "bg-gradient-to-r from-emerald-600 to-teal-500",
        light: "bg-emerald-50 text-emerald-700 border-emerald-200",
        accent: "text-emerald-600",
        badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
        hover: "hover:bg-emerald-700",
        muted: "text-emerald-200",
      },
      {
        gradient: "bg-gradient-to-r from-orange-500 to-amber-500",
        light: "bg-orange-50 text-orange-700 border-orange-200",
        accent: "text-orange-600",
        badge: "bg-orange-100 text-orange-800 border-orange-200",
        hover: "hover:bg-orange-600",
        muted: "text-orange-200",
      },
      {
        gradient: "bg-gradient-to-r from-pink-600 to-rose-500",
        light: "bg-pink-50 text-pink-700 border-pink-200",
        accent: "text-pink-600",
        badge: "bg-pink-100 text-pink-800 border-pink-200",
        hover: "hover:bg-pink-700",
        muted: "text-pink-200",
      },
    ];

    const hash = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const colorScheme = getColorScheme(group.name);
  // const studentCount = group.students?.length || 0;
  const subjectCount = group.subjects?.length || 0;

  // Generate avatars for visual representation
  const generateAvatarLetters = () => {
    const letters = group.name.match(/\b(\w)/g);
    return letters ? letters.join("").substring(0, 2).toUpperCase() : "GP";
  };

  return (
    <Card className="overflow-hidden border shadow-md hover:shadow-lg transition-all duration-300 flex flex-col">
      <CardHeader className={`${colorScheme.gradient} text-white p-6`}>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Badge className="bg-white/20 hover:bg-white/30 border-0 text-white">
              {group.year && group.semester
                ? `Year ${group.year} - Semester ${group.semester}`
                : "Current Group"}
            </Badge>
            <CardTitle className="text-2xl font-bold">{group.name}</CardTitle>
          </div>

          <Avatar className="h-14 w-14 rounded-lg bg-white/20 border-2 border-white/30">
            <AvatarFallback className="bg-transparent text-white text-xl font-bold">
              {generateAvatarLetters()}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <p className="text-sm">{subjectCount} Subjects</p>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {/* <p className="text-sm">{studentCount} Students</p> */}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 flex-grow">
        <div className="space-y-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className={`rounded-full p-2 ${colorScheme.light}`}>
                <Calendar className={`h-4 w-4 ${colorScheme.accent}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Academic Year</p>
                <p className="font-medium">{group.academic_year}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className={`rounded-full p-2 ${colorScheme.light}`}>
                <GraduationCap className={`h-4 w-4 ${colorScheme.accent}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Education Level</p>
                {/* <p className="font-medium">{group.education_level || "Bachelor's Degree"}</p> */}
              </div>
            </div>

            {group.department && (
              <div className="flex items-center gap-2">
                <div className={`rounded-full p-2 ${colorScheme.light}`}>
                  <BookOpen className={`h-4 w-4 ${colorScheme.accent}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  {/* <p className="font-medium">{group.department}</p> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 border-t border-gray-100">
        <div className="w-full flex items-center justify-between">
          <Link
            href={`/group/${group.id}/subjects`}
            className={`text-sm ${colorScheme.accent} font-medium hover:underline flex items-center gap-1`}
          >
            View Subjects <ChevronRight className="h-3.5 w-3.5" />
          </Link>

          <Button
            className={`${colorScheme.gradient} text-white ${colorScheme.hover}`}
            asChild
          >
            <Link
              href={`/group/${group.id}`}
              className="flex items-center gap-1"
            >
              Go To Group <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
