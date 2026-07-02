"use client";

import { useEffect, useRef, useState } from "react";
import { apiClient } from "../lib/apiclient";
import Strength from "../component/strength";
import Weakness from "../component/weakness";
import Improvement from "../component/improvement";
import ScoreCard from "../component/scorecard";
import { useRouter } from "next/navigation";

interface Analysis {
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
    how_to_improve: string[];
    overallScore: number;
    recruiterScore: number;
    atsScore: number;
    projects: {
        score: number;
    };
    experience: {
        score: number;
    };
}

interface Props {
    user: any;
}

export default function ResumeAnalyzerClient({ user }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [analysis, setAnalysis] = useState<Analysis | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [resumeContent, setResumeContent] = useState(
        user?.resumedata.trim() ||""
    );

    const [resumeExists, setResumeExists] = useState(
        !!user?.resumedata
    );


    const handleButtonClick = () => {
        inputRef.current?.click();
    };
    const router=useRouter();

    const handleUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const formData = new FormData();
        formData.append("resume", file);

        const res = await fetch("/api/getresumedata", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        setResumeContent(data.text.trim());
        setResumeExists(true);
        router.refresh();
        
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!resumeContent.trim()) {
            setError("Please upload your resume.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setAnalysis(null);

            const data = await apiClient.analyseresume(
                resumeContent
            );

            const cleanedJson = data.analysis
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            setAnalysis(JSON.parse(cleanedJson));
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#0B1120]">

            {/* Background Blobs */}

            <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-purple-600/30 blur-[130px]" />

            <div className="absolute right-0 top-40 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[150px]" />

            <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[150px]" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">

                {/* Header */}

                <div className="mb-12 text-center">

                    <h1 className="text-5xl font-bold text-white">
                        Resume Analyzer
                    </h1>

                    <p className="mt-4 text-lg text-gray-400">
                        Upload your resume and receive AI-powered feedback.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-10"
                >

                    {/* Upload Section */}

                    <div className="rounded-3xl border text-center border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.45)] p-8">

                        <div className="flex justify-center gap-10">

                            {/* Upload */}

                            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-cyan-400/30 bg-black/20 p-10 transition hover:border-cyan-400 hover:bg-white/5">

                                <input
                                    ref={inputRef}
                                    type="file"
                                    accept=".pdf"
                                    className="hidden"
                                    onChange={handleUpload}
                                />

                                <button
                                    type="button"
                                    onClick={handleButtonClick}
                                    className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-300"
                                >
                                    {resumeExists
                                        ? "Change Resume"
                                        : "Upload Resume"}
                                </button>

                                <p className="mt-6 text-center text-gray-400">
                                    Click to upload your PDF resume.
                                </p>

                            </div>

                            {/* Resume Preview */}

                            <div>

                                {resumeExists && (

                                    <div className="mb-5 rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-cyan-200">

                                        Showing your previously uploaded resume.
                                        Upload another PDF to replace it.

                                    </div>

                                )}

                                {resumeContent && (

                                    <textarea
                                        readOnly
                                        value={resumeContent}
                                        className="
                                h-80
                                w-full
                                resize-none
                                rounded-2xl
                                border
                                border-white/10
                                bg-black/30
                                p-2
                                text-gray-300
                                outline-none
                                "
                                    />

                                )}

                            </div>

                        </div>

                    </div>

                    {/* Analyze Button */}

                    <div className="flex justify-center">

                        <button
                            disabled={loading}
                            className="
                    rounded-2xl
                    bg-gradient-to-r
                    from-emerald-500
                    via-green-500
                    to-cyan-500
                    px-12
                    py-4
                    text-lg
                    font-semibold
                    text-white
                    shadow-xl
                    transition
                    duration-300
                    hover:scale-105
                    hover:shadow-cyan-500/30
                    disabled:opacity-50
                    "
                        >

                            {loading
                                ? "Analyzing..."
                                : "✨ Analyze Resume"}

                        </button>

                    </div>

                </form>

                {/* Error */}

                {error && (

                    <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-300 backdrop-blur-lg">

                        {error}

                    </div>

                )}

                {/* Results */}

                {analysis && (

                    <div className="mt-20">

                        <h2 className="mb-10 text-center text-4xl font-bold text-white">

                            Analysis Result

                        </h2>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                            <Strength
                                analysisstrength={analysis.strengths}
                            />

                            <Weakness
                                analysisweakness={analysis.weaknesses}
                            />

                            <Improvement
                                analysisneedtoimprove={
                                    analysis.recommendations
                                }
                            />

                            <ScoreCard
                                title="Overall Score"
                                value={analysis.overallScore}
                            />

                            <ScoreCard
                                title="Recruiter Score"
                                value={analysis.recruiterScore}
                            />

                            <ScoreCard
                                title="ATS Score"
                                value={analysis.atsScore}
                            />

                            <ScoreCard
                                title="Projects"
                                value={analysis.projects.score}
                            />

                            <ScoreCard
                                title="Experience"
                                value={analysis.experience.score}
                            />

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}