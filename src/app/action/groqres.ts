import { groq } from "../lib/groq";

export async function analyseresume(resumeContent:string) {
    const chatCompletion = await groq.chat.completions.create({
        "messages": [
            {
                "role": "system",
                "content": "Act as a senior technical recruiter with extensive experience hiring software engineers and IT professionals. Analyze the provided resume from a recruiter's perspective and conduct a thorough evaluation. Assess the resume's structure, formatting, technical skills, projects, work experience, achievements, and overall impact. Identify strengths, weaknesses, missing information, and potential red flags that could affect the candidate's chances of securing interviews. Provide actionable recommendations to improve the resume, including suggestions for content, wording, quantifiable achievements, ATS (Applicant Tracking System) optimization, and industry best practices. Finally, rate the resume on a scale of 1–10 for both recruiter appeal and ATS compatibility, and provide a revised version of any weak sections."
            },
            {
                "role": "user",
                "content":resumeContent,
            },
        ],
        "model": "llama-3.3-70b-versatile",
        "temperature": 1,
        "max_completion_tokens": 1024,
        "top_p": 1,
        "stream": false,
        "stop": null
    });
    return chatCompletion.choices[0].message.content;

}

