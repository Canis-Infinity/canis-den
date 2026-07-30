import type { Dictionary } from "@/i18n/types"

export const en = {
  profile: {
    contact: "Contact me",
    language: "Language",
    themeToggle: "Toggle theme",
    backToTop: "Back to top",
    linksLabel: "Main links",
  },
  command: {
    open: "Search",
    title: "Command Palette",
    description: "Search links or run quick actions.",
    placeholder: "Search links...",
    empty: "No results found.",
    actions: "Actions",
  },
  domains: {
    general: {
      label: "General",
      description:
        "Awooo! This is where I keep my social trails, everyday hangouts, and little things I’d love to share. Feel free to wander around 🐾",
      tooltip: "Awooo! Come explore my everyday trails 🐾",
    },
    afterDark: {
      label: "After Dark",
      description:
        "Awoo, After Dark is home to adult or sensitive content. Follow my pawprints and keep exploring only if you’re 18 or older ⚠️",
      tooltip: "Awoo, keep exploring only if you’re 18 or older ⚠️",
    },
    work: {
      label: "Work",
      description:
        "Awo! I’ve gathered all my work, collaboration, and professional links here. If you have an idea we could bring to life together, come find me!",
      tooltip: "Awo! Follow my work and professional trails.",
    },
  },
  agePrompt: {
    title: "Are you 18 or older?",
    description:
      "The After Dark section may contain adult content. Please confirm that you are at least 18 years old.",
    cancel: "I am under 18",
    confirm: "I am 18 or older",
  },
  ageDenied: {
    title: "Not quite yet",
    description:
      "Awoo, After Dark is only open to visitors aged 18 or older. Pick another trail and follow my pawprints there for now 🐾",
    chooseGeneral: "Go to General",
    chooseWork: "Go to Work",
  },
  externalLink: {
    title: "You’re leaving Canis Den",
    description:
      "Awo, this link leads to an external website. Its content, cookies, and privacy practices are managed by that site. Destination:",
    destination: "Opening",
    cancel: "Stay here",
    confirm: "Continue",
  },
  cookies: {
    title: "A quick cookie note",
    description:
      "Awooo! This site uses first-party cookies to remember your language and cookie preferences.",
    details:
      "If you choose necessary cookies only, your language preference will not be saved. This site currently uses no advertising or analytics cookies. You can reopen these settings from the footer at any time.",
    necessaryOnly: "Necessary only",
    acceptPreferences: "Allow preference cookies",
    settings: "Cookie settings",
  },
  footer: {
    rightsReserved: "All rights reserved.",
  },
  contact: {
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
  status: {
    notFoundTitle: "Page not found",
    notFoundDescription:
      "This entry may have been removed, renamed, or is temporarily unavailable.",
    errorTitle: "Something went wrong",
    errorDescription:
      "The server encountered an internal error while processing this page. Try again, or provide the error reference below if the problem continues.",
    errorCode: "500",
    errorReference: "Error reference",
    home: "Back home",
    retry: "Try again",
  },
  contactEmail: {
    subjectFormat: "【九宵基地／{type}】{subject}",
    replyRequested: "Email reply requested",
    noReplyNeeded: "No reply needed",
    from: "From",
    reply: "Reply",
    sentAt: "Sent at",
    subject: "Subject",
    message: "Message",
    footer: "Sent automatically from the Canis Den contact form.",
  },
} satisfies Dictionary
