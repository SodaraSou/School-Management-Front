"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { signIn, signUp } from "./actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthForm({
  mode = "sign-in",
}: {
  mode?: "sign-in" | "sign-up";
}) {
  const initialState = { success: true, message: "", errors: {} };
  const [state, formAction, isPending] = useActionState(signIn, initialState);

  const { toast } = useToast();
  useEffect(() => {
    if (state.success === false) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="mx-auto grid w-[400px] gap-6">
        <div className="flex flex-col gap-6 text-center">
          <Link href="/">
            <Image
              src={"/school-logo.png"}
              width={120}
              height={120}
              alt="school-logo"
              className="mx-auto"
            />
          </Link>
          <h1 className="text-3xl font-bold">
            {mode === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
        </div>
        <form action={formAction} className="grid gap-4">
          {mode === "sign-up" && (
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="name" placeholder="Name" name="name" />
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              name="email"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {mode === "sign-in" && (
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline hover:text-indigo-600"
                >
                  Forgot your password?
                </Link>
              )}
            </div>
            <Input id="password" type="password" name="password" />
          </div>
          {mode === "sign-up" && (
            <div className="grid gap-2">
              <Label htmlFor="password">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
              />
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={isPending}
          >
            {mode === "sign-in" ? "Sign In" : "Sign Up"}
          </Button>
        </form>
        {mode === "sign-in" ? (
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline hover:text-indigo-600">
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline hover:text-indigo-600">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
