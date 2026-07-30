export async function sendContactEmail({
  apiKey,
  sender,
  recipient,
  replyTo,
  subject,
  html,
  text,
}: {
  apiKey: string
  sender: string
  recipient: string
  replyTo: string
  subject: string
  html: string
  text: string
}) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      reply_to: replyTo,
      subject,
      html,
      text,
    }),
  })

  if (!response.ok) {
    throw new Error(`Resend contact email failed: ${response.status}`)
  }
}
