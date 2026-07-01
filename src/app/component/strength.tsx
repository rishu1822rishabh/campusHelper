import React from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

interface StrengthProps {
    analysisstrength: string[];
}

const Strength = ({ analysisstrength }: StrengthProps) => {
    return (
        <div
            className="
            group
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-2xl
            p-6
            shadow-[0_8px_30px_rgba(0,0,0,0.3)]
            transition-all
            duration-300
            hover:-translate-y-2
            hover:border-green-400/40
            hover:shadow-green-500/20
            "
        >
            {/* Header */}

            <div className="mb-6 flex items-center gap-4">

                <div
                    className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-green-400
                    to-emerald-600
                    shadow-lg
                    shadow-green-500/30
                    "
                >
                    <ShieldCheck className="h-7 w-7 text-white" />
                </div>

                <div>

                    <h2 className="text-xl font-bold text-white">
                        Strengths
                    </h2>

                    <p className="text-sm text-gray-400">
                        Highlights of your resume
                    </p>

                </div>

            </div>

            {/* List */}

            <div className="space-y-3">

                {analysisstrength.map((item, index) => (

                    <div
                        key={index}
                        className="
                        flex
                        items-start
                        gap-3
                        rounded-2xl
                        border
                        border-green-400/20
                        bg-green-500/10
                        p-4
                        transition-all
                        duration-300
                        hover:bg-green-500/20
                        "
                    >
                        <CheckCircle2
                            size={20}
                            className="mt-0.5 shrink-0 text-green-400"
                        />

                        <p className="leading-6 text-gray-200">
                            {item}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default Strength;