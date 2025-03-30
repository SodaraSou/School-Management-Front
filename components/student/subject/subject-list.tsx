import StudentSubjectItem from "./subject-item";
import { MessageCircle } from "lucide-react";

export default function StudentSubjectList({ subjects }: { subjects: any }) {
  if (!subjects || subjects.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <MessageCircle className="h-12 w-12 mx-auto text-gray-300 mb-3" />
        <p className="text-gray-500">No subjects yet</p>
        <p className="text-sm text-gray-400 mt-2">
          Check back later for updates
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {subjects.map((subject: any) => (
        <StudentSubjectItem key={subject.id} subject={subject} />
      ))}
    </div>
  );
}
