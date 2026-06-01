import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

export const generateBlog = async (req, res) => {
  try {
    console.log(
      "GROQ KEY EXISTS:",
      !!process.env.GROQ_API_KEY
    );

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "GROQ_API_KEY is missing on server",
      });
    }

    const client = new OpenAI({
      baseURL: "https://api.groq.com/openai/v1",
      apiKey: process.env.GROQ_API_KEY,
    });

    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    const completion =
      await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 3000,
        messages: [
          {
            role: "system",
            content: `
You are a professional journalist and long-form blog writer.

Rules:
- Write accurate and informative content
- Do not use markdown symbols such as ** or *
- Do not use bullet points or numbered lists
- Do not use headings inside the blog content
- Write in clear, engaging, professional English
- Every paragraph should contain 5–7 sentences
- Content should flow naturally like a long-form article
            `,
          },
          {
            role: "user",
            content: `
Write a professional blog post on:

"${topic}"

Return the response in exactly this format:

TITLE:
Create a compelling SEO-friendly title.

DESCRIPTION:
Write a 2–3 sentence summary.

CONTENT:
Write a detailed blog between 1200 and 1800 words.

Requirements:
- Begin with a strong introduction
- Cover history, context, major developments, impact, significance, and future outlook
- Use only full paragraphs
- No bullet points
- No numbered lists
- No markdown
- No bold text
- Smooth transitions between paragraphs
- Professional and engaging tone
            `,
          },
        ],
      });

    console.log("Usage:", completion.usage);

    let text =
      completion.choices[0]?.message?.content || "";

    text = text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/#{1,6}\s/g, "")
      .replace(/^\s*[-•]\s/gm, "")
      .replace(/^\s*\d+\.\s/gm, "");

    return res.status(200).json({
      success: true,
      text,
    });
  } catch (error) {
    console.log("FULL AI ERROR:");
    console.dir(error, { depth: null });

    return res.status(500).json({
      success: false,
      message:
        error?.response?.data?.error?.message ||
        error?.error?.message ||
        error?.message ||
        "AI generation failed",
    });
  }
};