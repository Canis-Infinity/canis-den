import type { Dictionary } from "@/i18n/types"

export const zhTW = {
  profile: {
    contact: "聯絡我",
    language: "語言",
    themeToggle: "切換主題",
    backToTop: "回到最上方",
    linksLabel: "主要連結",
  },
  command: {
    open: "搜尋",
    title: "快速指令",
    description: "搜尋連結或快速開啟動作。",
    placeholder: "搜尋連結...",
    empty: "找不到符合的項目。",
    actions: "操作",
  },
  domains: {
    general: {
      label: "一般領域",
      description:
        "嗷嗷！這裡收著我的社群足跡、日常出沒地點，還有一些想和你分享的小東西，歡迎到處晃晃🐾",
      tooltip: "嗷嗷！來看看我的日常足跡吧🐾",
    },
    afterDark: {
      label: "深夜領域",
      description:
        "嗷嗚，深夜領域收著成人向或敏感內容，年滿 18 歲再跟著我的腳印繼續探索喔⚠️",
      tooltip: "嗷嗚，年滿 18 歲再繼續探索喔⚠️",
    },
    work: {
      label: "工作領域",
      description:
        "嗷！作品、合作與專業相關的連結都整理在這裡，有想一起完成的點子也歡迎來找我！",
      tooltip: "嗷！這裡收著我的作品與專業足跡。",
    },
  },
  agePrompt: {
    title: "你已年滿 18 歲嗎？",
    description: "深夜領域可能包含成人內容，請確認你已年滿 18 歲。",
    cancel: "尚未滿 18 歲",
    confirm: "我已年滿 18 歲",
  },
  ageDenied: {
    title: "現在還不能進去喔",
    description:
      "嗷嗚，深夜領域只開放給年滿 18 歲的訪客。先選一個領域，跟著我的腳印去別處晃晃吧🐾",
    chooseGeneral: "前往一般領域",
    chooseWork: "前往工作領域",
  },
  externalLink: {
    title: "即將前往外部網站",
    description:
      "嗷，這個連結會帶你離開 Canis Den。外部網站的內容、Cookie 與隱私政策將由該網站負責。目的地：",
    destination: "即將前往",
    cancel: "留在這裡",
    confirm: "繼續前往",
  },
  cookies: {
    title: "Cookie 小提醒",
    description:
      "嗷嗷！這個網站會使用第一方 Cookie，記住你的語言與 Cookie 偏好。",
    details:
      "選擇「僅使用必要 Cookie」時，不會保存語言偏好；本站目前不使用廣告或分析 Cookie。你可以隨時從頁尾重新開啟設定。",
    necessaryOnly: "僅使用必要 Cookie",
    acceptPreferences: "允許偏好 Cookie",
    settings: "Cookie 設定",
  },
  footer: {
    rightsReserved: "保留所有權利",
  },
  contact: {
    title: "聯絡九宵",
    description: "填寫以下資料，我會透過 Email 收到你的訊息。",
    name: "你的名字",
    namePlaceholder: "如何稱呼你？",
    nameDescription: "請填寫方便我辨識你的名稱。",
    email: "Email",
    emailPlaceholder: "例如：example@gmail.com",
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
  status: {
    notFoundTitle: "找不到頁面",
    notFoundDescription: "這個入口可能已移除、改名，或暫時不存在。",
    errorTitle: "頁面暫時無法載入",
    errorDescription:
      "伺服器處理頁面時發生內部錯誤。你可以重新載入，若問題持續發生，請提供下方錯誤識別碼。",
    errorCode: "500",
    errorReference: "錯誤識別碼",
    home: "回到首頁",
    retry: "重新載入",
  },
  contactEmail: {
    subjectFormat: "【九宵基地／{type}】{subject}",
    replyRequested: "希望收到 Email 回覆",
    noReplyNeeded: "不需回覆",
    from: "寄件人",
    reply: "回覆偏好",
    sentAt: "時間",
    subject: "主旨",
    message: "訊息內容",
    footer: "此郵件由 Canis Den 聯絡表單自動寄送。",
  },
} satisfies Dictionary
