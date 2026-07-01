"use client";

import { useRef, useState } from "react";
import { apiClient } from "../lib/apiclient";
import Strength from "../component/strength";
import Weakness from "../component/weakness";
import Improvement from "../component/improvement";
import ScoreCard from "../component/scorecard";

interface JDAnalysis {
    matching: boolean;
    matching_score: number;
    need_to_include: string[];
    not_matching: string[];
    matching_skills: string[];
    matching_qualifications: string[];
    candidate_strengths: string[];
    candidate_weaknesses: string[];
    roadmap_to_follow: string[];
}

interface Props {
    user: any;
}

export default function JdAnalyzerClient({ user }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [analysis, setAnalysis] = useState<JDAnalysis | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [jdDescription, setJdDescription] = useState("");

    const [resumeContent, setResumeContent] = useState(user?.resumedata.trim() || "");
    const [resumeExists, setResumeExists] = useState(!!user?.resumedata);

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("resume", file);

        const res = await fetch("/api/getresumedata", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        setResumeContent(data.text);
        setResumeExists(true);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!resumeContent.trim() || !jdDescription.trim()) {
            setError("Please upload your resume and job discription");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setAnalysis(null);

            const data = await apiClient.analyseresumeforjd(resumeContent, jdDescription);

            const cleanedJson = data.jdanalysis
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            setAnalysis(JSON.parse(cleanedJson));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#09090B]">
            {/* Background */}
            <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[170px]" />
            <div className="absolute right-0 top-40 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[170px]" />
            <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[170px]" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
                {/* Header */}
                <div className="mb-14 text-center">
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
                        🤖 AI Powered JD Matching
                    </span>

                    <h1 className="mt-8 text-5xl font-black text-white md:text-6xl">
                        Resume
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
                            {" "}Job Matcher
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
                        Compare your resume with any Job Description, discover missing skills,
                        calculate ATS matching, and receive an AI-generated roadmap.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Resume */}
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-white">Resume</h2>

                                <button
                                    type="button"
                                    onClick={handleButtonClick}
                                    className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white transition hover:scale-105"
                                >
                                    {resumeExists ? "Change Resume" : "Upload Resume"}
                                </button>
                            </div>

                            <input
                                ref={inputRef}
                                className="hidden"
                                type="file"
                                accept=".pdf"
                                onChange={handleUpload}
                            />

                            {resumeExists && (
                                <div className="mb-6 rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-4 text-cyan-300">
                                    Existing resume detected. Upload another PDF to replace it.
                                </div>
                            )}

                            <textarea
                                value={resumeContent}
                                readOnly
                                placeholder="Upload your resume..."
                                className="h-[450px] w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-5 text-gray-300 outline-none scrollbar-hide"
                            />
                        </div>

                        {/* JD */}
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl">
                            <h2 className="mb-6 text-2xl font-bold text-white">Job Description</h2>

                            <textarea
                                value={jdDescription}
                                onChange={(e) => setJdDescription(e.target.value)}
                                placeholder="Paste complete Job Description here..."
                                className="h-[530px] w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-5 text-gray-300 outline-none placeholder:text-gray-500 scrollbar-hide"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            disabled={loading}
                            className="rounded-2xl bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 px-12 py-4 text-lg font-bold text-white shadow-xl transition duration-300 hover:scale-105 hover:shadow-cyan-500/30 disabled:opacity-40"
                        >
                            {loading ? "Analyzing..." : "🚀 Analyze Resume"}
                        </button>
                    </div>
                </form>

                {error && (
                    <div className="bg-red-500 mt-6 p-4 rounded-lg text-white">
                        {error}
                    </div>
                )}

                {analysis && (
                    <section className="mt-24">
                        <div className="mb-14 text-center">
                            <span className="rounded-full border border-green-400/30 bg-green-500/10 px-5 py-2 text-sm font-medium text-green-300">
                                AI Analysis Complete
                            </span>

                            <h2 className="mt-6 text-5xl font-bold text-white">
                                Resume Analysis Report
                            </h2>

                            <p className="mt-4 text-lg text-gray-400">
                                Here's how your resume matches this job description.
                            </p>
                        </div>

                        {/* Top Cards */}
                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Match Score */}
                            <div className="rounded-3xl border border-cyan-400/20 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl">
                                <p className="text-gray-400">Resume Match</p>

                                <h1 className="mt-5 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-7xl font-black text-transparent">
                                    {analysis.matching_score}
                                    <span className="text-4xl">%</span>
                                </h1>

                                <div className="mt-8 h-4 rounded-full bg-white/10">
                                    <div
                                        className="h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700"
                                        style={{ width: `${analysis.matching_score}%` }}
                                    />
                                </div>

                                <p className="mt-8 text-gray-300">
                                    {analysis.matching
                                        ? "Excellent! Your resume aligns well with this position."
                                        : "Several important skills are missing. Improve your resume before applying."}
                                </p>
                            </div>

                            {/* Candidate Strength */}
                            <div className="rounded-3xl border border-green-400/20 bg-white/5 p-8 backdrop-blur-2xl">
                                <h2 className="mb-6 text-2xl font-bold text-green-400">
                                    💪 Candidate Strengths
                                </h2>

                                <div className="space-y-4">
                                    {analysis.candidate_strengths.map((item, index) => (
                                        <div
                                            key={index}
                                            className="rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-gray-200"
                                        >
                                            ✓ {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Candidate Weakness */}
                            <div className="rounded-3xl border border-red-400/20 bg-white/5 p-8 backdrop-blur-2xl">
                                <h2 className="mb-6 text-2xl font-bold text-red-400">
                                    ⚠ Candidate Weaknesses
                                </h2>

                                <div className="space-y-4">
                                    {analysis.candidate_weaknesses.map((item, index) => (
                                        <div
                                            key={index}
                                            className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-gray-200"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Existing Components */}
                        <div className="mt-14 grid gap-8 lg:grid-cols-2">
                            <Strength analysisstrength={analysis.matching_skills} />
                            <Weakness analysisweakness={analysis.not_matching} />
                            <Improvement analysisneedtoimprove={analysis.need_to_include} />
                            <ScoreCard title="Resume Match" value={analysis.matching_score / 10} />
                        </div>

                        {/* Roadmap */}
                        <div className="mt-14 rounded-[30px] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl shadow-2xl lg:col-span-2">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="rounded-full bg-cyan-500/10 border border-cyan-400/20 px-4 py-2 text-sm text-cyan-300">
                                        AI Generated Roadmap
                                    </span>

                                    <h2 className="mt-5 text-4xl font-bold text-white">
                                        Your Learning Path
                                    </h2>

                                    <p className="mt-2 text-gray-400">
                                        Follow these steps to maximize your chances of getting shortlisted.
                                    </p>
                                </div>

                                <div className="hidden lg:flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-5xl">
                                    🎯
                                </div>
                            </div>

                            <div className="mt-12 space-y-8">
                                {analysis.roadmap_to_follow.map((step, index) => (
                                    <div key={index} className="flex gap-6">
                                        {/* Number */}
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-lg font-bold text-white shadow-lg shadow-cyan-500/30">
                                            {index + 1}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 rounded-2xl border border-white/10 bg-black/20 p-6 transition duration-300 hover:border-cyan-400/40 hover:bg-white/5">
                                            <h3 className="mb-3 text-xl font-semibold text-white">
                                                Step {index + 1}
                                            </h3>

                                            <p className="leading-8 text-gray-300">{step}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}