import { type NextRequest, NextResponse } from "next/server"

// Email sending function using a simple service
async function sendEmail(to: string, subject: string, html: string) {
  try {
    // Using a simple email service - you can replace with SendGrid, Mailgun, etc.
    // For now, we'll use a placeholder that logs the email
    console.log(`[EMAIL] To: ${to}, Subject: ${subject}`)
    console.log(`[EMAIL] HTML: ${html}`)

    // In production, integrate with a service like:
    // - SendGrid: https://sendgrid.com
    // - Mailgun: https://mailgun.com
    // - Resend: https://resend.com
    // - AWS SES: https://aws.amazon.com/ses/

    return true
  } catch (error) {
    console.error("Email sending error:", error)
    return false
  }
}

// WhatsApp notification function
async function sendWhatsAppNotification(phone: string, message: string) {
  try {
    // Using Twilio for WhatsApp (requires setup)
    // For now, we'll use a placeholder
    console.log(`[WHATSAPP] To: ${phone}, Message: ${message}`)

    // In production, integrate with:
    // - Twilio: https://www.twilio.com/whatsapp
    // - WhatsApp Business API

    return true
  } catch (error) {
    console.error("WhatsApp sending error:", error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, email, phone, company, projectDescription, budget, timeline, serviceType } = body

    // Validate required fields
    if (!name || !email || !phone || !projectDescription || !serviceType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Email to client
    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Booking Confirmation</h2>
        <p>Hi ${name},</p>
        <p>Thank you for booking with Ian Iraya! We've received your booking request.</p>
        
        <h3>Booking Details:</h3>
        <ul>
          <li><strong>Service:</strong> ${serviceType}</li>
          <li><strong>Company:</strong> ${company || "N/A"}</li>
          <li><strong>Budget:</strong> ${budget || "Not specified"}</li>
          <li><strong>Timeline:</strong> ${timeline || "Not specified"}</li>
        </ul>
        
        <p><strong>Project Description:</strong></p>
        <p>${projectDescription}</p>
        
        <p>We'll review your request and get back to you within 24 hours via email or WhatsApp.</p>
        
        <p>Best regards,<br/>Ian Iraya</p>
      </div>
    `

    // Email to admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Booking Request</h2>
        
        <h3>Client Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Company:</strong> ${company || "N/A"}</li>
        </ul>
        
        <h3>Booking Details:</h3>
        <ul>
          <li><strong>Service:</strong> ${serviceType}</li>
          <li><strong>Budget:</strong> ${budget || "Not specified"}</li>
          <li><strong>Timeline:</strong> ${timeline || "Not specified"}</li>
        </ul>
        
        <h3>Project Description:</h3>
        <p>${projectDescription}</p>
        
        <p><strong>Action Required:</strong> Review and respond to this booking request.</p>
      </div>
    `

    // Send emails
    await sendEmail(email, "Booking Confirmation - Ian Iraya", clientEmailHtml)
    await sendEmail("jinxed435@gmail.com", "New Booking Request", adminEmailHtml)

    // Send WhatsApp notification
    const whatsappMessage = `Hi ${name}, thank you for booking with Ian Iraya! We've received your ${serviceType} request. We'll get back to you within 24 hours. Contact: +254 756 256 34`
    await sendWhatsAppNotification(phone, whatsappMessage)

    // Store booking in a database (optional)
    // You can integrate with Supabase, MongoDB, etc.
    console.log("[BOOKING] New booking stored:", {
      name,
      email,
      phone,
      serviceType,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        success: true,
        message: "Booking submitted successfully. Check your email and WhatsApp for confirmation.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Booking API error:", error)
    return NextResponse.json({ error: "Failed to process booking" }, { status: 500 })
  }
}
