import React from "react";
import { Lightbulb, ArrowUpCircle } from "lucide-react";

interface NeedToImproveProps {
    analysisneedtoimprove: string[];
}

const Improvement = ({
    analysisneedtoimprove,
}: NeedToImproveProps) => {
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
            hover:border-yellow-400/40
            hover:shadow-yellow-500/20
            lg:col-span-2
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
                    from-yellow-400
                    to-amber-600
                    shadow-lg
                    shadow-yellow-500/30
                    "
                >
                    <Lightbulb className="h-7 w-7 text-white" />
                </div>

                <div>
                    <h2 className="text-xl font-bold text-white">
                        Need to Improve
                    </h2>

                    <p className="text-sm text-gray-400">
                        Suggestions to improve your resume
                    </p>
                </div>
            </div>

            {/* Suggestions */}
            <div className="space-y-3">
                {analysisneedtoimprove.map((item, index) => (
                    <div
                        key={index}
                        className="
                        flex
                        items-start
                        gap-3
                        rounded-2xl
                        border
                        border-yellow-400/20
                        bg-yellow-500/10
                        p-4
                        transition-all
                        duration-300
                        hover:bg-yellow-500/20
                        "
                    >
                        <ArrowUpCircle
                            className="mt-1 shrink-0 text-yellow-400"
                            size={20}
                        />

                        <p className="text-gray-200 leading-6">
                            {item}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Improvement;