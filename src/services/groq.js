import axios from "axios";

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
console.log("Groq API key loaded:", !!API_KEY);

export async function analyzeResumeWithGroq(resumeText) {
  console.log("Resume text received:", resumeText);
  const prompt = `
You are an expert ATS Resume Analyzer.

Analyze the resume and return the response in EXACTLY this format.

ATS Score: XX/100

Resume Summary:
- point 1
- point 2
- point 3
- point 4
- point 5
- point 6
Write the Resume Summary as exactly 6  bullet points.
Do not write long sentences or paragraph.
Each point should be 20-25 words only .

Missing Skills:
- Skill 1
- Skill 2
- Skill 3

Strengths:
- Point 1
- Point 2
- Point 3

Weaknesses:
- Point 1
- Point 2
- Point 3

Suggestions:
- Suggestion 1
- Suggestion 2
- Suggestion 3

Interview Questions:
- Question 1
- Question 2
- Question 3
- Question 4
- Question 5

Recommended Courses:
- Course 1
- Course 2
- Course 3
- Course 4
- Course 5

Do not add any introduction, explanation, markdown, or extra text.
Return only the sections above in exactly the same order.

Resume:
${resumeText}`;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
}