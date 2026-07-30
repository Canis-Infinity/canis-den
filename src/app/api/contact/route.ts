import { createContactEmail } from "@/features/contact/contact-email"
import { sendContactEmail } from "@/features/contact/contact-email-service"
import { getContactEnvironment } from "@/features/contact/contact-env"
import { parseContactRequest } from "@/features/contact/contact-request"
import { resolveLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"

export async function POST(request: Request) {
  const environment = getContactEnvironment()

  if (!environment.success) {
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

  const locale = resolveLocale(
    typeof body === "object" && body !== null && "locale" in body
      ? body.locale
      : undefined
  )
  const dictionary = getDictionary(locale)
  const categories = new Map<string, string>(
    dictionary.contact.categories.map((item) => [item.value, item.label])
  )
  const contact = parseContactRequest(body, new Set(categories.keys()))

  if (!contact) {
    return Response.json(
      { error: "The submitted form is invalid." },
      { status: 422 }
    )
  }

  if (contact.website) {
    return Response.json({ ok: true })
  }

  const email = createContactEmail({
    request: contact,
    categoryLabel: categories.get(contact.category) ?? contact.category,
    copy: dictionary.contactEmail,
  })

  try {
    await sendContactEmail({
      apiKey: environment.data.RESEND_API_KEY,
      sender: environment.data.CONTACT_FROM_EMAIL,
      recipient: environment.data.CONTACT_TO_EMAIL,
      replyTo: contact.email,
      ...email,
    })
  } catch (error) {
    console.error(error)
    return Response.json({ error: "Email delivery failed." }, { status: 502 })
  }

  return Response.json({ ok: true })
}
