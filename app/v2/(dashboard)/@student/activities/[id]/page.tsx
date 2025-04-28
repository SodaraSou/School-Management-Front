import { fetchStudentsActivityById } from "@/app/v2/(dashboard)/@student/activities/services";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StudentLayout from "@/components/v2/student/layout/student-layout";
import { format } from "date-fns";
import { Calendar, Clock, GraduationCap } from "lucide-react";
import Link from "next/link";

export default async function StudentActivitiesShowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await fetchStudentsActivityById(id);

  if (result.success === false) {
    throw new Error(result.message);
  }

  return (
    <StudentLayout>
      <Card className="border-l-4 border-l-indigo-500">
        <CardHeader>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-extrabold text-indigo-600">
              {result.data.form.title}
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-100 p-2 rounded-full">
                <Calendar className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Due Date</p>
                <p className="font-medium">
                  {format(new Date(result.data.due_at), "yyyy-MM-dd HH:mm")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-indigo-100 p-2 rounded-full">
                <Clock className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{result.data.duration} min</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-indigo-100 p-2 rounded-full">
                <GraduationCap className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Points</p>
                <p className="font-medium">{result.data.full_score}</p>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row justify-between items-center bg-indigo-600">
          <CardTitle className="text-2xl font-semibold text-white">
            {result.data.form.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-6">
          <div className="flex justify-between items-center">
            <p>{result.data.form.description}</p>
            {result.data.is_submitted ? (
              <Button
                className="bg-gray-400 text-white cursor-not-allowed"
                disabled
              >
                Already Submitted
              </Button>
            ) : (
              <Button
                className="text-white px-4 py-2 rounded-lg"
                asChild
                disabled={result.data.is_submitted}
              >
                <Link href={`/v2/activities/${id}/form`}>Go to Form Page</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </StudentLayout>
  );
}
