import { generateText } from "ai"

export async function POST(req: Request) {
  const { dilemma, cardType } = await req.json()

  if (!dilemma) {
    return Response.json({ error: "Please enter your dilemma first" }, { status: 400 })
  }

  const prompts: Record<string, string> = {
    pros: `Given this decision/dilemma: "${dilemma}", list 3-4 key pros or benefits of taking this action. Be concise and specific. Format as bullet points.`,
    cons: `Given this decision/dilemma: "${dilemma}", list 3-4 key cons or drawbacks of taking this action. Be concise and specific. Format as bullet points.`,
    gut: `Given this decision/dilemma: "${dilemma}", help explore gut feelings by asking 2-3 introspective questions about how this decision feels emotionally. Be empathetic and thoughtful.`,
    impact: `Given this decision/dilemma: "${dilemma}", analyze 2-3 potential long-term impacts (1-5 years) of this decision. Consider career, relationships, personal growth, and well-being. Be insightful.`,
  }

  const { text } = await generateText({
    model: "openai/gpt-4o-mini",
    prompt: prompts[cardType] || prompts.pros,
    maxOutputTokens: 500,
    temperature: 0.7,
  })

  return Response.json({ text })
}
