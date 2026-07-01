import React from "react";
import { TriangleAlert, CircleX } from "lucide-react";

interface WeaknessProps {
    analysisweakness: string[];
}

const Weakness = ({ analysisweakness }: WeaknessProps) => {
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
            hover:border-red-400/40
            hover:shadow-red-500/20
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
                    from-red-400
                    to-rose-600
                    shadow-lg
                    shadow-red-500/30
                    "
                >
                    <TriangleAlert className="h-7 w-7 text-white" />
                </div>

                <div>

                    <h2 className="text-xl font-bold text-white">
                        Weaknesses
                    </h2>

                    <p className="text-sm text-gray-400">
                        Areas that need attention
                    </p>

                </div>

            </div>

            {/* Weakness List */}

            <div className="space-y-3">

                {analysisweakness.map((item, index) => (

                    <div
                        key={index}
                        className="
                        flex
                        items-start
                        gap-3
                        rounded-2xl
                        border
                        border-red-400/20
                        bg-red-500/10
                        p-4
                        transition-all
                        duration-300
                        hover:bg-red-500/20
                        "
                    >
                        <CircleX
                            size={20}
                            className="mt-0.5 shrink-0 text-red-400"
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

export default Weakness;