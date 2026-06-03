import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const ai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
});

export default ai;