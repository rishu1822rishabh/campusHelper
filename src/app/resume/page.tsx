"use client";

import { useState } from "react";
import { apiClient } from "../lib/apiclient";
import ReactMarkdown from "react-markdown";


export default function ResumeAnalyzerPage() {
    const [analysis, setAnalysis] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [resumeContent,setResumeContent]=useState("");
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
            setAnalysis("");

            const data = await apiClient.analyseresume(
                resumeContent
            );


            setAnalysis(
                data.analysis ||
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
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
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
                    <div className="mt-6 bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold text-white mb-4">
                            Analysis Result
                        </h2>

                        <div className="whitespace-pre-wrap text-gray-200">
                            <ReactMarkdown>{analysis}</ReactMarkdown>
                            
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}