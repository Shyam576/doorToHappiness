import React, { useState } from 'react'
import faqData from '../data/faq.json'
import { findBestFaqMatch, FaqEntry } from '../lib/faq-matcher'
import { getSmallTalkReply } from '../lib/small-talk'

const faqs = faqData as FaqEntry[]
const SUGGESTED_QUESTION_COUNT = 4

interface ChatWidgetProps {
  phoneNumber: string // The WhatsApp phone number (with country code)
  fallbackMessage?: string // Prefix added before the visitor's question when handing off to WhatsApp
}

interface ChatMessage {
  role: 'user' | 'bot'
  text: string
  whatsappHandoff?: string // Set when the bot couldn't answer confidently
}

function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
  phoneNumber,
  fallbackMessage = "I have a question and couldn't find the answer on your site",
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const askQuestion = (question: string) => {
    const trimmed = question.trim()
    if (!trimmed) return

    const smallTalkReply = getSmallTalkReply(trimmed)
    const match = smallTalkReply ? null : findBestFaqMatch(trimmed, faqs)
    const botMessage: ChatMessage = smallTalkReply
      ? { role: 'bot', text: smallTalkReply }
      : match
      ? { role: 'bot', text: match.entry.answer }
      : {
          role: 'bot',
          text: "I'm not confident I can answer that correctly — let's get you a real person on WhatsApp.",
          whatsappHandoff: buildWhatsAppUrl(phoneNumber, `${fallbackMessage}: ${trimmed}`),
        }

    setMessages((prev) => [...prev, { role: 'user', text: trimmed }, botMessage])
    setInputValue('')
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    askQuestion(inputValue)
  }

  return (
    <div className="fixed bottom-4 right-4 z-[1000] sm:bottom-6 sm:right-6">
      {isOpen && (
        <div role="dialog" aria-label="Chat with Door to Happiness Holiday" className="mb-3 flex animate-page-in max-h-[70vh] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-stone-200 bg-brand-ivory shadow-[0_24px_60px_-20px_rgba(10,40,30,0.45)]">
          <div className="flex items-center justify-between bg-emerald-950 px-5 py-4 text-white">
            <span className="font-heading text-lg font-medium">Ask us <em className="font-normal text-amber-200">anything</em></span>
            <div className="flex items-center gap-3">
              <a
                href={buildWhatsAppUrl(phoneNumber, fallbackMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center text-xs underline underline-offset-2 hover:text-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-200"
              >
                Prefer WhatsApp?
              </a>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="inline-flex h-11 w-11 items-center justify-center text-2xl leading-none text-white hover:text-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-200"
              >
                &times;
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4 text-sm">
            {messages.length === 0 && (
              <div>
                <p className="mb-3 text-stone-600">
                  Hi! Ask me a quick question about visiting Bhutan, or try one of these:
                </p>
                <div className="flex flex-col gap-2">
                  {faqs.slice(0, SUGGESTED_QUESTION_COUNT).map((faq) => (
                    <button
                      key={faq.question}
                      type="button"
                      onClick={() => askQuestion(faq.question)}
                      className="min-h-[44px] border border-stone-300 px-3 py-2 text-left text-stone-800 transition-colors hover:border-emerald-900 hover:bg-emerald-900/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-900"
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                  message.role === 'user'
                    ? 'ml-auto bg-emerald-900 text-white'
                    : 'bg-stone-200/70 text-stone-800'
                }`}
              >
                <p>{message.text}</p>
                {message.whatsappHandoff && (
                  <a
                    href={message.whatsappHandoff}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block font-medium text-emerald-900 underline underline-offset-2 hover:text-emerald-700"
                  >
                    Continue on WhatsApp →
                  </a>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-stone-200 bg-white px-3 py-3">
            <input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Type your question..."
              aria-label="Your question" className="min-h-[44px] min-w-0 flex-1 rounded-full border border-stone-300 bg-white px-4 py-2 text-base focus:border-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-900/30 sm:text-sm"
            />
            <button
              type="submit"
              className="min-h-[44px] rounded-full bg-emerald-900 px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Chat with us"
        aria-expanded={isOpen}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-900 text-amber-200 shadow-[0_10px_30px_-8px_rgba(10,40,30,0.6)] ring-1 ring-amber-300/40 transition-colors hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M12 2C6.48 2 2 6.03 2 11c0 2.09.84 4 2.23 5.54L3 22l5.69-1.49C9.99 20.82 10.97 21 12 21c5.52 0 10-4.03 10-9s-4.48-10-10-10zm0 18c-.93 0-1.82-.15-2.65-.42l-.3-.1-3.26.85.88-3.15-.2-.32A7.94 7.94 0 014 11c0-3.86 3.59-7 8-7s8 3.14 8 7-3.59 7-8 7z" />
        </svg>
      </button>
    </div>
  )
}

export default ChatWidget
