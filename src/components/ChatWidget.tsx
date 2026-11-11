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
  const [isOpen, setIsOpen] = useState(true)
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
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {isOpen && (
        <div className="mb-3 w-[320px] max-w-[90vw] max-h-[70vh] flex flex-col bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden">
          <div className="flex items-center justify-between bg-amber-600 text-white px-4 py-3">
            <span className="font-semibold text-sm">Ask us anything</span>
            <div className="flex items-center gap-3">
              <a
                href={buildWhatsAppUrl(phoneNumber, fallbackMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs underline underline-offset-2 hover:text-amber-100"
              >
                Prefer WhatsApp?
              </a>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="text-white hover:text-amber-100 text-lg leading-none"
              >
                &times;
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm">
            {messages.length === 0 && (
              <div>
                <p className="text-stone-600 mb-2">
                  Hi! Ask me a quick question about visiting Bhutan, or try one of these:
                </p>
                <div className="flex flex-col gap-2">
                  {faqs.slice(0, SUGGESTED_QUESTION_COUNT).map((faq) => (
                    <button
                      key={faq.question}
                      type="button"
                      onClick={() => askQuestion(faq.question)}
                      className="text-left px-3 py-2 rounded-lg border border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100 transition"
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
                className={`px-3 py-2 rounded-lg max-w-[85%] ${
                  message.role === 'user'
                    ? 'bg-amber-600 text-white ml-auto'
                    : 'bg-stone-100 text-stone-800'
                }`}
              >
                <p>{message.text}</p>
                {message.whatsappHandoff && (
                  <a
                    href={message.whatsappHandoff}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 font-medium text-amber-700 hover:text-amber-800 hover:underline"
                  >
                    Continue on WhatsApp →
                  </a>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-stone-200 px-3 py-2">
            <input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Type your question..."
              className="flex-1 text-sm px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-3 py-2 rounded-lg transition"
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
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '60px',
          height: '60px',
          backgroundColor: '#25D366',
          borderRadius: '50%',
          color: 'white',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
          marginLeft: 'auto',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M12 2C6.48 2 2 6.03 2 11c0 2.09.84 4 2.23 5.54L3 22l5.69-1.49C9.99 20.82 10.97 21 12 21c5.52 0 10-4.03 10-9s-4.48-10-10-10zm0 18c-.93 0-1.82-.15-2.65-.42l-.3-.1-3.26.85.88-3.15-.2-.32A7.94 7.94 0 014 11c0-3.86 3.59-7 8-7s8 3.14 8 7-3.59 7-8 7z" />
        </svg>
      </button>
    </div>
  )
}

export default ChatWidget
