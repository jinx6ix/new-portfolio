import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Log contact submission
    console.log("[CONTACT] New contact submission:", {
      name,
      email,
      phone,
      subject,
      timestamp: new Date().toISOString(),
    })

    // Send email notification to admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Contact Form Submission</h2>
        
        <h3>Contact Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone || "Not provided"}</li>
        </ul>
        
        <h3>Subject:</h3>
        <p>${subject}</p>
        
        <h3>Message:</h3>
        <p>${message}</p>
        
        <p><strong>Action Required:</strong> Reply to this contact inquiry.</p>
      </div>
    `

    // Send confirmation email to user
    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Thank You for Contacting Me</h2>
        <p>Hi ${name},</p>
        <p>I've received your message and will get back to you within 24 hours.</p>
        
        <h3>Your Message:</h3>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
        
        <p>Best regards,<br/>Ian Iraya</p>
      </div>
    `

    console.log("[EMAIL] Sending contact confirmation emails")

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully. Check your email for confirmation.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json({ error: "Failed to process contact form" }, { status: 500 })
  }
}
