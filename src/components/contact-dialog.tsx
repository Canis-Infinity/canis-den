"use client"

import { useState, type FormEvent } from "react"
import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"
import type { Locale } from "@/data/profile"

type ContactForm = {
  name: string
  email: string
  category: string
  subject: string
  message: string
  replyPreference: string
  acknowledged: boolean
  website: string
}

const initialForm: ContactForm = {
  name: "",
  email: "",
  category: "",
  subject: "",
  message: "",
  replyPreference: "email",
  acknowledged: false,
  website: "",
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const copy = {
  "zh-TW": {
    title: "聯絡九宵",
    description: "填寫以下資料，我會透過 Email 收到你的訊息。",
    name: "你的名字",
    namePlaceholder: "如何稱呼你？",
    nameDescription: "請填寫方便我辨識你的名稱。",
    email: "Email",
    emailPlaceholder: "you@example.com",
    emailDescription: "寄送成功後，我會使用這個地址回覆你。",
    category: "聯絡類型",
    categoryPlaceholder: "選擇最符合的類型",
    categories: [
      { value: "collaboration", label: "合作邀約" },
      { value: "commission", label: "委託詢問" },
      { value: "business", label: "商務聯繫" },
      { value: "feedback", label: "網站回饋" },
      { value: "other", label: "其他事項" },
    ],
    subject: "主旨",
    subjectPlaceholder: "用一句話說明來意",
    subjectDescription: "郵件會自動加上「Canis Den 聯絡表單」前綴。",
    replyPreference: "回覆偏好",
    replyDescription: "告訴我你是否期待收到回覆。",
    replyOptions: [
      { value: "email", label: "需要 Email 回覆" },
      { value: "no-reply", label: "僅提供資訊，不需回覆" },
    ],
    message: "訊息內容",
    messagePlaceholder: "請描述你的需求、時程與其他重要資訊……",
    messageDescription: "建議包含目的、預計時程與希望我如何協助。",
    acknowledged: "我了解上述資料僅用於本次聯絡與回覆",
    acknowledgedDescription: "送出前，請確認你已了解這項資料用途。",
    acknowledgmentRequiredTitle: "尚未確認資料用途",
    acknowledgmentRequiredDescription: "請先勾選資料用途確認，才能寄出訊息。",
    cancel: "取消",
    reset: "重設",
    send: "寄出訊息",
    sending: "寄送中",
    sendingDescription: "正在安全地寄送你的訊息，請稍候。",
    successTitle: "訊息已寄出",
    successDescription: "謝謝你的來信，我會盡快查看。",
    failureTitle: "訊息寄送失敗",
    failureDescription: "請稍後再試，或改用其他聯絡方式。",
    errors: {
      name: "請輸入至少 2 個字元的名稱。",
      email: "請輸入有效的 Email 地址。",
      category: "請選擇聯絡類型。",
      subject: "主旨至少需要 4 個字元。",
      message: "訊息內容至少需要 5 個字元。",
      acknowledged: "請先確認你已了解這項資料用途。",
    },
  },
  en: {
    title: "Contact Canis",
    description:
      "Complete the form below and your message will be sent by email.",
    name: "Your name",
    namePlaceholder: "How should I address you?",
    nameDescription: "Use a name that helps me identify you.",
    email: "Email",
    emailPlaceholder: "you@example.com",
    emailDescription: "I will use this address if a reply is needed.",
    category: "Contact type",
    categoryPlaceholder: "Choose the closest match",
    categories: [
      { value: "collaboration", label: "Collaboration" },
      { value: "commission", label: "Commission inquiry" },
      { value: "business", label: "Business" },
      { value: "feedback", label: "Website feedback" },
      { value: "other", label: "Other" },
    ],
    subject: "Subject",
    subjectPlaceholder: "Summarize your message",
    subjectDescription:
      "The email will include a “Canis Den Contact Form” prefix.",
    replyPreference: "Reply preference",
    replyDescription: "Let me know whether you expect a response.",
    replyOptions: [
      { value: "email", label: "Reply by email" },
      { value: "no-reply", label: "Information only, no reply needed" },
    ],
    message: "Message",
    messagePlaceholder:
      "Describe your request, timeline, and any important details…",
    messageDescription:
      "Include the purpose, expected timeline, and how I can help.",
    acknowledged:
      "I understand this information is only used for this inquiry and reply",
    acknowledgedDescription:
      "Before sending, confirm that you understand how this data is used.",
    acknowledgmentRequiredTitle: "Data use not acknowledged",
    acknowledgmentRequiredDescription:
      "Acknowledge the data use notice before sending your message.",
    cancel: "Cancel",
    reset: "Reset",
    send: "Send message",
    sending: "Sending",
    sendingDescription: "Your message is being sent securely. Please wait.",
    successTitle: "Message sent",
    successDescription: "Thanks for reaching out. I will review it soon.",
    failureTitle: "Message not sent",
    failureDescription: "Please try again later or use another contact method.",
    errors: {
      name: "Enter a name with at least 2 characters.",
      email: "Enter a valid email address.",
      category: "Choose a contact type.",
      subject: "The subject must contain at least 4 characters.",
      message: "The message must contain at least 5 characters.",
      acknowledged: "Please acknowledge how your data will be used.",
    },
  },
} satisfies Record<Locale, unknown>

type ErrorKey = keyof (typeof copy)["zh-TW"]["errors"]
type FormErrors = Partial<Record<ErrorKey, string>>

export function ContactDialog({
  locale,
  triggerLabel,
}: {
  locale: Locale
  triggerLabel: string
}) {
  const text = copy[locale] as (typeof copy)["zh-TW"]
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<ContactForm>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)

  function resetFields() {
    setForm(initialForm)
    setErrors({})
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      resetFields()
    }
    setOpen(nextOpen)
  }

  function updateForm<Key extends keyof ContactForm>(
    key: Key,
    value: ContactForm[Key]
  ) {
    setForm((current) => ({ ...current, [key]: value }))
    if (key in errors) {
      setErrors((current) => ({ ...current, [key]: undefined }))
    }
  }

  function validate() {
    const nextErrors: FormErrors = {}

    if (form.name.trim().length < 2) nextErrors.name = text.errors.name
    if (!emailPattern.test(form.email)) nextErrors.email = text.errors.email
    if (!form.category) nextErrors.category = text.errors.category
    if (form.subject.trim().length < 4) nextErrors.subject = text.errors.subject
    if (form.message.trim().length < 5) nextErrors.message = text.errors.message
    if (!form.acknowledged) nextErrors.acknowledged = text.errors.acknowledged

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!form.acknowledged) {
      setErrors((current) => ({
        ...current,
        acknowledged: text.errors.acknowledged,
      }))
      toast.add({
        title: text.acknowledgmentRequiredTitle,
        description: text.acknowledgmentRequiredDescription,
        type: "warning",
        priority: "high",
      })
      return
    }

    if (!validate()) return

    setSubmitting(true)
    const toastId = toast.add({
      title: text.sending,
      description: text.sendingDescription,
      type: "loading",
      timeout: 0,
    })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      })

      if (!response.ok) throw new Error("Contact request failed")

      toast.update(toastId, {
        title: text.successTitle,
        description: text.successDescription,
        type: "success",
        timeout: 5000,
      })
      setForm(initialForm)
      setErrors({})
      setOpen(false)
    } catch {
      toast.update(toastId, {
        title: text.failureTitle,
        description: text.failureDescription,
        type: "error",
        timeout: 7000,
        priority: "high",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button variant="outline" className="w-full" />}>
        <Mail />
        {triggerLabel}
      </DialogTrigger>

      <DialogContent className="max-h-[min(90svh,48rem)] grid-rows-[auto_minmax(0,1fr)_auto] gap-0 overflow-hidden p-0 sm:max-w-lg">
        <DialogHeader className="border-b px-5 py-4 pr-12">
          <DialogTitle>{text.title}</DialogTitle>
          <DialogDescription>{text.description}</DialogDescription>
        </DialogHeader>

        <form className="contents" onSubmit={handleSubmit} noValidate>
          <div className="min-h-0 overflow-y-auto px-5 py-5">
            <FieldGroup>
              <Field data-invalid={Boolean(errors.name)}>
                <FieldLabel htmlFor="contact-name">{text.name}</FieldLabel>
                <Input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  placeholder={text.namePlaceholder}
                  value={form.name}
                  aria-invalid={Boolean(errors.name)}
                  onChange={(event) => updateForm("name", event.target.value)}
                />
                <FieldDescription>{text.nameDescription}</FieldDescription>
                <FieldError>{errors.name}</FieldError>
              </Field>

              <Field data-invalid={Boolean(errors.email)}>
                <FieldLabel htmlFor="contact-email">{text.email}</FieldLabel>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={text.emailPlaceholder}
                  value={form.email}
                  aria-invalid={Boolean(errors.email)}
                  onChange={(event) => updateForm("email", event.target.value)}
                  onBlur={(event) => {
                    const isValid = emailPattern.test(event.currentTarget.value)
                    setErrors((current) => ({
                      ...current,
                      email: isValid ? undefined : text.errors.email,
                    }))
                  }}
                />
                <FieldDescription>{text.emailDescription}</FieldDescription>
                <FieldError>{errors.email}</FieldError>
              </Field>

              <Field data-invalid={Boolean(errors.category)}>
                <FieldLabel htmlFor="contact-category">
                  {text.category}
                </FieldLabel>
                <Select
                  items={text.categories}
                  value={form.category || null}
                  onValueChange={(value) => updateForm("category", value ?? "")}
                >
                  <SelectTrigger
                    id="contact-category"
                    className="w-full"
                    aria-invalid={Boolean(errors.category)}
                  >
                    <SelectValue placeholder={text.categoryPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {text.categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FieldError>{errors.category}</FieldError>
              </Field>

              <Field data-invalid={Boolean(errors.subject)}>
                <FieldLabel htmlFor="contact-subject">
                  {text.subject}
                </FieldLabel>
                <Input
                  id="contact-subject"
                  name="subject"
                  maxLength={100}
                  placeholder={text.subjectPlaceholder}
                  value={form.subject}
                  aria-invalid={Boolean(errors.subject)}
                  onChange={(event) =>
                    updateForm("subject", event.target.value)
                  }
                />
                <FieldDescription>{text.subjectDescription}</FieldDescription>
                <FieldError>{errors.subject}</FieldError>
              </Field>

              <FieldSet>
                <FieldLegend variant="label">
                  {text.replyPreference}
                </FieldLegend>
                <FieldDescription>{text.replyDescription}</FieldDescription>
                <RadioGroup
                  value={form.replyPreference}
                  onValueChange={(value) =>
                    updateForm("replyPreference", value)
                  }
                >
                  {text.replyOptions.map((option) => {
                    const id = `contact-reply-${option.value}`
                    return (
                      <div
                        key={option.value}
                        className="flex items-center gap-3"
                      >
                        <RadioGroupItem id={id} value={option.value} />
                        <Label htmlFor={id}>{option.label}</Label>
                      </div>
                    )
                  })}
                </RadioGroup>
              </FieldSet>

              <Field data-invalid={Boolean(errors.message)}>
                <FieldLabel htmlFor="contact-message">
                  {text.message}
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    maxLength={3000}
                    placeholder={text.messagePlaceholder}
                    value={form.message}
                    aria-invalid={Boolean(errors.message)}
                    onChange={(event) =>
                      updateForm("message", event.target.value)
                    }
                  />
                  <InputGroupAddon
                    align="block-end"
                    className="justify-between"
                  >
                    <span>{form.message.length}/3000</span>
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription>{text.messageDescription}</FieldDescription>
                <FieldError>{errors.message}</FieldError>
              </Field>

              <Field
                orientation="horizontal"
                data-invalid={Boolean(errors.acknowledged)}
              >
                <Checkbox
                  id="contact-acknowledgment"
                  checked={form.acknowledged}
                  aria-invalid={Boolean(errors.acknowledged)}
                  onCheckedChange={(checked) =>
                    updateForm("acknowledged", checked)
                  }
                />
                <FieldContent>
                  <FieldLabel htmlFor="contact-acknowledgment">
                    {text.acknowledged}
                  </FieldLabel>
                  <FieldDescription>
                    {text.acknowledgedDescription}
                  </FieldDescription>
                  <FieldError>{errors.acknowledged}</FieldError>
                </FieldContent>
              </Field>

              <input
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                name="website"
                value={form.website}
                onChange={(event) => updateForm("website", event.target.value)}
              />
            </FieldGroup>
          </div>

          <DialogFooter className="m-0 shrink-0 rounded-none px-5 py-4">
            <Button
              type="button"
              variant="ghost"
              className="sm:mr-auto"
              disabled={submitting}
              onClick={resetFields}
            >
              {text.reset}
            </Button>
            <DialogClose
              render={<Button type="button" variant="outline" />}
              disabled={submitting}
              onClick={resetFields}
            >
              {text.cancel}
            </DialogClose>
            <Button type="submit" disabled={submitting || !form.acknowledged}>
              {submitting && <Spinner data-icon="inline-start" />}
              {submitting ? text.sending : text.send}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
