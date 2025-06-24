// import nodemailer from 'nodemailer';
// import { NextResponse } from "next/server"




// export async function POST(req: Request) {
//   const { name, email, message } = await req.json()

//   // Create a transporter using SMTP
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_SERVER,
//     port: Number.parseInt(process.env.EMAIL_PORT || "587"),
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//     secure: false, // Use TLS
//     tls: {
//       ciphers: "SSLv3",
//     },
//   })

//   try {
//     // Send email
//     await transporter.sendMail({
//       from: process.env.EMAIL_FROM,
//       to: process.env.EMAIL_TO,
//       subject: "New Contact Form Submission",
//       text: `
//         Name: ${name}
//         Email: ${email}
//         Message: ${message}
//       `,
//       html: `
//         <h1>New Contact Form Submission</h1>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Message:</strong> ${message}</p>
//       `,
//     })

//     return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
//   } catch (error) {
//     console.error("Error sending email:", error)
//     return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
//   }
// }

import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { name, email, message } = await req.json()

  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  // HTML template for the email
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .email-container {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 30px;
        }
        h1 {
          color: #0070f3;
          border-bottom: 2px solid #0070f3;
          padding-bottom: 10px;
          margin-top: 0;
          font-size: 24px;
          text-align: center;
        }
        .field {
          margin-bottom: 20px;
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 5px;
          border-left: 4px solid #0070f3;
        }
        .field strong {
          display: block;
          margin-bottom: 5px;
          color: #0070f3;
          font-size: 16px;
        }
        .message {
          background-color: #e9ecef;
          padding: 15px;
          border-radius: 5px;
          font-style: italic;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <h1>New Contact Form Submission</h1>
        <div class="field">
          <strong>Name:</strong>
          ${name}
        </div>
        <div class="field">
          <strong>Email:</strong>
          ${email}
        </div>
        <div class="field">
          <strong>Message:</strong>
          <div class="message">${message}</div>
        </div>
        <div class="footer">
          This email was sent from your website's contact form. Please respond promptly.
        </div>
      </div>
    </body>
    </html>
  `

  try {
    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: "New Contact Form Submission",
      html: htmlTemplate,
    })

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}

