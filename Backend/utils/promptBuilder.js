export const buildCoverPrompt = (
  title,
  description
) => {
  return `
You are an expert visual artist creating a premium hero image for a modern AI-powered blogging platform.

Blog Title:
"${title}"

Blog Description:
"${description}"

Create a visually stunning image that perfectly represents the story, emotions, and overall theme of the article.

Image Style:
- Ultra realistic digital artwork
- Cinematic storytelling
- Professional editorial quality
- Modern and premium aesthetic
- Rich details and beautiful composition
- Dramatic natural lighting
- Vibrant but realistic colors
- Highly detailed environment
- High resolution
- 16:9 landscape aspect ratio

Requirements:
- The image should immediately attract readers.
- It should feel like a featured article thumbnail.
- The artwork should emotionally connect with the blog topic.
- Generate a unique scene instead of a simple object or portrait.

Strictly Avoid:
- Any text
- Titles
- Captions
- Logos
- Watermarks
- UI elements
- Borders
- Low-quality or blurry output

The final image should look like a professional magazine cover illustration created for a world-class blogging platform.
`;
};