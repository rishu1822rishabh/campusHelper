import React from 'react'
import { getCurrentUser } from '../lib/auth';
import Link from 'next/link';
import { apiClient } from '../lib/apiclient';

const page = async () => {
  let resumeanalysis = null;

  const user = await getCurrentUser();

  if (user?.resumedata?.trim()) {
    try {
      const data = await apiClient.analyseresume(user.resumedata);
      if (data?.analysis) {
        const cleanedJson = data.analysis
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        resumeanalysis = JSON.parse(cleanedJson);
      }
    } catch (err) {
      resumeanalysis = null;
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090B] text-white">

      {/* Background */}

      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-purple-600/30 blur-[130px]" />

      <div className="absolute right-0 top-40 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[150px]" />

      <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[150px]" />

      {/* Extra ambient glow for depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.04),_transparent_60%)]" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <span className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1 text-sm font-semibold text-cyan-300 backdrop-blur-xl">
              AI Powered Campus Platform
            </span>

            <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight">
              Your <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Campus Helper</span> for
              Placements & Career Growth
            </h1>

            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
              Analyze your resume, prepare for interviews, explore placement
              roadmaps, access study resources, and stay updated with campus
              opportunities—all in one platform.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/resume" className="rounded-xl border border-white/10 bg-gradient-to-r from-cyan-500 to-violet-600 px-8 py-4 font-semibold text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:shadow-cyan-500/40">
                Analyze Your Resume
              </Link>

              <button className="rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl transition duration-300 hover:bg-white/10">
                Explore Features
              </button>
            </div>
          </div>

          {resumeanalysis ? (
            <div className="flex justify-center">
              <div className="w-full max-w-md rounded-3xl border border-white/15 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur-2xl">
                <div className="flex justify-between mb-6">
                  <div>
                    <h2 className="font-bold text-xl text-white">Resume Report</h2>
                    <p className="text-gray-400 text-sm">
                      AI Generated Analysis
                    </p>
                  </div>

                  <div className="h-16 w-16 rounded-full border border-emerald-400/30 bg-emerald-400/10 flex items-center justify-center text-emerald-300 font-bold text-xl backdrop-blur-xl hover:text-white hover:border-emerald-400/50 hover:bg-emerald-400/30">
                    {resumeanalysis.overallScore * 10}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium mb-1 text-gray-300">ATS Score</p>
                      <p className="text-sm mb-1 text-cyan-300 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 rounded-full font-bold">
                        {resumeanalysis.atsScore * 10}
                      </p>
                    </div>

                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-cyan-500 h-3 rounded-full"
                        style={{
                          width: `${resumeanalysis.atsScore * 10}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium mb-1 text-gray-300">Experience</p>
                      <p className="text-sm mb-1 text-emerald-300 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-full font-bold">{resumeanalysis.experience.score * 10}</p>
                    </div>

                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-3 rounded-full"
                        style={{
                          width: `${resumeanalysis.experience.score * 10}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium mb-1 text-gray-300">Project</p>
                      <p className="text-sm mb-1 text-amber-300 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full font-bold">{resumeanalysis.projects.score * 10}</p>
                    </div>

                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-3 rounded-full"
                        style={{
                          width: `${resumeanalysis.projects.score * 10}%`,
                        }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-full max-w-md rounded-3xl border border-white/15 bg-white/5 p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-2xl">
                <h2 className="text-2xl font-bold text-white">
                  you have not uploaded your resume !!
                </h2>

                <p className="text-gray-400 mt-3">
                  Upload your resume to get an AI-powered ATS score, strengths,
                  weaknesses, and personalized improvement suggestions.
                </p>

                <Link
                  href="/resume"
                  className="inline-block mt-6 rounded-lg border border-white/10 bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-3 text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:shadow-cyan-500/40"
                >
                  Analyze Resume
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center rounded-3xl border border-white/10  bg-white/10 p-10 shadow-2xl shadow-black/30 backdrop-blur-2xl">

            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">5000+</h2>
              <p className="mt-2 text-gray-300">Students Helped</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">1200+</h2>
              <p className="mt-2 text-gray-300">Resume Analyses</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">250+</h2>
              <p className="mt-2 text-gray-300">Interview Questions</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">95%</h2>
              <p className="mt-2 text-gray-300">ATS Accuracy</p>
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-24 px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            Everything You Need to Get Placed
          </h2>

          <p className="mt-4 text-gray-400">
            One platform. Multiple career tools.
          </p>
        </div>

        <div className="mt-16 max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {[
            {
              title: "📄 Resume Analyzer",
              desc: "ATS score, grammar check, recruiter suggestions and skill gap analysis.",
              link: "/resume"

            },
            {
              title: "🤖 AI Interview Prep",
              desc: "Technical, HR and coding interview practice with AI feedback.",
              link: "/interviewprep"
            },
            {
              title: "🎯 Placement Roadmap",
              desc: "Personalized learning roadmap based on your dream company.",
              link: "/jdanalysis"
            },
            {
              title: "📚 Study Resources",
              desc: "Notes, PYQs, coding sheets and curated learning materials.",
              link: "/resourse"
            },
            {
              title: "📅 Event Tracker",
              desc: "Hackathons, internships, campus drives and workshops.",
              link: "/event"
            },
            {
              title: "💬 AI Campus Assistant",
              desc: "Ask anything about placements, coding or academics.",
              link: "/generalquestion"
            }
          ].map((feature) => (
            <Link href={feature.link}
              key={feature.title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:border-white/25 hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-400 group-hover:text-gray-300">{feature.desc}</p>
            </Link>
          ))}

        </div>
      </section>

      {/* How it Works */}
      <section className="relative py-24 px-6">

        <div className="max-w-6xl mx-auto text-center rounded-3xl border border-white/10 bg-white/5 p-12 shadow-2xl shadow-black/30 backdrop-blur-2xl">

          <h2 className="text-4xl font-bold text-white">
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
                <div className="w-16 h-16 rounded-full border border-white/15 bg-gradient-to-br from-cyan-400/20 to-violet-500/20 flex items-center justify-center mx-auto text-2xl font-bold text-cyan-300 backdrop-blur-xl">
                  {index + 1}
                </div>

                <h3 className="mt-5 text-xl font-semibold text-white">{step}</h3>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="relative py-24 text-center px-6">

        <div className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-12 shadow-2xl shadow-black/30 backdrop-blur-2xl">
          <h2 className="text-5xl font-bold text-white">
            Ready to Land Your Dream Job?
          </h2>

          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto mb-3.5">
            Upload your resume and let AI help you improve it before applying to
            internships and placements.
          </p>

          <Link href="/resume" className="inline-block mt-10 rounded-xl border border-white/10 bg-gradient-to-r from-cyan-500 to-violet-600 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:shadow-cyan-500/40">
            Analyze Your Resume
          </Link>
        </div>

      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-white/5 py-10 backdrop-blur-2xl">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

          <h2 className="text-2xl font-bold text-white">
            Campus Helper
          </h2>

          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition">Features</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Resources</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Contact</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Privacy</a>
          </div>

        </div>

      </footer>

    </main>
  )
}

export default page