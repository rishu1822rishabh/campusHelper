import { groq } from "../lib/groq";

export async function generalquestion(content: string) {
    const chatCompletion = await groq.chat.completions.create({
        "messages": [
            {
                "role": "user",
                "content": content,
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

