import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const generateBlog = async (req, res) => {
  try {
    const { topic } = req.body;

    const completion = await client.chat.completions.create({
      model: "anthropic/claude-sonnet-4-5",
      max_tokens: 8000,
      messages: [
        {
          role: "system",
          content: `You are a professional journalist and long-form blog writer with expertise across sports, travel, technology, politics, and culture. Follow these rules without any exception:
- Only write facts that are accurate and verifiable
- Never hallucinate names, dates, statistics, or events
- Do not use any markdown symbols such as ** or * anywhere in your response
- Do not use headings, subheadings, or section titles anywhere in the content
- Do not use bullet points or numbered lists anywhere
- Do not use bold or italic text anywhere
- Every paragraph must be at least 5 to 7 sentences long
- The entire blog content must be a minimum of 3500 words
- Write only in clear, fluent, authoritative, and engaging English prose
- The output must read like a single flowing essay with no structure labels`,
        },
        {
          role: "user",
          content: `Write a comprehensive, well-researched, and professional blog post on the following topic:

"${topic}"

You must follow this exact format and nothing else:

TITLE:
Write a compelling and SEO-friendly title for the blog

DESCRIPTION:
Write a 2 to 3 sentence engaging summary that hooks the reader and clearly explains what the blog covers

CONTENT:
Write an extremely detailed and long blog post with a strict minimum of 3500 words.

Do not use any headings, subheadings, or section titles anywhere inside the content. Do not use bullet points, numbered lists, or bold text anywhere. The entire content must flow as one continuous piece of writing using only full paragraphs.

Begin with a powerful introduction of at least 4 to 5 paragraphs giving deep background context, origin, history, and importance of the topic. Set the stage fully before diving into the details.

After the introduction write a long continuous series of detailed paragraphs that naturally cover every important angle related to the topic. Depending on the topic this must include key events, turning points, statistics, expert perspectives, historical context, human stories, criticisms, impact, global relevance, and future outlook. Every paragraph must connect smoothly to the next using natural transition phrases. Each paragraph must be at least 5 to 7 sentences long and packed with specific detail.

End with a powerful closing of 3 to 4 paragraphs that reflects on the broader significance, lasting legacy, and what the future holds.

Strict rules you must follow without exception:
- Total word count for CONTENT must be at least 3500 words
- No headings, subheadings, or section labels anywhere in the content
- No markdown symbols such as ** or * anywhere in the response
- No bullet points or numbered lists anywhere
- No bold or italic formatting anywhere
- Every paragraph must be at least 5 to 7 sentences long
- Only use verified and accurate facts
- Use smooth natural transitions between every paragraph
- Write in a confident, authoritative, and engaging tone throughout
- The writing must read like a single flowing long-form essay`,
        },
      ],
    });

    let text = completion.choices[0].message.content;

    // Strip all markdown formatting
    text = text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/#{1,6}\s/g, "")
      .replace(/^\s*[-•]\s/gm, "")
      .replace(/^\s*\d+\.\s/gm, "");

    res.status(200).json({
      success: true,
      text,
    });
  } catch (error) {
    console.log("FULL AI ERROR:", error);
    res.status(500).json({
      success: false,
      message: error?.error?.message || error.message,
    });
  }
};