import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import express from 'express'
import cors from 'cors'
import { Resend } from 'resend'

const app  = express()
const PORT = 3001

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactPayload {
  from_name:      string
  from_email:     string
  phone:          string
  event_date:     string
  event_type:     string
  guest_count:    string
  message:        string
  preferred_path: string
}

app.post('/api/send', async (req, res) => {
  const {
    from_name, from_email, phone,
    event_date, event_type, guest_count,
    message, preferred_path,
  } = req.body as ContactPayload

  const html = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#43254A;">
      <div style="background:#43254A;padding:32px;text-align:center;">
        <p style="font-size:28px;color:#F0E2E5;margin:0;font-style:italic;">Anchor &amp; Gold Events Co.</p>
        <p style="font-size:11px;color:#C48A8A;letter-spacing:0.15em;text-transform:uppercase;margin:6px 0 0;">New Consultation Request</p>
      </div>

      <div style="padding:32px;background:#FAF6F4;">
        <h2 style="font-size:20px;margin:0 0 4px;">New request from ${from_name}</h2>
        <p style="font-size:12px;color:#C48A8A;margin:0 0 24px;">Submitted via anchorandgoldevents.com</p>

        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr style="border-bottom:1px solid #F0E2E5;">
            <td style="padding:10px 0;font-weight:bold;width:40%;">Name</td>
            <td style="padding:10px 0;">${from_name}</td>
          </tr>
          <tr style="border-bottom:1px solid #F0E2E5;">
            <td style="padding:10px 0;font-weight:bold;">Email</td>
            <td style="padding:10px 0;"><a href="mailto:${from_email}" style="color:#C48A8A;">${from_email}</a></td>
          </tr>
          <tr style="border-bottom:1px solid #F0E2E5;">
            <td style="padding:10px 0;font-weight:bold;">Phone</td>
            <td style="padding:10px 0;">${phone}</td>
          </tr>
          <tr style="border-bottom:1px solid #F0E2E5;">
            <td style="padding:10px 0;font-weight:bold;">Event Date</td>
            <td style="padding:10px 0;">${event_date}</td>
          </tr>
          <tr style="border-bottom:1px solid #F0E2E5;">
            <td style="padding:10px 0;font-weight:bold;">Event Type</td>
            <td style="padding:10px 0;">${event_type}</td>
          </tr>
          <tr style="border-bottom:1px solid #F0E2E5;">
            <td style="padding:10px 0;font-weight:bold;">Guest Count</td>
            <td style="padding:10px 0;">${guest_count}</td>
          </tr>
          <tr style="border-bottom:1px solid #F0E2E5;">
            <td style="padding:10px 0;font-weight:bold;">Preference</td>
            <td style="padding:10px 0;">${preferred_path}</td>
          </tr>
        </table>

        <div style="margin-top:24px;">
          <p style="font-weight:bold;margin-bottom:8px;">Message</p>
          <div style="background:#F0E2E5;padding:16px;font-size:14px;line-height:1.7;white-space:pre-wrap;">${message}</div>
        </div>
      </div>

      <div style="background:#43254A;padding:20px;text-align:center;">
        <p style="font-size:11px;color:#C9A4B0;margin:0;font-style:italic;">Anchored Vision. Gold Standard.</p>
      </div>
    </div>
  `

  try {
    const { error } = await resend.emails.send({
      from:     'Anchor & Gold Website <hello@anchorandgoldevents.com>',
      to:       'abriana@anchorandgoldevents.com',
      replyTo:  from_email,
      subject:  `New Consultation Request — ${from_name}`,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      res.status(500).json({ success: false, error: error.message })
      return
    }

    res.json({ success: true })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ success: false })
  }
})

app.listen(PORT, () => {
  console.log(`  API server running at http://localhost:${PORT}`)
})
