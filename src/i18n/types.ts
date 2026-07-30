export type ContactCategory =
  "collaboration" | "commission" | "business" | "feedback" | "other"

export type ReplyPreference = "email" | "no-reply"
export type DomainKey = "general" | "afterDark" | "work"

export type LocalizedOption<Value extends string = string> = {
  value: Value
  label: string
}

export type Dictionary = {
  profile: {
    contact: string
    language: string
    themeToggle: string
    backToTop: string
    linksLabel: string
  }
  command: {
    open: string
    title: string
    description: string
    placeholder: string
    empty: string
    actions: string
  }
  domains: Record<
    DomainKey,
    {
      label: string
      description: string
      tooltip: string
    }
  >
  agePrompt: {
    title: string
    description: string
    cancel: string
    confirm: string
  }
  ageDenied: {
    title: string
    description: string
    chooseGeneral: string
    chooseWork: string
  }
  externalLink: {
    title: string
    description: string
    destination: string
    cancel: string
    confirm: string
  }
  cookies: {
    title: string
    description: string
    details: string
    necessaryOnly: string
    acceptPreferences: string
    settings: string
  }
  footer: {
    rightsReserved: string
  }
  contact: {
    title: string
    description: string
    name: string
    namePlaceholder: string
    nameDescription: string
    email: string
    emailPlaceholder: string
    emailDescription: string
    category: string
    categoryPlaceholder: string
    categories: readonly LocalizedOption<ContactCategory>[]
    subject: string
    subjectPlaceholder: string
    subjectDescription: string
    replyPreference: string
    replyDescription: string
    replyOptions: readonly LocalizedOption<ReplyPreference>[]
    message: string
    messagePlaceholder: string
    messageDescription: string
    acknowledged: string
    acknowledgedDescription: string
    acknowledgmentRequiredTitle: string
    acknowledgmentRequiredDescription: string
    cancel: string
    reset: string
    send: string
    sending: string
    sendingDescription: string
    successTitle: string
    successDescription: string
    failureTitle: string
    failureDescription: string
    errors: {
      name: string
      email: string
      category: string
      subject: string
      message: string
      acknowledged: string
    }
  }
  status: {
    notFoundTitle: string
    notFoundDescription: string
    errorTitle: string
    errorDescription: string
    errorCode: string
    errorReference: string
    home: string
    retry: string
  }
  contactEmail: {
    subjectPrefix: string
    replyRequested: string
    noReplyNeeded: string
    from: string
    reply: string
    sentAt: string
    subject: string
    message: string
    footer: string
  }
}
