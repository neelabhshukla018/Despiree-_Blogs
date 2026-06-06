
import { buildCoverPrompt } from "../utils/promptBuilder.js";
import { generateCoverImage } from "../services/imageService.js";


  import User from "../models/user.js";

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

     const { topic, userId } = req.body;

     const user = await User.findOne({
       clerkId: userId,
     });

     if (!user) {
       return res.status(404).json({
       success: false,
       message: "User not found",
     });
   }

  if (
    !user.isPro &&
    user.freeBlogsUsed >= 5
   ) {
    return res.status(403).json({
      success: false,
      proRequired: true,
      message:
        "𝙊𝙤𝙥𝙨! 𝙁𝙧𝙚𝙚 𝙡𝙞𝙢𝙞𝙩 𝙧𝙚𝙖𝙘𝙝𝙚𝙙. 𝙐𝙥𝙜𝙧𝙖𝙙𝙚 𝙩𝙤 𝘿𝙚𝙎𝙥𝙞𝙧𝙚 𝙋𝙧𝙤.",
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

  𝑻𝒊𝒕𝒍𝒆:
  Create a compelling SEO-friendly title.

  𝑫𝒆𝒔𝒄𝒓𝒊𝒑𝒕𝒊𝒐𝒏:
  Have a space between title and description.
  Write a 2–3 sentence summary.

  𝑪𝒐𝒏𝒕𝒆𝒏𝒕:
  Have a space between description and content. 
  Write a detailed blog between 1200 and 1800 words.

  Requirements:
  Have a space between title, description, and content.
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

  if (!user.isPro) {
    user.freeBlogsUsed += 1;
    await user.save();
  }

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

const generateVisualPrompt =
  async (
    title,
    description,
    client
  ) => {

    const completion =
      await client.chat.completions.create(
        {
          model:
            "llama-3.3-70b-versatile",

          temperature: 0.9,

          max_tokens: 300,

          messages: [
            {
              role: "system",
              content: `
You are an award-winning Hollywood concept artist and magazine cover designer.

Your job is to convert blog topics into cinematic AI image prompts.

Rules:
- Think symbolically.
- Avoid generic robots or people staring at screens.
- Focus on atmosphere and storytelling.
- Make scenes feel emotional and premium.
- Professional editorial quality.
- Ultra realistic.
- Cinematic lighting.
- Rich environmental details.
- No text.
- No logos.
- No watermark.
- 16:9 landscape.
              `,
            },

            {
              role: "user",
              content: `
Blog Title:
${title}

Blog Description:
${description}

Generate one highly detailed image prompt.
              `,
            },
          ],
        }
      );

    return completion
      .choices[0]
      ?.message?.content;
  };

export const generateCover = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      userId,
    } = req.body;



    const user =
      await User.findOne({
        clerkId: userId,
      });

    console.log(
      "FOUND USER:",
      user
    );




    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (
      !user.isPro &&
      user.freeImagesUsed >= 5
    ) {
      return res.status(403).json({
        success: false,
        proRequired: true,
        message:
          "You've reached your 5 free AI image generations. Upgrade to Despire Pro.",
      });
    }

const client =
  new OpenAI({
    baseURL:
      "https://api.groq.com/openai/v1",

    apiKey:
      process.env.GROQ_API_KEY,
  });

const prompt =
  await generateVisualPrompt(
    title,
    description,
    client
  );

console.log(
  "VISUAL PROMPT:"
);

console.log(prompt);

    const imageUrl =
      await generateCoverImage(
        prompt
      );

    if (!user.isPro) {
      user.freeImagesUsed += 1;
      await user.save();
    }

    return res.status(200).json({
      success: true,
      imageUrl,
    });
  } catch (error) {
    console.log(
      "AI COVER ERROR:"
    );
    console.dir(error, {
      depth: null,
    });

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Image generation failed",
    });
  }
};