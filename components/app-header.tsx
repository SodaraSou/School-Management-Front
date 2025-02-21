import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { User } from "@/models/user";

import { Home, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";

export default function AppHeader({ user }: { user: User }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src={"/school-logo.png"}
            width={48}
            height={48}
            alt="school-logo"
            className="mx-auto"
          />
          <span className="ml-2 text-xl font-bold text-gray-900">PPTU</span>
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer size-9">
                  <AvatarImage alt={user.name || ""} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="flex flex-col gap-1">
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/dashboard" className="flex w-full items-center">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <form action={handleSignOut} className="w-full">
                  <button type="submit" className="flex w-full">
                    <DropdownMenuItem className="w-full flex-1 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-full"
            >
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
