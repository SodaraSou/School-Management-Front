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
      <Card className="bg-indigo-600 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {result.data.form.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-2">
              <Calendar />
              <span className="font-medium">Due At:</span>
              <span>
                {format(new Date(result.data.due_at), "dd-MM-yyyy HH:mm a")}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock />
              <span className="font-medium">Duration: </span>
              <span>{result.data.duration} min</span>
            </div>
            <div className="flex items-center space-x-2">
              <GraduationCap />
              <span className="font-medium">Points: </span>
              <span>{result.data.full_score}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>{result.data.form.title}</CardTitle>
            <CardDescription>{result.data.form.description}</CardDescription>
          </div>
          {result.data.is_submitted ? (
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled
            >
              Already Submitted
            </Button>
          ) : (
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              asChild
              disabled={result.data.is_submitted}
            >
              <Link href={`/v2/activities/${id}/form`}>Go to Form Page</Link>
            </Button>
          )}
        </CardHeader>
      </Card>
    </StudentLayout>
  );
}
