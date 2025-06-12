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

export const generateChapterContentPrompt = ({
  chapterTitle,
  summary,
  topics,
}: {
  chapterTitle: string;
  summary: string;
  topics: string[];
}) => {
  return `
You are a course content generator.

Generate detailed study material for the chapter titled: "${chapterTitle}".  
Use the following summary for context:

"${summary}"

Cover each of the following topics in order. Expand each topic with deep explanation and examples.

${topics.map((t) => `- ${t}`).join('\n')}

🛑 Output Format Rules (VERY IMPORTANT):
- Output only VALID, browser-ready HTML.
- Do NOT include JSON, markdown, or newline characters like \\n.
- Each topic should be wrapped in a <section> element.
- Use <h2 style="..."> for topic titles and <p> for content.
- Add minimal inline styles to improve legibility.
- DO NOT add <html>, <head>, or <body> tags.
- DO NOT include any commentary or explanation.
- Never return the the entire structure as an object, JSON, or Array.
- Never return an empty string or null.

✅ Example format:

<section style="margin-bottom: 24px;">
  <h2 style="font-size: 1.25rem; font-weight: bold;">Your Topic Title</h2>
  <p style="line-height: 1.6;">Your rich HTML content here with inline styles...</p>
</section>

Now generate the HTML output.
`;
};

