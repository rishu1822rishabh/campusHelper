'use client'
import React, { useState } from 'react'
import { apiClient } from '../lib/apiclient';
import Markdown from 'react-markdown';

const generalquestionpage = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handelsubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("please provide content");
      return;
    }
    try {
      setLoading(true);
      setError("");
      setAnalysis("");
      const data = await apiClient.generalquestion(content);
      setAnalysis(data.response)

    } catch (error) {
      setError(error instanceof Error ? error.message : "something went wrong")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09090B] px-6 py-16">

      {/* Background */}
      <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[180px]" />
      <div className="absolute right-0 top-40 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[180px]" />
      <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[150px]" />

      <div className="relative z-10 max-w-3xl mx-auto">

        <div className="text-center">
          <span className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1 text-sm font-semibold text-cyan-300 backdrop-blur-xl">
            💬 AI Campus Assistant
          </span>

          <h1 className="mt-5 text-4xl font-black text-white">
            Ask Your
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent"> Doubt</span>
          </h1>

          <p className="mt-4 text-gray-400">
            Ask anything about placements, coding or academics and get an instant AI answer.
          </p>
        </div>

        <form
          onSubmit={handelsubmit}
          className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl shadow-black/40"
        >
          <textarea
            className="w-full h-[140px] rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none backdrop-blur-xl placeholder:text-gray-500 focus:border-cyan-400/50"
            placeholder="Type your question here..."
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-5 block mx-auto rounded-full border border-white/10 bg-gradient-to-r from-cyan-500 to-violet-600 px-8 py-3 font-bold text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:shadow-cyan-500/40 disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Ask Question"}
          </button>
        </form>

        {error && (
          <div className="mt-6 rounded-md border border-red-500/20 bg-red-500/10 p-4 text-red-300 backdrop-blur-xl">
            {error}
          </div>
        )}

        {analysis && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl shadow-black/40 prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-white prose-strong:text-white prose-code:text-cyan-300">
            <Markdown>{analysis}</Markdown>
          </div>
        )}

      </div>
    </div>
  )
}

export default generalquestionpage