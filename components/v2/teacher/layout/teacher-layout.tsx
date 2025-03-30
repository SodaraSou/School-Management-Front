import { type BreadcrumbItem } from "@/types";

import { SidebarTrigger, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import TeacherSidebar from "@/components/v2/teacher/layout/teacher-sidebar";
import { Breadcrumbs } from "@/components/v2/breadcrumbs";

export default function TeacherLayout({
  children,
  breadcrumbs,
}: {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}) {
  return (
    <SidebarProvider>
      <TeacherSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        </header>
        <div className="flex flex-1 flex-col gap-4 p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
