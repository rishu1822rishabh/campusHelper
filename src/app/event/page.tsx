
import EventlistClient from "../component/eventlist";
import JdAnalyzerClient from "../component/jdanalysisclient";
import ResumeAnalyzerClient from "../component/resumeanalyserclient";
import { getCurrentUser } from "../lib/auth";

export default async function JdAnalyzerPage() {
    const user = await getCurrentUser();

    return <EventlistClient user={user} />;
}