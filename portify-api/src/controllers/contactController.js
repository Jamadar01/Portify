const nodemailer = require('nodemailer')
const Portfolio = require('../models/Portfolio')
const User = require('../models/User')

function createTransport() {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

async function sendContact(req, res) {
  try {
    const { name, email, message } = req.body
    if (!name || !email || !message) return res.status(400).json({ error: 'Name, email, and message are required' })

    const portfolio = await Portfolio.findOne({ slug: req.params.slug, isPublic: true })
    if (!portfolio) return res.status(404).json({ error: 'Portfolio not found' })

    const owner = await User.findById(portfolio.userId).select('email name')
    if (!owner) return res.status(404).json({ error: 'Portfolio owner not found' })

    const transporter = createTransport()

    await transporter.sendMail({
      from: `"Portify Contact" <${process.env.EMAIL_USER}>`,
      to: owner.email,
      replyTo: email,
      subject: `New message from your Portify portfolio — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">New Contact Message</h2>
          <p>Someone reached out through your Portify portfolio.</p>
          <hr style="border-color: #e5e7eb;" />
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <blockquote style="border-left: 3px solid #7c3aed; padding-left: 12px; color: #374151;">
            ${message.replace(/\n/g, '<br/>')}
          </blockquote>
          <hr style="border-color: #e5e7eb;" />
          <p style="color: #9ca3af; font-size: 12px;">Sent via Portify — portify.app</p>
        </div>
      `,
    })

    res.json({ message: 'Message sent successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { sendContact }
