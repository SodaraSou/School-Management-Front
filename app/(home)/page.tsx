"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Users, Calendar, Award } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={"/school-logo.png"} height={32} width={32} alt="logo" />
            <span className="text-xl font-bold text-gray-900">PPTC</span>
          </div>
          <div>
            <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
              <Link href={"/sign-in"}>Sign In</Link>
            </Button>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to PPTC Online Platform
          </h1>
          <p className="text-xl mb-8 text-indigo-100">
            Simplifying education with tools for teachers and students.
          </p>
          <Button
            size="lg"
            className="bg-white text-indigo-700 hover:bg-indigo-50"
          >
            Get Started
          </Button>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tools designed to enhance teaching and learning experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-indigo-600 mb-2" />
                <CardTitle>Activity Management</CardTitle>
                <CardDescription>
                  Teachers can create activities, and students can participate
                  and manage their tasks.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Calendar className="h-12 w-12 text-indigo-600 mb-2" />
                <CardTitle>Student Promotion</CardTitle>
                <CardDescription>
                  Automatically promote students who meet the criteria for
                  passing their class.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-12 w-12 text-indigo-600 mb-2" />
                <CardTitle>Class Management</CardTitle>
                <CardDescription>
                  Manage classes efficiently, including scheduling, assignments,
                  and student records.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-indigo-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Your Journey with PPTC Today
          </h2>
          <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
            Join us and experience a modern approach to education.
          </p>
          <Button
            size="lg"
            className="bg-white text-indigo-700 hover:bg-indigo-50"
          >
            Get Started
          </Button>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} Phnom Penh Technology Center. All
            rights reserved.
          </p>
          <p className="mt-4 text-sm">
            Powered by{" "}
            <span className="text-indigo-400 font-semibold">GradeLink</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
