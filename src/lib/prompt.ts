// const STUDY_GUILD_PROMPT_TEMPLATE = `
// Generate a study guide for {topic} for a {studyType} course. 
// The level of difficulty is {difficulty}. 
// Include a course summary and list of chapters with summaries.
// All results must be returned in valid JSON format.
// `;


type PromptInput = {
    topic: string;
    studyType: string;
    difficulty: string;
};

export function formatStudyGuidePrompt(input:PromptInput): string {
     return `
You are an AI specialized in educational content generation.

Generate a study guide for the topic: **${input.topic}** for a ${input.studyType} course. 
The difficulty level should be **${input.difficulty}**.

Follow this exact JSON structure:

${STUDY_GUIDE_EXAMPLE_FORMAT}

Your entire output must be valid JSON — no commentary, no markdown, just the JSON.
Make sure it includes:
- A title
- A course summary
- A "chapters" array with 8–10 chapters, each with a title and summary.
`;
}


export const STUDY_GUIDE_EXAMPLE_FORMAT = `
{
  "studyGuideTitle": "<Title of the Guide>",
  "levelOfDifficulty": "<Easy | Moderate | Hard>",
  "studySummary": "<Brief summary of what the guide covers>",
  "chapters": [
    {
      "chapterTitle": "Chapter 1: <Title>",
      "summary": "<Concise explanation of what this chapter includes>",
      "topics": ["<Topic 1>", "<Topic 2>", "<Topic 3>"]
    }
    // ... more chapters
  ]
}
`;
