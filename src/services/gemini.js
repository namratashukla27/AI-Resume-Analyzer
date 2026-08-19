import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

export async function analyzeResumeWithAI(resumeText) {

  const prompt = `
You are an ATS Resume Analyzer.

Analyze this resume.

Give response ONLY in this format:

ATS Score: number/100

Missing Skills:
- skill 1
- skill 2

Strengths:
- point 1
- point 2

Weaknesses:
- point 1
- point 2

Suggestions:
- suggestion 1
- suggestion 2


Resume:
${resumeText}
`;

  const result = await model.generateContent(prompt);

  const response = await result.response;

  return response.text();
}