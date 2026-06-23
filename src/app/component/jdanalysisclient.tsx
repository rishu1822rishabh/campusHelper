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

    const [resumeContent, setResumeContent] = useState(
        user?.resumedata || ""
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

        if (!resumeContent.trim() || !jdDescription.trim()) {
            setError("Please upload your resume and job discription");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setAnalysis(null);

            const data = await apiClient.analyseresumeforjd(
                resumeContent, jdDescription
            );

            const cleanedJson = data.jdanalysis
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
                    Resume Analyzer for job description
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
                        <p className="text-center font-bold text-blue-500 text-3xl mt-2"> Job Description</p>
                        <textarea className="mt-6 w-full h-72 bg-gray-900 text-white rounded-xl p-4" onChange={(e) => {
                            setJdDescription(e.target.value)

                        }} placeholder="paste job description hare ..."></textarea>
                    </div>

                    <button
                        disabled={loading}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg disabled:opacity-50"
                    >
                        {loading
                            ? "Analyzing..."
                            : "Analyze Resume for job"}
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
                                analysisstrength={analysis.matching_skills}
                            />

                            <Weakness
                                analysisweakness={analysis.not_matching}
                            />

                            <Improvement
                                analysisneedtoimprove={
                                    analysis.need_to_include
                                }
                            />
                            <div className="bg-gray-800 p-8 rounded-2xl">
                                <h1 className="text-yellow-300 font-bold text-3xl text-center">Roadmap to follow for this role</h1>
                            <ul className="space-y-3">
                                {analysis.roadmap_to_follow.map((item, index) => (
                                    <li
                                        key={index}
                                        className="bg-green-500/10 border border-green-500/20 rounded-lg p-3"
                                    >
                                      {item}
                                    </li>
                                ))}
                            </ul>
                            </div>
                            <ScoreCard
                                title="resume match"
                                value={analysis.matching_score/10}
                            />
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}