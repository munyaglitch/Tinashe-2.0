import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { type, userData } = await request.json()

    const emailLog = {
      id: `EMAIL-${Date.now()}`,
      type,
      recipient: userData.email,
      name: userData.name,
      amount: userData.amount,
      expiryDate: userData.expiryDate,
      timestamp: new Date().toISOString(),
      status: "sent",
    }

    console.log("[v0] Email would be sent:", emailLog)

    // In production, integrate with email service like Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'Tinashe Sales <noreply@tinashecarsales.com>',
    //   to: userData.email,
    //   subject: type === 'signin' ? 'Welcome back to Tinashe Sales' : 'Your Tinashe Car Sales Subscription Is Active',
    //   html: getEmailTemplate(type, userData)
    // })

    return NextResponse.json({ success: true, log: emailLog })
  } catch (error) {
    console.error("[v0] Email send error:", error)
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 })
  }
}

function getEmailTemplate(
  type: string,
  userData: { name: string; email: string; amount?: string; expiryDate?: string },
): string {
  const firstName = userData.name.split(" ")[0]

  if (type === "signin") {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1e40af; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          ul { list-style: none; padding: 0; }
          li { padding: 8px 0; padding-left: 24px; position: relative; }
          li:before { content: "✓"; position: absolute; left: 0; color: #dc2626; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">Welcome back to Tinashe Sales</h1>
          </div>
          <div class="content">
            <h2>Hi ${firstName},</h2>
            <p>Welcome back to Tinashe Sales 👋</p>
            <p>You've successfully signed in to your account.</p>
            
            <h3>From here, you can:</h3>
            <ul>
              <li>View available vehicles</li>
              <li>Check your enquiries and saved cars</li>
              <li>Contact our sales team directly</li>
            </ul>
            
            <p style="margin-top: 20px; padding: 15px; background: #fee2e2; border-left: 4px solid #dc2626; border-radius: 4px;">
              If this wasn't you or you notice anything unusual, please contact us immediately and we'll sort it out.
            </p>
            
            <p style="margin-top: 30px;">Thank you for choosing Tinashe Sales — we're here to help you find the right car, the right way.</p>
            
            <div class="footer">
              <p><strong>Kind regards,</strong><br><strong>Tinashe Sales Team</strong></p>
              <p>📍 Quality Vehicles | Trusted Service<br>📞 +263 78 393 5399</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  } else if (type === "subscribe") {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10b981; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .checkmark { color: #10b981; font-size: 24px; }
          .details-box { background: #fff; border: 2px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          ul { list-style: none; padding: 0; }
          li { padding: 8px 0; padding-left: 24px; position: relative; }
          li:before { content: "●"; position: absolute; left: 0; color: #10b981; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">Your Tinashe Car Sales Subscription Is Active</h1>
          </div>
          <div class="content">
            <h2>Hi ${firstName},</h2>
            <p>Thank you for subscribing to <strong>Tinashe Car Sales</strong> <span class="checkmark">✓</span></p>
            <p>Your subscription has been <strong>successfully activated</strong>, and you now have full access to subscriber features on our platform.</p>
            
            <h3 style="margin-top: 30px; color: #111;">What you can do now:</h3>
            <ul>
              <li>List your car 5 times a month</li>
              <li>Manage your account and subscription anytime</li>
            </ul>
            
            <div class="details-box">
              <h3 style="margin-top: 0; color: #111;">Subscription Details</h3>
              <p style="margin: 10px 0;"><strong>Amount paid:</strong> ${userData.amount || "$50.00"}</p>
              <p style="margin: 10px 0;"><strong>Valid until:</strong> ${userData.expiryDate || "N/A"}</p>
            </div>
            
            <p>If you have any questions about your subscription or need assistance, feel free to contact us — we're happy to help.</p>
            
            <p style="margin-top: 30px;">Thank you for trusting <strong>Tinashe Car Sales</strong>. We look forward to helping you find the right car.</p>
            
            <div class="footer">
              <p><strong>Kind regards,</strong><br><strong>Tinashe Car Sales Team</strong></p>
              <p>📞 +263 78 393 5399</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  }

  return ""
}
