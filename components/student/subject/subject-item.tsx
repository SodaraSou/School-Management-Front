// import Link from "next/link";

// import { BookOpen, User } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export default function StudentSubjectItem({ subject }: { subject: any }) {
//   const getSubjectColor = (name: string) => {
//     const colors = [
//       "bg-gradient-to-r from-purple-500 to-indigo-400",
//       "bg-gradient-to-r from-blue-500 to-cyan-400",
//       "bg-gradient-to-r from-emerald-500 to-green-400",
//       "bg-gradient-to-r from-orange-500 to-amber-400",
//       "bg-gradient-to-r from-pink-500 to-rose-400",
//     ];

//     // Simple hash function to pick a color based on string
//     const hash = name
//       .split("")
//       .reduce((acc, char) => acc + char.charCodeAt(0), 0);
//     return colors[hash % colors.length];
//   };

//   // Get a contrasting light text color for our gradient backgrounds
//   const textColorClass = "text-white";
//   const subjectColor = getSubjectColor(subject.name);
//   return (
//     <Card className="overflow-hidden transition-all hover:shadow-lg border-none shadow-md">
//       <CardHeader className={`${subjectColor}`}>
//         <CardTitle className={`text-xl font-bold ${textColorClass}`}>
//           <Link
//             href={{
//               pathname: `/subject/${subject.id}`,
//               query: {
//                 groupId: subject.group.id,
//               },
//             }}
//             className="hover:underline flex items-center gap-2"
//           >
//             <BookOpen className="h-5 w-5" />
//             {subject.name}
//           </Link>
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="p-4 bg-white">
//         <div className="flex items-center gap-2">
//           <User className="h-5 w-5 text-gray-500" />
//           <p className="text-sm font-medium">{subject.teacher.name}</p>
//         </div>

//         {/* Optional additional info if available */}
//         {subject.nextClass && (
//           <div className="mt-3 pt-3 border-t border-gray-100">
//             <p className="text-xs text-gray-500">
//               Next class: {subject.nextClass}
//             </p>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }
import Link from "next/link";
import { BookOpen, User, Clock, Calendar, BarChart } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export default function StudentSubjectItem({ subject }: { subject: any }) {
  const getSubjectColor = (name: string) => {
    const colors = [
      {
        gradient: "bg-gradient-to-r from-violet-600 to-indigo-600",
        light: "bg-violet-100 text-violet-800",
        dark: "bg-violet-600",
        text: "text-violet-600",
      },
      {
        gradient: "bg-gradient-to-r from-blue-600 to-cyan-500",
        light: "bg-blue-100 text-blue-800",
        dark: "bg-blue-600",
        text: "text-blue-600",
      },
      {
        gradient: "bg-gradient-to-r from-emerald-600 to-teal-500",
        light: "bg-emerald-100 text-emerald-800",
        dark: "bg-emerald-600",
        text: "text-emerald-600",
      },
      {
        gradient: "bg-gradient-to-r from-orange-500 to-amber-500",
        light: "bg-orange-100 text-orange-800",
        dark: "bg-orange-500",
        text: "text-orange-500",
      },
      {
        gradient: "bg-gradient-to-r from-pink-600 to-rose-500",
        light: "bg-pink-100 text-pink-800",
        dark: "bg-pink-600",
        text: "text-pink-600",
      },
    ];

    // Simple hash function to pick a color based on string
    const hash = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const colorScheme = getSubjectColor(subject.name);
  const progress = subject.progress || Math.floor(Math.random() * 100); // Fallback for demo

  // Extract semester and year info from subject.group if available
  // const semesterInfo = subject.group?.semester
  //   ? `Semester ${subject.group.semester}`
  //   : "Current Semester";

  // Mockup upcoming deadline
  const hasUpcomingDeadline = subject.activities?.length > 0;
  const upcomingDeadline = hasUpcomingDeadline ? subject.activities[0] : null;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-xl border-none shadow-md group">
      {/* Top colored stripe */}
      <div className={`h-2 w-full ${colorScheme.gradient}`}></div>

      <CardHeader className="pt-5 pb-2">
        {/* Subject code badge */}
        <div className="flex justify-between items-start mb-1">
          <Badge variant="outline" className={`${colorScheme.light} border-0`}>
            {subject.code || "CS101"}
          </Badge>
          {/* <Badge
            variant="outline"
            className="bg-gray-100 text-gray-700 border-0"
          >
            {semesterInfo}
          </Badge> */}
        </div>

        {/* Subject title with icon */}
        <Link
          href={{
            pathname: `/subject/${subject.id}`,
            query: {
              groupId: subject.group.id,
            },
          }}
          className="group-hover:underline"
        >
          <div className="flex items-start gap-3 mt-2">
            <div className={`rounded-full p-2 ${colorScheme.light}`}>
              <BookOpen className={`h-4 w-4 ${colorScheme.text}`} />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">
                {subject.name}
              </h3>
              <p className="text-sm text-gray-500">
                {subject.group.name || "Group A"}
              </p>
            </div>
          </div>
        </Link>
      </CardHeader>

      <CardContent className="px-6 py-3">
        {/* Teacher info with avatar */}
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            {subject.teacher?.avatar ? (
              <AvatarImage
                src={subject.teacher.avatar}
                alt={subject.teacher.name}
              />
            ) : (
              <AvatarFallback className={colorScheme.gradient}>
                {subject.teacher.name.charAt(0)}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="text-sm font-medium">{subject.teacher.name}</p>
            <p className="text-xs text-gray-500">Instructor</p>
          </div>
        </div>

        {/* Schedule row - if available */}
        {/* {subject.schedule && (
          <div className="flex items-center gap-3 mt-4">
            <div
              className={`h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center`}
            >
              <Clock className="h-4 w-4 text-gray-500" />
            </div>
            <p className="text-sm">{subject.schedule}</p>
          </div>
        )} */}

        {/* Course progress bar */}
        {/* <div className="mt-5 space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <BarChart className="h-3 w-3" /> Course Progress
            </p>
            <span className="text-xs font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-1.5" 
            indicatorClassName={colorScheme.dark} />
        </div> */}

        {/* Upcoming deadline - if available */}
        {/* {hasUpcomingDeadline && (
          <div className="mt-5 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 flex items-center gap-1 mb-1.5">
              <Calendar className="h-3 w-3" /> Next Deadline
            </p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium truncate max-w-[70%]">
                {upcomingDeadline.title}
              </p>
              <Badge
                variant="outline"
                className={`${colorScheme.light} border-0 text-xs`}
              >
                {upcomingDeadline.due_date || "Upcoming"}
              </Badge>
            </div>
          </div>
        )} */}
      </CardContent>

      <CardFooter className="px-6 py-3 bg-gray-50 flex justify-between">
        {/* <Link
          href={{
            pathname: `/subject/${subject.id}`,
            query: {
              groupId: subject.group.id,
              tab: "assignments",
            },
          }}
          className="text-xs text-gray-600 hover:text-gray-900 hover:underline"
        >
          View Assignments
        </Link> */}

        <Link
          href={{
            pathname: `/subject/${subject.id}`,
            query: {
              groupId: subject.group.id,
            },
          }}
          className={`text-xs ${colorScheme.text} font-medium hover:underline ml-auto`}
        >
          Open Course →
        </Link>
      </CardFooter>
    </Card>
  );
}
