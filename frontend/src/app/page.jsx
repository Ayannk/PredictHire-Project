'use client';
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Upload, FileText, BarChart, CheckCircle, Search, BrainCircuit } from "lucide-react"
import React from 'react'
import Button from "../components/Button"

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  AI-Driven Resume Screening System
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Streamline your hiring process with our intelligent resume matching system. Upload resumes, manage job
                  descriptions, and find the perfect candidates faster.
                </p>
                {/* <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <Button variant="outline" size="lg">
                    Watch Demo
                  </Button>
                </div> */}
              </div>
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://www.myperfectresume.com/wp-content/uploads/2023/12/optimize-x.png"
                  alt="AI Resume Screening Dashboard"
                  fill
                  className="object-cover bg-white"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Everything you need to streamline your hiring
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Our platform combines powerful resume management with AI-driven candidate matching.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Resume Upload</h3>
                <p className="text-center text-muted-foreground">
                  Easily upload and organize candidate resumes in various formats including PDF, DOCX, and TXT.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Job Description Management</h3>
                <p className="text-center text-muted-foreground">
                  Create, store, and manage detailed job descriptions with custom requirements and qualifications.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI Matching</h3>
                <p className="text-center text-muted-foreground">
                  Advanced algorithms match candidates to job descriptions with detailed scoring and analysis.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Candidate Scoring</h3>
                <p className="text-center text-muted-foreground">
                  Get detailed candidate scores based on skills, experience, education, and job requirements.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Advanced Search</h3>
                <p className="text-center text-muted-foreground">
                  Powerful search capabilities to find candidates by skills, experience, education, or other criteria.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <BrainCircuit className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI Insights</h3>
                <p className="text-center text-muted-foreground">
                  Get intelligent insights and recommendations to improve your job descriptions and hiring process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Resume Templates Section */}
        <section id="templates" className="w-full py-12 md:py-24 bg-muted/50 ">
          <div className="container px-4 md:px-6 ">
            <div className="flex flex-col items-center justify-center space-y-4 text-center ">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Resume Templates
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Professional Resume Templates</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Help candidates create standout resumes with our professionally designed templates.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
                <div className="aspect-[3/4] relative">
                  <Image
                    src="/templates/template2.png"
                    alt="Classic Resume Template"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 w-full">
                      <Button className="w-full">Use Template</Button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">Classic Template</h3>
                  <p className="text-sm text-muted-foreground">Perfect for traditional industries</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
                <div className="aspect-[3/4] relative">
                  <Image
                    src="/templates/template3.png"
                    alt="Creative Resume Template"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 w-full">
                      <Button className="w-full">Use Template</Button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">Creative Template</h3>
                  <p className="text-sm text-muted-foreground">Perfect for design and marketing roles</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
                <div className="aspect-[3/4] relative">
                  <Image
                    src="/templates/template4.png"
                    alt="Modern Resume Template"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 w-full">
                      <Button className="w-full">Use Template</Button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">Modern Template</h3>
                  <p className="text-sm text-muted-foreground">Perfect for tech and startups</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
                <div className="aspect-[3/4] relative">
                  <Image
                    src="/templates/template5.png"
                    alt="Professional Resume Template"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 w-full">
                      <Button className="w-full">Use Template</Button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">Professional Template</h3>
                  <p className="text-sm text-muted-foreground">Perfect for corporate roles</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
                <div className="aspect-[3/4] relative">
                  <Image
                    src="/templates/template6.png"
                    alt="Executive Resume Template"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 w-full">
                      <Button className="w-full">Use Template</Button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">Executive Template</h3>
                  <p className="text-sm text-muted-foreground">Perfect for senior positions</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
                <div className="aspect-[3/4] relative">
                  <Image
                    src="/templates/template7.png"
                    alt="Technical Resume Template"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 w-full">
                      <Button className="w-full">Use Template</Button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">Technical Template</h3>
                  <p className="text-sm text-muted-foreground">Perfect for engineering roles</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Process
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Our AI-powered system simplifies the resume screening process in just a few steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              <div className="relative flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  1
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Upload Resumes</h3>
                  <p className="text-muted-foreground">
                    Upload candidate resumes individually or in bulk through our intuitive interface.
                  </p>
                </div>
                <div className="absolute right-0 top-6 hidden h-0.5 w-full bg-primary md:block md:w-1/2"></div>
              </div>
              <div className="relative flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  2
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Define Job Requirements</h3>
                  <p className="text-muted-foreground">
                    Create detailed job descriptions with required skills, experience, and qualifications.
                  </p>
                </div>
                <div className="absolute left-0 right-0 top-6 hidden h-0.5 w-full bg-primary md:block"></div>
              </div>
              <div className="relative flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  3
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Get Matched Results</h3>
                  <p className="text-muted-foreground">
                    Review AI-generated matches with detailed scoring and candidate comparisons.
                  </p>
                </div>
                <div className="absolute left-0 top-6 hidden h-0.5 w-1/2 bg-primary md:block"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <h3 className="text-4xl font-bold">85%</h3>
                <p className="text-primary-foreground/80">Time Saved in Screening</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold">95%</h3>
                <p className="text-primary-foreground/80">Matching Accuracy</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold">10K+</h3>
                <p className="text-primary-foreground/80">Resumes Processed Daily</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold">500+</h3>
                <p className="text-primary-foreground/80">Companies Trust Us</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Trusted by HR Professionals</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  See what our customers have to say about our AI-driven resume screening system.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-12">
              <div className="rounded-lg border p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt="Testimonial Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">Sarah Johnson</h3>
                    <p className="text-sm text-muted-foreground">HR Director, Tech Solutions Inc.</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  "This platform has revolutionized our hiring process. We've reduced our time-to-hire by 60% and found
                  better-qualified candidates consistently."
                </p>
              </div>
              <div className="rounded-lg border p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt="Testimonial Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">Michael Chen</h3>
                    <p className="text-sm text-muted-foreground">Talent Acquisition Manager, Global Enterprises</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  "The AI matching is incredibly accurate. We're now able to process hundreds of applications in minutes
                  instead of days, with better results."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to Transform Your Hiring Process?
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Join hundreds of companies already using our AI-driven resume screening system.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home