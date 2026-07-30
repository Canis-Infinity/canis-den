"use client"

import { useState, type FormEvent } from "react"

import { toast } from "@/components/ui/toast"
import { submitContactForm } from "@/features/contact/contact-client"
import {
  initialContactForm,
  type ContactCopy,
  type ContactFormErrors,
  type ContactFormValues,
} from "@/features/contact/contact.types"
import { validateContactForm } from "@/features/contact/contact-validation"
import type { Locale } from "@/i18n/config"

export function useContactForm({
  locale,
  copy,
  onSuccess,
}: {
  locale: Locale
  copy: ContactCopy
  onSuccess: () => void
}) {
  const [form, setForm] = useState<ContactFormValues>(initialContactForm)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [submitting, setSubmitting] = useState(false)

  function reset() {
    setForm(initialContactForm)
    setErrors({})
  }

  function update<Key extends keyof ContactFormValues>(
    key: Key,
    value: ContactFormValues[Key]
  ) {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateContactForm(form, copy)

    if (!form.acknowledged) {
      toast.add({
        title: copy.acknowledgmentRequiredTitle,
        description: copy.acknowledgmentRequiredDescription,
        type: "warning",
        priority: "high",
      })
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setSubmitting(true)
    const toastId = toast.add({
      title: copy.sending,
      description: copy.sendingDescription,
      type: "loading",
      timeout: 0,
    })

    try {
      await submitContactForm({ ...form, locale })
      toast.update(toastId, {
        title: copy.successTitle,
        description: copy.successDescription,
        type: "success",
        timeout: 5000,
      })
      reset()
      onSuccess()
    } catch {
      toast.update(toastId, {
        title: copy.failureTitle,
        description: copy.failureDescription,
        type: "error",
        timeout: 7000,
        priority: "high",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return { form, errors, submitting, reset, setErrors, update, submit }
}
