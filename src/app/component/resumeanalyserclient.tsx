"use client";

import { useEffect, useRef, useState } from "react";
import { apiClient } from "../lib/apiclient";
import Strength from "../component/strength";
import Weakness from "../component/weakness";
import Improvement from "../component/improvement";
import ScoreCard from "../component/scorecard";

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
        user?.resumedata ||""
    );

    const [resumeExists, setResumeExists] = useState(
        !!user?.resumedata
    );


    const handleButtonClick = () => {
        inputRef.current?.click();
    };

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

        setResumeContent(data.text);
        setResumeExists(true);
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
        <div className="min-h-screen bg-gray-900 p-8">
            <div className="max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold text-white mb-8">
                    Resume Analyzer
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div className="bg-gray-800 rounded-2xl p-6">

                        <input
                            ref={inputRef}
                            className="hidden"
                            type="file"
                            accept=".pdf"
                            onChange={handleUpload}
                        />

                        <button
                            type="button"
                            onClick={handleButtonClick}
                            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg text-white font-semibold"
                        >
                            {resumeExists
                                ? "Change Resume"
                                : "Upload Resume"}
                        </button>

                        {resumeExists && (
                            <p className="text-gray-400 mt-4">
                                Showing your previously uploaded resume.
                                Upload a new PDF if you want to replace it.
                            </p>
                        )}

                        {resumeContent && (
                            <textarea
                                value={resumeContent}
                                readOnly
                                className="mt-6 w-full h-72 bg-gray-900 text-white rounded-xl p-4"
                            />
                        )}
                    </div>

                    <button
                        disabled={loading}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg disabled:opacity-50"
                    >
                        {loading
                            ? "Analyzing..."
                            : "Analyze Resume"}
                    </button>
                </form>

                {error && (
                    <div className="bg-red-500 mt-6 p-4 rounded-lg text-white">
                        {error}
                    </div>
                )}

                {analysis && (
                    <div className="mt-10">

                        <h2 className="text-2xl font-bold text-white text-center mb-8">
                            Analysis Result
                        </h2>

                        <div className="flex flex-wrap gap-4 justify-center">

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