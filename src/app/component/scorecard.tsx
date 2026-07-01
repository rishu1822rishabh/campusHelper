import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface ScoreCardProps {
    value: number;
    title: string;
}

export default function ScoreCard({
    value,
    title,
}: ScoreCardProps) {
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
            shadow-[0_8px_30px_rgba(0,0,0,0.35)]
            transition-all
            duration-300
            hover:-translate-y-2
            hover:border-cyan-400/40
            hover:shadow-cyan-500/20
            flex
            flex-col
            items-center
            "
        >
            <div className="relative h-36 w-36">

                {/* Glow behind progress bar */}

                <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-2xl group-hover:bg-cyan-400/30 transition-all" />

                <CircularProgressbar
                    value={value * 10}
                    text={`${value}/10`}
                    styles={buildStyles({
                        pathColor: "#22d3ee",
                        trailColor: "rgba(255,255,255,0.08)",
                        textColor: "#ffffff",
                        textSize: "18px",
                        strokeLinecap: "round",
                    })}
                />

            </div>

            <h3 className="mt-6 text-lg font-semibold text-white text-center">
                {title}
            </h3>

            <p className="mt-2 text-sm text-gray-400">
                Resume Evaluation
            </p>
        </div>
    );
}