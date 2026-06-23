"use client";

import { useRef, useState } from "react";
import { apiClient } from "../lib/apiclient";
import Strength from "../component/strength";
import Weakness from "../component/weakness";
import Improvement from "../component/improvement";
import ScoreCard from "../component/scorecard";
export interface Internship {
    title: string;
    company: string;
    location: string;
    mode: "Remote" | "Hybrid" | "Onsite" | "";
    duration: string;
    stipend: string;
    eligibility: string;
    skills_required: string[];
    application_deadline: string;
    application_link: string;
    description: string;
}

export interface Placement {
    company: string;
    role: string;
    location: string;
    package: string;
    eligibility: string;
    required_skills: string[];
    last_date: string;
    apply_link: string;
    description: string;
}

export interface Hackathon {
    name: string;
    organizer: string;
    mode: "Online" | "Offline" | "Hybrid" | "";
    location: string;
    prize_pool: string;
    registration_deadline: string;
    event_date: string;
    team_size: string;
    registration_link: string;
    description: string;
}

export interface Workshop {
    title: string;
    organizer: string;
    mode: "Online" | "Offline" | "Hybrid" | "";
    date: string;
    duration: string;
    certificate: boolean;
    registration_link: string;
    description: string;
}

export interface EventListResponse {
    internships: Internship[];
    placements: Placement[];
    hackathons: Hackathon[];
    workshops: Workshop[];
}

interface Props {
    user: any;
}

export default function EventlistClient({ user }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [analysis, setAnalysis] = useState<EventListResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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

        if (!resumeContent.trim()) {
            setError("Please upload your resume");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setAnalysis(null);

            const data = await apiClient.eventlist(
                resumeContent
            );

            const cleanedJson = data.events
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
                    get list of all events
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
                            ? "getting all events..."
                            : "get list of all events"}
                    </button>
                </form>

                {error && (
                    <div className="bg-red-500 mt-6 p-4 rounded-lg text-white">
                        {error}
                    </div>
                )}

                {analysis && (
                    <div className="mt-10 space-y-10">

                        {/* Internships */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">
                                💼 Internships
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                {analysis.internships.length > 0 ? (
                                    analysis.internships.map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-800 rounded-xl p-6 shadow-lg"
                                        >
                                            <h3 className="text-xl font-bold text-white">
                                                {item.title}
                                            </h3>

                                            <p className="text-blue-400">
                                                {item.company}
                                            </p>

                                            <p className="text-gray-400 mt-2">
                                                📍 {item.location}
                                            </p>

                                            <p className="text-gray-400">
                                                💻 {item.mode}
                                            </p>

                                            <p className="text-gray-400">
                                                ⏳ {item.duration}
                                            </p>

                                            <p className="text-green-400">
                                                💰 {item.stipend}
                                            </p>

                                            <p className="text-gray-300 mt-2">
                                                {item.description}
                                            </p>

                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {item.skills_required.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>

                                            <a
                                                href={item.application_link}
                                                target="_blank"
                                                className="inline-block mt-4 text-blue-400 hover:underline"
                                            >
                                                Apply →
                                            </a>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400">No internships found.</p>
                                )}
                            </div>
                        </section>

                        {/* Placements */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">
                                🏢 Placements
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                {analysis.placements.length > 0 ? (
                                    analysis.placements.map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-800 rounded-xl p-6"
                                        >
                                            <h3 className="text-xl font-bold text-white">
                                                {item.role}
                                            </h3>

                                            <p className="text-blue-400">
                                                {item.company}
                                            </p>

                                            <p className="text-gray-400">
                                                📍 {item.location}
                                            </p>

                                            <p className="text-green-400">
                                                💰 {item.package}
                                            </p>

                                            <p className="text-gray-300 mt-2">
                                                {item.description}
                                            </p>

                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {item.required_skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="bg-green-600 px-2 py-1 rounded-full text-sm"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>

                                            <a
                                                href={item.apply_link}
                                                target="_blank"
                                                className="inline-block mt-4 text-blue-400 hover:underline"
                                            >
                                                Apply →
                                            </a>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400">No placements found.</p>
                                )}
                            </div>
                        </section>

                        {/* Hackathons */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">
                                🚀 Hackathons
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                {analysis.hackathons.length > 0 ? (
                                    analysis.hackathons.map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-800 rounded-xl p-6"
                                        >
                                            <h3 className="text-xl font-bold text-white">
                                                {item.name}
                                            </h3>

                                            <p className="text-blue-400">
                                                {item.organizer}
                                            </p>

                                            <p className="text-gray-400">
                                                📍 {item.location}
                                            </p>

                                            <p className="text-yellow-400">
                                                🏆 {item.prize_pool}
                                            </p>

                                            <p className="text-gray-300 mt-2">
                                                {item.description}
                                            </p>

                                            <a
                                                href={item.registration_link}
                                                target="_blank"
                                                className="inline-block mt-4 text-blue-400 hover:underline"
                                            >
                                                Register →
                                            </a>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400">No hackathons found.</p>
                                )}
                            </div>
                        </section>

                        {/* Workshops */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">
                                🎓 Workshops
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                {analysis.workshops.length > 0 ? (
                                    analysis.workshops.map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-800 rounded-xl p-6"
                                        >
                                            <h3 className="text-xl font-bold text-white">
                                                {item.title}
                                            </h3>

                                            <p className="text-blue-400">
                                                {item.organizer}
                                            </p>

                                            <p className="text-gray-400">
                                                📅 {item.date}
                                            </p>

                                            <p className="text-gray-400">
                                                ⏳ {item.duration}
                                            </p>

                                            <p className="text-gray-300 mt-2">
                                                {item.description}
                                            </p>

                                            <p className="mt-2 text-green-400">
                                                {item.certificate
                                                    ? "Certificate Available"
                                                    : "No Certificate"}
                                            </p>

                                            <a
                                                href={item.registration_link}
                                                target="_blank"
                                                className="inline-block mt-4 text-blue-400 hover:underline"
                                            >
                                                Register →
                                            </a>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400">No workshops found.</p>
                                )}
                            </div>
                        </section>

                    </div>
                )}
            </div>
        </div>
    )
}