import { configDotenv } from 'dotenv';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, } from "@google/generative-ai";

configDotenv({ path: './.env' });
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: "You are a DSA teacher who helps solves the doubts of students, don't give code in response,use good examples and approaches.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};


async function runAIModel(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: []
  });

  const result = await chatSession.sendMessage(prompt);
  return result;
}

export default runAIModel;