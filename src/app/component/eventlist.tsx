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
        user?.resumedata.trim() || ""
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

        setResumeContent(data.text.trim());
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
        <div className="relative min-h-screen overflow-hidden bg-[#09090B] px-6 py-12">

            {/* Background */}
            <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[180px]" />
            <div className="absolute right-0 top-40 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[180px]" />
            <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[150px]" />

            <div className="relative z-10 max-w-5xl mx-auto">

                <div className="mb-10 text-center">
                    <span className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1 text-sm font-semibold text-cyan-300 backdrop-blur-xl">
                        📅 Campus Opportunities
                    </span>

                    <h1 className="mt-5 text-4xl font-black text-white">
                        Get List of All
                        <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent"> Events</span>
                    </h1>

                    <p className="mt-4 text-gray-400">
                        Upload your resume to find internships, placements, hackathons and workshops matched to you.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl shadow-black/40">

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
                            className="rounded-xl border border-white/10 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white transition duration-300 hover:scale-105"
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
                                className="mt-6 w-full h-72 rounded-xl border border-white/10 bg-black/30 p-4 text-white outline-none backdrop-blur-xl"
                            />
                        )}
                    </div>

                    <div className="flex justify-center">
                        <button
                            disabled={loading}
                            className="rounded-2xl bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 px-10 py-3 font-bold text-white shadow-xl transition duration-300 hover:scale-105 hover:shadow-cyan-500/30 disabled:opacity-40"
                        >
                            {loading
                                ? "getting all events..."
                                : "get list of all events"}
                        </button>
                    </div>
                </form>

                {error && (
                    <div className="mt-6 rounded-md border border-red-500/20 bg-red-500/10 p-4 text-red-300 backdrop-blur-xl">
                        {error}
                    </div>
                )}

                {analysis && (
                    <div className="mt-10 space-y-14">

                        {/* Internships */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6">
                                💼 Internships
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                {analysis.internships.length > 0 ? (
                                    analysis.internships.map((item, index) => (
                                        <div
                                            key={index}
                                            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl shadow-2xl shadow-black/30  hover:shadow-gray-400/30 transition duration-300 hover:border-cyan-400/30"
                                        >
                                            <h3 className="text-xl font-bold text-white">
                                                {item.title}
                                            </h3>

                                            <p className="text-cyan-300">
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

                                            <p className="text-emerald-300">
                                                💰 {item.stipend}
                                            </p>

                                            <p className="text-gray-300 mt-2">
                                                {item.description}
                                            </p>

                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {item.skills_required.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2 py-1 text-sm text-cyan-300"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>

                                            <a
                                                href={item.application_link}
                                                target="_blank"
                                                className="inline-block mt-4 text-cyan-300 hover:text-cyan-200 hover:underline"
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
                            <h2 className="text-2xl font-bold text-white mb-6">
                                🏢 Placements
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                {analysis.placements.length > 0 ? (
                                    analysis.placements.map((item, index) => (
                                        <div
                                            key={index}
                                            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl shadow-2xl shadow-black/30  hover:shadow-gray-400/30 transition duration-300 hover:border-emerald-400/30"
                                        >
                                            <h3 className="text-xl font-bold text-white">
                                                {item.role}
                                            </h3>

                                            <p className="text-cyan-300">
                                                {item.company}
                                            </p>

                                            <p className="text-gray-400">
                                                📍 {item.location}
                                            </p>

                                            <p className="text-emerald-300">
                                                💰 {item.package}
                                            </p>

                                            <p className="text-gray-300 mt-2">
                                                {item.description}
                                            </p>

                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {item.required_skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-1 text-sm text-emerald-300"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>

                                            <a
                                                href={item.apply_link}
                                                target="_blank"
                                                className="inline-block mt-4 text-cyan-300 hover:text-cyan-200 hover:underline"
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
                            <h2 className="text-2xl font-bold text-white mb-6">
                                🚀 Hackathons
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                {analysis.hackathons.length > 0 ? (
                                    analysis.hackathons.map((item, index) => (
                                        <div
                                            key={index}
                                            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl shadow-2xl shadow-black/30  hover:shadow-gray-400/30 transition duration-300 hover:border-violet-400/30"
                                        >
                                            <h3 className="text-xl font-bold text-white">
                                                {item.name}
                                            </h3>

                                            <p className="text-cyan-300">
                                                {item.organizer}
                                            </p>

                                            <p className="text-gray-400">
                                                📍 {item.location}
                                            </p>

                                            <p className="text-amber-300">
                                                🏆 {item.prize_pool}
                                            </p>

                                            <p className="text-gray-300 mt-2">
                                                {item.description}
                                            </p>

                                            <a
                                                href={item.registration_link}
                                                target="_blank"
                                                className="inline-block mt-4 text-cyan-300 hover:text-cyan-200 hover:underline"
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
                            <h2 className="text-2xl font-bold text-white mb-6">
                                🎓 Workshops
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                {analysis.workshops.length > 0 ? (
                                    analysis.workshops.map((item, index) => (
                                        <div
                                            key={index}
                                            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl shadow-2xl hover:shadow-gray-400/30 transition duration-300 hover:border-cyan-400/30"
                                        >
                                            <h3 className="text-xl font-bold text-white">
                                                {item.title}
                                            </h3>

                                            <p className="text-cyan-300">
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

                                            <p className="mt-2 text-emerald-300">
                                                {item.certificate
                                                    ? "Certificate Available"
                                                    : "No Certificate"}
                                            </p>

                                            <a
                                                href={item.registration_link}
                                                target="_blank"
                                                className="inline-block mt-4 text-cyan-300 hover:text-cyan-200 hover:underline"
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