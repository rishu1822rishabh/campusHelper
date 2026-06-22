import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ScoreCard({
    value,
    title,
}: {
    value: number;
    title: string;
}) {
    return (
        <div className="bg-gray-800 p-6 w-100 rounded-xl flex flex-col items-center">
            <div className="w-32 h-32">
                <CircularProgressbar
                    value={value * 10}
                    text={`${value}/10`}
                />
            </div>

            <h3 className="text-white mt-4 font-semibold">
                {title}
            </h3>
        </div>
    );
}