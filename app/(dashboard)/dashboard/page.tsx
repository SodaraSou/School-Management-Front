import {
  FileText,
  CheckCircle,
  Clock,
  Award,
  Sparkles,
  BookMarked,
  Rocket,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Sparkles className="h-6 w-6 text-yellow-500 mr-2" />
          Dashboard
        </h1>
        <div className="text-sm bg-white rounded-full px-3 py-1 shadow-sm border flex items-center">
          <Clock className="h-4 w-4 inline mr-1 text-blue-500" />
          Tuesday, March 4, 2025
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="overflow-hidden border-t-4 border-t-blue-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle className="text-sm font-medium text-blue-700">
              Active Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              <BookMarked className="h-5 w-5 text-blue-500 mr-2" />
              {/* {courses.length} */}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-t-4 border-t-red-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2 bg-gradient-to-r from-red-50 to-red-100">
            <CardTitle className="text-sm font-medium text-red-700">
              Assignments Due
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              <FileText className="h-5 w-5 text-red-500 mr-2" />
              {/* {upcomingAssignments.length} */}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-t-4 border-t-green-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2 bg-gradient-to-r from-green-50 to-green-100">
            <CardTitle className="text-sm font-medium text-green-700">
              Average Grade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              <Award className="h-5 w-5 text-green-500 mr-2" />
              85%
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-t-4 border-t-purple-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-purple-100">
            <CardTitle className="text-sm font-medium text-purple-700">
              Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              <CheckCircle className="h-5 w-5 text-purple-500 mr-2" />
              92%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Assignments & Recent Grades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow bg-white">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 text-blue-600 mr-2" />
              Upcoming Assignments
            </CardTitle>
            <CardDescription>
              Assignments due in the next 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* {upcomingAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className={`flex justify-between rounded-lg p-3 ${assignment.color} border border-l-4 border-l-blue-500 hover:shadow-md transition-shadow`}
              >
                <div>
                  <h3 className="font-medium">{assignment.title}</h3>
                  <p className="text-sm text-gray-500">{assignment.course}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{assignment.due}</p>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                      assignment.status === "Not started"
                        ? "bg-red-200 text-red-800"
                        : assignment.status === "In progress"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {assignment.status}
                  </span>
                </div>
              </div>
            ))} */}
            </div>
          </CardContent>
          <CardFooter className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              View All Assignments
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow bg-white">
          <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 text-green-600 mr-2" />
              Recent Grades
            </CardTitle>
            <CardDescription>Your most recent submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* {recentGrades.map((grade) => (
              <div
                key={grade.id}
                className={`flex justify-between rounded-lg p-3 ${grade.color} border border-l-4 border-l-green-500 hover:shadow-md transition-shadow`}
              >
                <div>
                  <h3 className="font-medium">{grade.title}</h3>
                  <p className="text-sm text-gray-500">{grade.course}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{grade.grade}</p>
                  <p className="text-xs text-gray-500">
                    Submitted {grade.submitted}
                  </p>
                </div>
              </div>
            ))} */}
            </div>
          </CardContent>
          <CardFooter className="bg-gradient-to-r from-green-50 to-teal-50">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              View All Grades
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Course Progress */}
      <Card className="shadow-md hover:shadow-lg transition-shadow bg-white">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="flex items-center">
            <Rocket className="h-5 w-5 text-purple-600 mr-2" />
            Course Progress
          </CardTitle>
          <CardDescription>
            Track your progress across all courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* {courses.map((course) => (
            <div
              key={course.id}
              className="space-y-2 p-4 rounded-lg bg-white border hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between">
                <h3 className="font-medium flex items-center">
                  <div
                    className={`h-3 w-3 rounded-full ${course.color} mr-2`}
                  ></div>
                  {course.name}
                </h3>
                <p className="text-sm font-bold">
                  {course.progress}% Complete
                </p>
              </div>
              <Progress
                value={course.progress}
                className={`h-2 ${getProgressColor(course.progress)}`}
              />
              <p className="text-xs text-gray-500 italic">
                Instructor: {course.instructor}
              </p>
            </div>
          ))} */}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
