import { Groq } from "groq-sdk/client.js";

export const groq=new Groq({
    apiKey:process.env.GROQ_API,
});