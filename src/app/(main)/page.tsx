import React from 'react'
import { getCurrentUser } from '../lib/auth';
import Link from 'next/link';

const page = async() => {
    const user= await getCurrentUser();
  return (
    <main className="bg-slate-50 text-gray-800">

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
              AI Powered Campus Platform
            </span>

            <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight">
              Your <span className="text-blue-600">Campus Helper</span> for
              Placements & Career Growth
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Analyze your resume, prepare for interviews, explore placement
              roadmaps, access study resources, and stay updated with campus
              opportunities—all in one platform.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/resume" className="rounded-xl bg-blue-600 hover:bg-blue-700 transition duration-300 text-white px-8 py-4 font-semibold shadow-lg">
                Analyze Your Resume
              </Link>

              <button className="rounded-xl border border-gray-300 hover:bg-gray-100 transition duration-300 px-8 py-4 font-semibold">
                Explore Features
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-8">

              <div className="flex justify-between mb-6">
                <div>
                  <h2 className="font-bold text-xl">Resume Report</h2>
                  <p className="text-gray-500 text-sm">
                    AI Generated Analysis
                  </p>
                </div>

                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl">
                  92%
                </div>
              </div>

              <div className="space-y-4">

                <div>
                  <p className="text-sm font-medium mb-1">ATS Score</p>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full w-[92%]"></div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Skills Match</p>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full w-[88%]"></div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">
                    Grammar & Formatting
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-yellow-500 h-3 rounded-full w-[80%]"></div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          <div>
            <h2 className="text-4xl font-bold text-blue-600">5000+</h2>
            <p className="mt-2 text-gray-600">Students Helped</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-600">1200+</h2>
            <p className="mt-2 text-gray-600">Resume Analyses</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-600">250+</h2>
            <p className="mt-2 text-gray-600">Interview Questions</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-600">95%</h2>
            <p className="mt-2 text-gray-600">ATS Accuracy</p>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Everything You Need to Get Placed
          </h2>

          <p className="mt-4 text-gray-600">
            One platform. Multiple career tools.
          </p>
        </div>

        <div className="mt-16 max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {[
            {
              title: "📄 Resume Analyzer",
              desc: "ATS score, grammar check, recruiter suggestions and skill gap analysis."
            },
            {
              title: "🤖 AI Interview Prep",
              desc: "Technical, HR and coding interview practice with AI feedback."
            },
            {
              title: "🎯 Placement Roadmap",
              desc: "Personalized learning roadmap based on your dream company."
            },
            {
              title: "📚 Study Resources",
              desc: "Notes, PYQs, coding sheets and curated learning materials."
            },
            {
              title: "📅 Event Tracker",
              desc: "Hackathons, internships, campus drives and workshops."
            },
            {
              title: "💬 AI Campus Assistant",
              desc: "Ask anything about placements, coding or academics."
            }
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl bg-white shadow-lg p-8 hover:shadow-2xl transition duration-300"
            >
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-blue-600 text-white">

        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-4xl font-bold">
            How It Works
          </h2>

          <div className="mt-16 grid md:grid-cols-4 gap-8">

            {[
              "Upload Resume",
              "AI Analysis",
              "Improve Resume",
              "Apply Confidently"
            ].map((step, index) => (
              <div key={step}>
                <div className="w-16 h-16 rounded-full bg-white text-blue-600 flex items-center justify-center mx-auto text-2xl font-bold">
                  {index + 1}
                </div>

                <h3 className="mt-5 text-xl font-semibold">{step}</h3>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">

        <h2 className="text-5xl font-bold">
          Ready to Land Your Dream Job?
        </h2>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Upload your resume and let AI help you improve it before applying to
          internships and placements.
        </p>

        <button className="mt-10 rounded-xl bg-blue-600 hover:bg-blue-700 transition duration-300 text-white px-10 py-4 text-lg font-semibold shadow-lg">
          Analyze Your Resume
        </button>

      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-300 py-10">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

          <h2 className="text-2xl font-bold text-white">
            Campus Helper
          </h2>

          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white">Features</a>
            <a href="#" className="hover:text-white">Resources</a>
            <a href="#" className="hover:text-white">Contact</a>
            <a href="#" className="hover:text-white">Privacy</a>
          </div>

        </div>

      </footer>

    </main>
  )
}

export default page