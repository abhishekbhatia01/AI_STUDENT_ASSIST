export const quiz_prompt = (notes, difficulty) => `
Create a quiz from the study notes below.

Return ONLY valid JSON. Do not use Markdown, code fences, or extra text.
Use exactly this shape:
{"questions":[{"question":"...","options":["...","...","...","..."],"answer":0,"explanation":"..."}]}

Rules:
- Create exactly 10 multiple-choice questions that test important concepts from the notes.
- The difficulty must be ${difficulty}: ${
  difficulty === "easy"
    ? "test definitions and directly stated facts."
    : difficulty === "medium"
      ? "test understanding, comparisons, and applying concepts."
      : "test analysis, edge cases, and multi-step reasoning."
}
- Each question must have exactly 4 options.
- The answer must be the zero-based index of the correct option.
- Keep explanations brief and accurate.
- Do not invent facts that are not supported by the notes.

STUDY NOTES:
${notes}
`;
