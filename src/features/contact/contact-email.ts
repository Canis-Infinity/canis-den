import type { ContactRequest } from "@/features/contact/contact.types"
import { localeFormats } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

export function createContactEmail({
  request,
  categoryLabel,
  copy,
}: {
  request: ContactRequest
  categoryLabel: string
  copy: Dictionary["contactEmail"]
}) {
  const { locale, name, email, subject, message, replyPreference } = request
  const emailSubject = `[${copy.subjectPrefix}][${categoryLabel}] ${subject}`
  const replyLabel =
    replyPreference === "email" ? copy.replyRequested : copy.noReplyNeeded
  const sentAt = new Intl.DateTimeFormat(localeFormats[locale].dateTime, {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Taipei",
  }).format(new Date())
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />")

  const html = `<!doctype html>
<html lang="${locale}">
  <body style="margin:0;background:#f5f5f5;color:#171717;font-family:'Noto Sans TC',Arial,sans-serif;">
    <div style="padding:32px 16px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e5e5;border-radius:16px;overflow:hidden;">
        <tr><td style="padding:28px 32px;background:#171717;color:#ffffff;"><div style="font-size:12px;letter-spacing:.12em;opacity:.7;">CANIS DEN</div><h1 style="margin:8px 0 0;font-size:22px;line-height:1.4;">${escapeHtml(categoryLabel)}</h1></td></tr>
        <tr><td style="padding:28px 32px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;line-height:1.7;">
            <tr><td style="padding:6px 0;color:#737373;width:96px;">${copy.from}</td><td style="padding:6px 0;font-weight:600;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:6px 0;color:#737373;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#171717;">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:6px 0;color:#737373;">${copy.reply}</td><td style="padding:6px 0;">${escapeHtml(replyLabel)}</td></tr>
            <tr><td style="padding:6px 0;color:#737373;">${copy.sentAt}</td><td style="padding:6px 0;">${escapeHtml(sentAt)}</td></tr>
          </table>
          <div style="height:1px;background:#e5e5e5;margin:24px 0;"></div>
          <div style="font-size:12px;color:#737373;margin-bottom:6px;">${copy.subject}</div>
          <div style="font-size:17px;font-weight:700;line-height:1.5;margin-bottom:20px;">${escapeHtml(subject)}</div>
          <div style="font-size:12px;color:#737373;margin-bottom:8px;">${copy.message}</div>
          <div style="padding:18px;background:#fafafa;border-radius:12px;font-size:15px;line-height:1.8;word-break:break-word;">${safeMessage}</div>
        </td></tr>
        <tr><td style="padding:18px 32px;background:#fafafa;color:#737373;font-size:12px;line-height:1.6;">${copy.footer}</td></tr>
      </table>
    </div>
  </body>
</html>`

  const text = [
    emailSubject,
    "",
    `${copy.from}: ${name}`,
    `Email: ${email}`,
    `${copy.reply}: ${replyLabel}`,
    `${copy.sentAt}: ${sentAt}`,
    "",
    message,
  ].join("\n")

  return { subject: emailSubject, html, text }
}
