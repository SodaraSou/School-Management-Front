"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signUp } from "./actions";

import { School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthForm({
  mode = "sign-in",
}: {
  mode?: "sign-in" | "sign-up";
}) {
  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[400px] gap-6">
          <div className="grid gap-6 text-center">
            <Link href="/">
              <School className="w-12 h-12 mx-auto text-blue-500" />
            </Link>
            <h1 className="text-3xl font-bold">
              {mode === "sign-in" ? "Sign In" : "Sign Up"}
            </h1>
          </div>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {mode === "sign-in" && (
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline hover:text-blue-500"
                  >
                    Forgot your password?
                  </Link>
                )}
              </div>
              <Input id="password" type="password" required />
            </div>
            {mode === "sign-up" && (
              <div className="grid gap-2">
                <Label htmlFor="password">Confirm Password</Label>
                <Input id="confirmPassword" type="password" required />
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white"
              variant={"outline"}
            >
              {mode === "sign-in" ? "Sign In" : "Sign Up"}
            </Button>
          </form>
          {mode === "sign-in" ? (
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline hover:text-blue-500">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/sign-in" className="underline hover:text-blue-500">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
