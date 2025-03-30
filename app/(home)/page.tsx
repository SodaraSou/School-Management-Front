"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronRight,
  BookOpen,
  Users,
  Calendar,
  Award,
  Monitor,
  MessageSquare,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">EduConnect</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Testimonials
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline">Log In</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Modern Learning Experience for Your School
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Connect, collaborate, and learn together on our comprehensive
              educational platform.
            </p>
            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-blue-600"
              >
                Take a Tour
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white p-2 rounded-lg shadow-xl">
              <img
                src="/api/placeholder/600/400"
                alt="Dashboard Preview"
                className="rounded w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Powerful Features for Modern Education
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools you need to create engaging
              learning environments and facilitate collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Monitor className="h-12 w-12 text-blue-600 mb-2" />
                <CardTitle>Virtual Classrooms</CardTitle>
                <CardDescription>
                  Host interactive lessons with video conferencing, screen
                  sharing, and digital whiteboard.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-blue-600 mb-2" />
                <CardTitle>Discussion Forums</CardTitle>
                <CardDescription>
                  Encourage conversation and collaboration through topic-based
                  discussion boards.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Calendar className="h-12 w-12 text-blue-600 mb-2" />
                <CardTitle>Assignment Management</CardTitle>
                <CardDescription>
                  Create, distribute, collect, and grade assignments all in one
                  place.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mb-2" />
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Form groups for projects with dedicated channels and file
                  sharing.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-12 w-12 text-blue-600 mb-2" />
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>
                  Monitor student engagement and performance with detailed
                  analytics.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-700">
                  And Much More...
                </CardTitle>
                <CardDescription>
                  Our platform is constantly evolving with new features.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="link"
                  className="text-blue-600 p-0 flex items-center"
                >
                  See all features <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting started with EduConnect is simple and straightforward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">
                Create Your School Account
              </h3>
              <p className="text-gray-600">
                Register your school and set up administrator accounts to manage
                the platform.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">
                Invite Teachers & Students
              </h3>
              <p className="text-gray-600">
                Add users individually or import class rosters to get everyone
                onboard quickly.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">
                Start Learning Together
              </h3>
              <p className="text-gray-600">
                Create courses, assign work, and begin interactive teaching
                sessions.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg">Start Free Trial</Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              What Educators Are Saying
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't take our word for it. Here's what teachers and
              administrators think about our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <p className="italic text-gray-600 mb-4">
                  "EduConnect has transformed how we deliver education. The
                  seamless integration of virtual classrooms and assignment
                  management has made remote learning effective and engaging."
                </p>
                <div className="flex items-center">
                  <div className="bg-gray-200 rounded-full w-12 h-12 mr-4"></div>
                  <div>
                    <p className="font-bold">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">
                      Principal, Lincoln High School
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p className="italic text-gray-600 mb-4">
                  "The collaboration tools have been a game-changer for group
                  projects. Students stay engaged and I can easily monitor their
                  progress and provide timely feedback."
                </p>
                <div className="flex items-center">
                  <div className="bg-gray-200 rounded-full w-12 h-12 mr-4"></div>
                  <div>
                    <p className="font-bold">Michael Chen</p>
                    <p className="text-sm text-gray-500">
                      Science Teacher, Westside Academy
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your School's Learning Experience?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of schools already using EduConnect to enhance
            education.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50"
            >
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-blue-700"
            >
              Request Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold text-white">EduConnect</span>
              </div>
              <p className="mb-4">
                Modern e-learning platform designed for schools to facilitate
                better learning experiences.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Updates
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>
              &copy; {new Date().getFullYear()} EduConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
