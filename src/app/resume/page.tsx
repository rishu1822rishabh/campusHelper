"use client";

import { useState } from "react";
import { apiClient } from "../lib/apiclient";
import ReactMarkdown from "react-markdown";
import Strength from "../component/strength";
import Weakness from "../component/weakness";
import Improvement from "../component/improvement";
import ScoreCard from "../component/scorecard";
interface Analysis {
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
    how_to_improve: string[];
}


export default function ResumeAnalyzerPage() {

    const [analysis, setAnalysis] = useState<Analysis | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [resumeContent, setResumeContent] = useState("");
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
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!resumeContent.trim()) {
            setError("Please enter resume content.");
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


            setAnalysis(
                JSON.parse(cleanedJson) ||
                JSON.stringify(data, null, 2)
            );
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-6">
                    Resume Analyzer
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div className="p-6">
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleUpload}
                        />
                        {resumeContent && (
                            <textarea
                                value={resumeContent}
                                readOnly
                                className="w-full h-64 p-4 bg-gray-800 text-white rounded"
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50 text-center"
                    >
                        {loading
                            ? "Analyzing..."
                            : "Analyze Resume"}
                    </button>
                </form>

                {error && (
                    <div className="mt-6 bg-red-500 text-white p-4 rounded">
                        {error}
                    </div>
                )}

                {analysis && (
                    <div className="max-w-[850px] mx-auto">
                        <h2 className="text-xl text-center font-semibold text-white mb-4">
                            Analysis Result
                        </h2>

                        <div className="flex flex-wrap gap-3 justify-center">
                            <Strength analysisstrength={analysis.strengths} />
                            <Weakness analysisweakness={analysis.weaknesses} />
                            <Improvement analysisneedtoimprove={analysis.recommendations} />
                            <ScoreCard
                                title="overall Score"
                                value={analysis.overallScore}
                            />
                            <ScoreCard
                                title="recruiter Score"
                                value={analysis.recruiterScore}
                            />
                            <ScoreCard
                                title="ATS Score"
                                value={analysis.atsScore}
                            />
                        <ScoreCard
                            title="projects"
                            value={analysis.projects.score}
                        />
                        <ScoreCard
                            title="experience"
                            value={analysis.experience.score}
                        />
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}