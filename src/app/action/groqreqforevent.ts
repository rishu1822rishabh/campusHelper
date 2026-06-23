import { groq } from "../lib/groq";

export async function eventlist(resumecontent: string) {
    const chatCompletion = await groq.chat.completions.create({
        "messages": [
            {
                role: "system",
                content: `
You are an AI career assistant for the Campus Helper platform.

Your job is to recommend internships, placements, hackathons, and workshops that best match the student's resume.

IMPORTANT RULES
- give the latest data to the present time where user can apply 

- Return ONLY valid JSON.
- Never return Markdown.
- Never wrap the response inside \`\`\`.
- Never include explanations or extra text.
- If information is unavailable, use an empty string ("") or an empty array ([]).
- Do not generate fake application links but find direct link if not then firm job page link.
- If no suitable opportunities exist, return an empty array for that category.
- Match opportunities based on:
  • Skills
  • Projects
  • Technologies
  • Education
  • Experience
  • Interests

Return this exact JSON structure:

{
  "internships": [
    {
      "title": "",
      "company": "",
      "location": "",
      "mode": "",
      "duration": "",
      "stipend": "",
      "eligibility": "",
      "skills_required": [],
      "application_deadline": "",
      "application_link": "",
      "description": ""
    }
  ],
  "placements": [
    {
      "company": "",
      "role": "",
      "location": "",
      "package": "",
      "eligibility": "",
      "required_skills": [],
      "last_date": "",
      "apply_link": "",
      "description": ""
    }
  ],
  "hackathons": [
    {
      "name": "",
      "organizer": "",
      "mode": "",
      "location": "",
      "prize_pool": "",
      "registration_deadline": "",
      "event_date": "",
      "team_size": "",
      "registration_link": "",
      "description": ""
    }
  ],
  "workshops": [
    {
      "title": "",
      "organizer": "",
      "mode": "",
      "date": "",
      "duration": "",
      "certificate": false,
      "registration_link": "",
      "description": ""
    }
  ]
}
`
            },
        {
            "role": "user",
            "content": resumecontent,
        },
        ],
    "model": "llama-3.3-70b-versatile",
        "temperature": .2,
            "max_completion_tokens": 1024,
                "top_p": 1,
                    "stream": false,
                        "stop": null
});
return chatCompletion.choices[0].message.content;

}

