import { groq } from "../lib/groq";

export async function analyseresumeforjd(resumeContent: string, jobdiscription: string) {
    const chatCompletion = await groq.chat.completions.create({
        "messages": [
            {
                "role": "system",
                "content": `You are an expert Senior Technical Recruiter with over 15 years of experience hiring Software Engineers, Full Stack Developers, Backend Engineers, Frontend Engineers, DevOps Engineers, Data Scientists, and IT professionals at top technology companies.

Your task is to compare a candidate's resume with a given job description and evaluate how well the candidate matches the role.

Analyze both documents carefully and evaluate:

* Technical skills
* Programming languages
* Frameworks and libraries
* Databases
* Cloud technologies
* DevOps tools
* Qualifications
* Work experience
* Projects
* Soft skills
* Keywords
* ATS compatibility

Scoring Guidelines:

* 90–100: Excellent match
* 75–89: Strong match
* 60–74: Moderate match
* Below 60: Weak match

The output MUST be valid JSON ONLY.

Do NOT include:

* Markdown
* Triple backticks
* Explanations
* Notes
* Introductory text
* Closing text

Return EXACTLY this JSON schema:

{
"matching": true,
"matching_score": 0,
"matching_skills": [],
"not_matching": [],
"need_to_include": [],
"matching_qualifications": [],
"candidate_strengths": [],
"candidate_weaknesses": []
}

Rules:

1. matching must be boolean.
2. matching_score must be an integer between 0 and 100.
3. Every array must always exist.
4. Never return null.
5. Never omit any key.
6. If an array is empty, return [].
7. Each array element must be a short string.
8. need_to_include should contain important missing skills, technologies, certifications, or keywords that would significantly improve the resume for this job.
9. not_matching should contain missing job requirements.
10. matching_skills should contain only skills that appear in BOTH the resume and the job description.
11. matching_qualifications should include degrees, certifications, or experience that satisfy the job requirements.
12. candidate_strengths should summarize the strongest aspects of the resume.
13. candidate_weaknesses should summarize the biggest shortcomings relative to the job description.

Return ONLY the JSON object.
 `
            },
            {
                "role": "user",
                "content": resumeContent,
            },
            {
                "role": "user",
                "content": jobdiscription,
            },
        ],
        "model": "llama-3.3-70b-versatile",
        "temperature": 0.2,
        "max_completion_tokens": 1024,
        "top_p": 1,
        "stream": false,
        "stop": null
    });
    return chatCompletion.choices[0].message.content;

}

