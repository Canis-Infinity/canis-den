import { profileData } from "@/data/profile"

const categories: Record<string, { "zh-TW": string; en: string }> = {
  collaboration: { "zh-TW": "合作邀約", en: "Collaboration" },
  commission: { "zh-TW": "委託詢問", en: "Commission inquiry" },
  business: { "zh-TW": "商務聯繫", en: "Business" },
  feedback: { "zh-TW": "網站回饋", en: "Website feedback" },
  other: { "zh-TW": "其他事項", en: "Other" },
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function readString(
  record: Record<string, unknown>,
  key: string,
  maxLength: number
) {
  const value = record[key]
  return typeof value === "string" ? value.trim().slice(0, maxLength) : ""
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const recipient = process.env.CONTACT_TO_EMAIL ?? profileData.email
  const sender =
    process.env.CONTACT_FROM_EMAIL ??
    "Canis Den Contact <onboarding@resend.dev>"

  if (!apiKey) {
    return Response.json(
      { error: "Email service is not configured." },
      { status: 503 }
    )
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  if (!isRecord(body)) {
    return Response.json({ error: "Invalid request body." }, { status: 400 })
  }

  const name = readString(body, "name", 80)
  const email = readString(body, "email", 254)
  const category = readString(body, "category", 40)
  const subject = readString(body, "subject", 100)
  const message = readString(body, "message", 3000)
  const replyPreference = readString(body, "replyPreference", 20)
  const locale = body.locale === "en" ? "en" : "zh-TW"
  const acknowledged = body.acknowledged === true
  const website = readString(body, "website", 200)

  if (website) {
    return Response.json({ ok: true })
  }

  if (
    name.length < 2 ||
    !emailPattern.test(email) ||
    !categories[category] ||
    subject.length < 4 ||
    message.length < 5 ||
    !["email", "no-reply"].includes(replyPreference) ||
    !acknowledged
  ) {
    return Response.json(
      { error: "The submitted form is invalid." },
      { status: 422 }
    )
  }

  const categoryLabel = categories[category][locale]
  const subjectPrefix =
    locale === "zh-TW" ? "Canis Den 聯絡表單" : "Canis Den Contact Form"
  const emailSubject = `[${subjectPrefix}][${categoryLabel}] ${subject}`
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />")
  const sentAt = new Intl.DateTimeFormat(
    locale === "zh-TW" ? "zh-TW" : "en-US",
    {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Asia/Taipei",
    }
  ).format(new Date())
  const replyLabel =
    replyPreference === "email"
      ? locale === "zh-TW"
        ? "希望收到 Email 回覆"
        : "Email reply requested"
      : locale === "zh-TW"
        ? "不需回覆"
        : "No reply needed"

  const html = `
<!doctype html>
<html lang="${locale}">
  <body style="margin:0;background:#f5f5f5;color:#171717;font-family:'Noto Sans TC',Arial,sans-serif;">
    <div style="padding:32px 16px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e5e5;border-radius:16px;overflow:hidden;">
        <tr>
          <td style="padding:28px 32px;background:#171717;color:#ffffff;">
            <div style="font-size:12px;letter-spacing:.12em;opacity:.7;">CANIS DEN</div>
            <h1 style="margin:8px 0 0;font-size:22px;line-height:1.4;">${escapeHtml(categoryLabel)}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;line-height:1.7;">
              <tr><td style="padding:6px 0;color:#737373;width:96px;">${locale === "zh-TW" ? "寄件人" : "From"}</td><td style="padding:6px 0;font-weight:600;">${escapeHtml(name)}</td></tr>
              <tr><td style="padding:6px 0;color:#737373;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#171717;">${escapeHtml(email)}</a></td></tr>
              <tr><td style="padding:6px 0;color:#737373;">${locale === "zh-TW" ? "回覆偏好" : "Reply"}</td><td style="padding:6px 0;">${escapeHtml(replyLabel)}</td></tr>
              <tr><td style="padding:6px 0;color:#737373;">${locale === "zh-TW" ? "時間" : "Sent at"}</td><td style="padding:6px 0;">${escapeHtml(sentAt)}</td></tr>
            </table>
            <div style="height:1px;background:#e5e5e5;margin:24px 0;"></div>
            <div style="font-size:12px;color:#737373;margin-bottom:6px;">${locale === "zh-TW" ? "主旨" : "Subject"}</div>
            <div style="font-size:17px;font-weight:700;line-height:1.5;margin-bottom:20px;">${escapeHtml(subject)}</div>
            <div style="font-size:12px;color:#737373;margin-bottom:8px;">${locale === "zh-TW" ? "訊息內容" : "Message"}</div>
            <div style="padding:18px;background:#fafafa;border-radius:12px;font-size:15px;line-height:1.8;word-break:break-word;">${safeMessage}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:18px 32px;background:#fafafa;color:#737373;font-size:12px;line-height:1.6;">
            ${locale === "zh-TW" ? "此郵件由 Canis Den 聯絡表單自動寄送。" : "Sent automatically from the Canis Den contact form."}
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>`

  const text = [
    emailSubject,
    "",
    `${locale === "zh-TW" ? "寄件人" : "From"}: ${name}`,
    `Email: ${email}`,
    `${locale === "zh-TW" ? "回覆偏好" : "Reply"}: ${replyLabel}`,
    `${locale === "zh-TW" ? "時間" : "Sent at"}: ${sentAt}`,
    "",
    message,
  ].join("\n")

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      reply_to: email,
      subject: emailSubject,
      html,
      text,
    }),
  })

  if (!response.ok) {
    console.error("Resend contact email failed:", response.status)
    return Response.json({ error: "Email delivery failed." }, { status: 502 })
  }

  return Response.json({ ok: true })
}
