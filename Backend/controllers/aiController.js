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

    const completion =
      await client.chat.completions.create({

        model: "meta-llama/llama-3.1-8b-instruct",

        messages: [
          {
            role: "user",

            content: `
            Write a professional modern blog on:

            ${topic}

            FORMAT:

            TITLE:
            Blog title

            DESCRIPTION:
            Short description

            CONTENT:
            Full blog content
            `,
          },
        ],

      });

    const text =
      completion.choices[0].message.content;

    res.status(200).json({

      success: true,

      text,

    });

  } catch (error) {

    console.log("FULL AI ERROR:", error);

    res.status(500).json({

      success: false,

      message:
        error?.error?.message ||
        error.message,

    });

  }
};