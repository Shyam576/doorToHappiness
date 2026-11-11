// Conversational basics (greetings, thanks, "what can you do") that a visitor
// naturally tries first, before asking a real question. These aren't in
// faq.json and never will be — they're not Bhutan facts, they're how any
// chatbot is expected to behave — so without this, the very first message
// most people send gets the "I don't know, try WhatsApp" fallback, which
// makes the whole feature feel broken before it's had a chance to help.
interface SmallTalkRule {
  patterns: RegExp[]
  reply: string
}

const RULES: SmallTalkRule[] = [
  {
    patterns: [/^(hi|hello|hey|hiya|yo|good\s?(morning|afternoon|evening))\b/],
    reply: "Hi there! I can answer quick questions about visiting Bhutan — ask away, or tap one of the suggestions below.",
  },
  {
    patterns: [/\b(thank(s| you)|thx|thank\s?u)\b/],
    reply: "You're welcome! Let me know if you have any other questions.",
  },
  {
    patterns: [/\b(who are you|what (can|do) you (do|help)|can you help|help me)\b/],
    reply:
      "I'm a quick-answer assistant for common questions about visiting Bhutan — things like visas, altitude sickness, currency, and local customs. Ask me anything, and if I can't help, I'll connect you to WhatsApp.",
  },
  {
    patterns: [/^(bye|goodbye|see\s?you|cya)\b/],
    reply: "Goodbye! Feel free to reach out anytime.",
  },
]

export function getSmallTalkReply(query: string): string | null {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return null

  const matchedRule = RULES.find((rule) => rule.patterns.some((pattern) => pattern.test(normalized)))
  return matchedRule ? matchedRule.reply : null
}
