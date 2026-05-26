const pdfParse = require('pdf-parse')
const Groq = require('groq-sdk')

async function parseResume(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: 'PDF file is required' })

    const { text } = await pdfParse(req.file.buffer)
    const resumeText = text.trim()

    if (!resumeText) return res.status(422).json({ error: 'Could not extract text from PDF' })

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are a resume parser. Extract structured data and return ONLY valid JSON with no markdown, no code blocks, no extra text.',
        },
        {
          role: 'user',
          content: `Extract data from this resume and return ONLY this JSON structure (no markdown):

{
  "name": "Full name",
  "role": "Current or most recent job title",
  "bio": "A 2-3 sentence professional summary",
  "email": "Email address or empty string",
  "skills": ["skill1", "skill2"],
  "experience": [
    { "company": "Company name", "role": "Job title", "period": "e.g. 2020 — Present", "description": "Key responsibilities and achievements" }
  ],
  "projects": [
    { "title": "Project name", "description": "What it does", "link": "" }
  ],
  "education": [
    { "institution": "School name", "degree": "Degree name", "year": "Year" }
  ],
  "socials": { "github": "", "linkedin": "", "twitter": "" }
}

Resume:
${resumeText}`,
        },
      ],
      temperature: 0.1,
    })

    const content = completion.choices[0].message.content.trim()
    const portfolioData = JSON.parse(content)
    res.json({ data: portfolioData })
  } catch (err) {
    if (err instanceof SyntaxError) {
      return res.status(500).json({ error: 'Failed to parse AI response as JSON' })
    }
    res.status(500).json({ error: err.message })
  }
}

module.exports = { parseResume }
