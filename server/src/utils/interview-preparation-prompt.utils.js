const buildContext = ({ companyName, targetRole, jobDescription }) => `
JOB DESCRIPTION (PRIMARY SOURCE):
${jobDescription || "Not provided"}

TARGET ROLE (USE WHEN JD IS ABSENT OR AS ADDITIONAL CONTEXT):
${targetRole || "Not provided"}

COMPANY NAME (CONTEXT ONLY; DO NOT INVENT COMPANY-SPECIFIC PRACTICES):
${companyName || "Not provided"}
`;

const outputRules = (questionCount = "10 to 15") => `
Return ONLY valid JSON. Do not wrap it in Markdown fences or add commentary.
Use this exact shape:
{
  "title": "...",
  "questions": [
    {
      "id": 1,
      "question": "...",
      "answer": "...",
      "explanation": "...",
      "keyPoints": ["..."],
      "difficulty": "Easy|Medium|Hard"
    }
  ]
}
Generate ${questionCount} useful questions. Keep answers accurate and practical.
`;

const existingQuestionsBlock = (existingQuestions = []) =>
  existingQuestions.length
    ? `
EXISTING QUESTIONS TO AVOID REPEATING:
${existingQuestions.map((question, index) => `${index + 1}. ${question.question}`).join("\n")}
`
    : "";

export const buildOAPrompt = (context, existingQuestions = []) =>
  `You are an online-assessment preparation expert.${buildContext(context)}${existingQuestionsBlock(existingQuestions)}
Create preparation questions relevant to the provided JD or target role. Include a balanced mix of aptitude, logical reasoning, verbal ability, coding/problem-solving, and relevant technical concepts. Each question needs an answer, a short explanation, key points, and difficulty. Do not claim these are questions from a specific company.
${outputRules(existingQuestions.length ? "exactly 5 new" : "10 to 15")}${existingQuestions.length ? "Generate new concepts only. Do not repeat the same wording or concept from the existing questions." : ""}`;

export const buildTechnicalInterviewPrompt = (
  context,
  existingQuestions = [],
) =>
  `You are an experienced technical interviewer.${buildContext(context)}${existingQuestionsBlock(existingQuestions)}
Create preparation questions based primarily on the JD. Cover only technologies and skills supported by the JD or target role, including technical concepts, programming, databases, APIs, design concepts when relevant, project-related questions, scenarios, and follow-ups. Each question needs an answer, explanation, key points, and difficulty. Do not invent company-specific questions.
${outputRules(existingQuestions.length ? "exactly 5 new" : "10 to 15")}${existingQuestions.length ? "Generate new concepts only. Do not repeat the same wording or concept from the existing questions." : ""}`;

export const buildHRPrompt = (context, existingQuestions = []) =>
  `You are an experienced HR interviewer.${buildContext(context)}${existingQuestionsBlock(existingQuestions)}
Create preparation questions covering tell me about yourself, role and company motivation, strengths, weaknesses, behavioral and situational questions, teamwork, conflict resolution, career goals, and project-related questions. Provide sample answer guidance without inventing personal information; tell the candidate what to customize. Each question needs an answer, explanation, key points, and difficulty.
${outputRules(existingQuestions.length ? "exactly 5 new" : "10 to 15")}${existingQuestions.length ? "Generate new concepts only. Do not repeat the same wording or concept from the existing questions." : ""}`;
