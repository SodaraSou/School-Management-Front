import { type BreadcrumbItem } from "@/types";
import StudentLayout from "@/components/v2/student/layout/student-layout";
import { fetchStudentGroupById } from "@/app/v2/(dashboard)/@student/groups/services";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type Subject = {
  id: number;
  department_id: number;
  name: string;
  abbr: string;
  created_at: string;
  updated_at: string;
  pivot: {
    group_id: number;
    subject_id: number;
    pass_score: number | null;
  };
};

export default async function StudentGroupById({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Groups", href: "/v2/groups" },
    { title: id, href: `/v2/groups/${id}` },
  ];

  const result = await fetchStudentGroupById(id);

  if (result.success === false) {
    throw new Error(result.message);
  }

  const subjects = result.data as Subject[];

  console.log(result);

  return (
    <StudentLayout breadcrumbs={breadcrumbs}>
      <>
        <header className="bg-indigo-600 py-10 shadow rounded-xl">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white">Group {id}</h1>
            <p className="mt-2 text-lg text-indigo-100">
              Your subjects overview
            </p>
          </div>
        </header>
        <main>
          {subjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow">
              <h2 className="text-2xl font-medium text-gray-800">
                No subjects found
              </h2>
              <p className="text-gray-600 mt-2">
                This group doesn't have any subjects yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {subjects.map((subject) => (
                <Card
                  key={subject.id}
                  className="border rounded-xl shadow-lg transform hover:-translate-y-1 transition duration-300 bg-white"
                >
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-indigo-900">
                      {subject.name}
                    </CardTitle>
                  </CardHeader>
                  {/* <CardContent>
                    {subject.pivot.pass_score && (
                      <p className="text-sm text-gray-600">
                        Pass Score:{" "}
                        <span className="font-medium text-gray-800">
                          {subject.pivot.pass_score}
                        </span>
                      </p>
                    )}
                  </CardContent> */}
                  <CardFooter>
                    <Link
                      href={`/v2/groups/${id}/subjects/${subject.id}`}
                      className="inline-block text-indigo-600 font-semibold hover:text-indigo-800 text-sm underline transition-colors"
                    >
                      View Details →
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </main>
      </>
    </StudentLayout>
  );
}
