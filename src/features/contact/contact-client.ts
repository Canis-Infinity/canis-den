import type { ContactRequest } from "@/features/contact/contact.types"

export async function submitContactForm(request: ContactRequest) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error("Contact request failed")
  }
}
