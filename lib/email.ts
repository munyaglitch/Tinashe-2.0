import nodemailer from "nodemailer"

type SendEmailOptions = {
  to: string
  subject: string
  text?: string
  html?: string
}

type EmailLog = {
  to: string
  subject: string
  timestamp: string
  sent: boolean
  info?: any
}

const host = process.env.EMAIL_SMTP_HOST
const port = Number(process.env.EMAIL_SMTP_PORT ?? "587")
const secure = process.env.EMAIL_SMTP_SECURE === "true"
const user = process.env.EMAIL_SMTP_USER
const pass = process.env.EMAIL_SMTP_PASS
const fromAddress = process.env.EMAIL_FROM ?? "no-reply@tinashecars.com"

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null

function getTransporter() {
  if (transporter) {
    return transporter
  }
  if (!host) {
    return null
  }
  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
  })
  return transporter
}

export async function sendEmail(options: SendEmailOptions) {
  const transporter = getTransporter()
  const log: EmailLog = {
    to: options.to,
    subject: options.subject,
    timestamp: new Date().toISOString(),
    sent: false,
  }
  if (!transporter) {
    console.warn(
      "[lib/email] SMTP not configured; skipping send and logging payload",
      options,
    )
    log.sent = false
    log.info = "SMTP not configured"
    return { success: true, log }
  }
  try {
    const info = await transporter.sendMail({
      from: fromAddress,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    })
    log.sent = true
    log.info = info
    return { success: true, log }
  } catch (error) {
    log.info = error
    console.error("[lib/email] Failed to send email:", error)
    return { success: false, log }
  }
}
