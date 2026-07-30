"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
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
import { emailPattern } from "@/features/contact/contact-validation"
import type { useContactForm } from "@/features/contact/use-contact-form"
import type { Dictionary } from "@/i18n/types"

type ContactFormState = ReturnType<typeof useContactForm>

export function ContactForm({
  copy,
  state,
}: {
  copy: Dictionary["contact"]
  state: ContactFormState
}) {
  const { form, errors, submitting, reset, setErrors, update, submit } = state

  return (
    <form className="contents" onSubmit={submit} noValidate>
      <div className="min-h-0 overflow-y-auto px-5 py-5">
        <FieldGroup>
          <Field data-invalid={Boolean(errors.name)}>
            <FieldLabel htmlFor="contact-name">{copy.name}</FieldLabel>
            <Input
              id="contact-name"
              name="name"
              autoComplete="name"
              placeholder={copy.namePlaceholder}
              value={form.name}
              aria-invalid={Boolean(errors.name)}
              onChange={(event) => update("name", event.target.value)}
            />
            <FieldDescription>{copy.nameDescription}</FieldDescription>
            <FieldError>{errors.name}</FieldError>
          </Field>

          <Field data-invalid={Boolean(errors.email)}>
            <FieldLabel htmlFor="contact-email">{copy.email}</FieldLabel>
            <Input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={copy.emailPlaceholder}
              value={form.email}
              aria-invalid={Boolean(errors.email)}
              onChange={(event) => update("email", event.target.value)}
              onBlur={(event) => {
                const valid = emailPattern.test(event.currentTarget.value)
                setErrors((current) => ({
                  ...current,
                  email: valid ? undefined : copy.errors.email,
                }))
              }}
            />
            <FieldDescription>{copy.emailDescription}</FieldDescription>
            <FieldError>{errors.email}</FieldError>
          </Field>

          <Field data-invalid={Boolean(errors.category)}>
            <FieldLabel htmlFor="contact-category">{copy.category}</FieldLabel>
            <Select
              items={copy.categories}
              value={form.category || null}
              onValueChange={(value) => update("category", value ?? "")}
            >
              <SelectTrigger
                id="contact-category"
                className="w-full"
                aria-invalid={Boolean(errors.category)}
              >
                <SelectValue placeholder={copy.categoryPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {copy.categories.map((category) => (
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
            <FieldLabel htmlFor="contact-subject">{copy.subject}</FieldLabel>
            <Input
              id="contact-subject"
              name="subject"
              maxLength={100}
              placeholder={copy.subjectPlaceholder}
              value={form.subject}
              aria-invalid={Boolean(errors.subject)}
              onChange={(event) => update("subject", event.target.value)}
            />
            <FieldDescription>{copy.subjectDescription}</FieldDescription>
            <FieldError>{errors.subject}</FieldError>
          </Field>

          <FieldSet>
            <FieldLegend variant="label">{copy.replyPreference}</FieldLegend>
            <FieldDescription>{copy.replyDescription}</FieldDescription>
            <RadioGroup
              value={form.replyPreference}
              onValueChange={(value) => update("replyPreference", value)}
            >
              {copy.replyOptions.map((option) => {
                const id = `contact-reply-${option.value}`
                return (
                  <div key={option.value} className="flex items-center gap-3">
                    <RadioGroupItem id={id} value={option.value} />
                    <Label htmlFor={id}>{option.label}</Label>
                  </div>
                )
              })}
            </RadioGroup>
          </FieldSet>

          <Field data-invalid={Boolean(errors.message)}>
            <FieldLabel htmlFor="contact-message">{copy.message}</FieldLabel>
            <InputGroup>
              <InputGroupTextarea
                id="contact-message"
                name="message"
                rows={6}
                maxLength={3000}
                placeholder={copy.messagePlaceholder}
                value={form.message}
                aria-invalid={Boolean(errors.message)}
                onChange={(event) => update("message", event.target.value)}
              />
              <InputGroupAddon align="block-end" className="justify-between">
                <span>{form.message.length}/3000</span>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>{copy.messageDescription}</FieldDescription>
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
              onCheckedChange={(checked) => update("acknowledged", checked)}
            />
            <FieldContent>
              <FieldLabel htmlFor="contact-acknowledgment">
                {copy.acknowledged}
              </FieldLabel>
              <FieldDescription>{copy.acknowledgedDescription}</FieldDescription>
              <FieldError>{errors.acknowledged}</FieldError>
            </FieldContent>
          </Field>

          <input
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            name="website"
            value={form.website}
            onChange={(event) => update("website", event.target.value)}
          />
        </FieldGroup>
      </div>

      <DialogFooter className="m-0 shrink-0 rounded-none px-5 py-4">
        <Button
          type="button"
          variant="ghost"
          className="sm:mr-auto"
          disabled={submitting}
          onClick={reset}
        >
          {copy.reset}
        </Button>
        <DialogClose
          render={<Button type="button" variant="outline" />}
          disabled={submitting}
          onClick={reset}
        >
          {copy.cancel}
        </DialogClose>
        <Button type="submit" disabled={submitting || !form.acknowledged}>
          {submitting && <Spinner data-icon="inline-start" />}
          {submitting ? copy.sending : copy.send}
        </Button>
      </DialogFooter>
    </form>
  )
}
