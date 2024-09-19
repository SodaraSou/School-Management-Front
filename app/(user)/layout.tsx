import Link from "next/link";

import { School } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Userlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </>
  );
}

function Header() {
  return (
    <header className="bg-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-6">
        <Link href="/" className="flex items-center">
          <School className="w-6 h-6 text-blue-500" />
          <span className="ml-2 text-xl font-semibold text-gray-900">
            School Management
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/pricing" className="hover:underline">
            Pricing
          </Link>
          <Button
            asChild
            className="rounded-full bg-blue-500 text-white"
            variant={"outline"}
          >
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
