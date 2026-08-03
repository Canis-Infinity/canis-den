import type { ContactRequest } from "@/features/contact/contact.types"

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || ""

export async function submitContactForm(request: ContactRequest) {
  const response = await fetch(`${apiBaseUrl}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error("Contact request failed")
  }
}
