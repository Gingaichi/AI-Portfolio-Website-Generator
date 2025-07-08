import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { idea, tone, audience, theme } = req.body;

  const prompt = `Generate a landing page with Tailwind CSS and modern HTML.
Business idea: ${idea}
Tone: ${tone}
Audience: ${audience}
Theme: ${theme}
Include a hero section, features, and call-to-action.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });

  const html = completion.choices[0].message.content;
  res.status(200).json({ html });
}
