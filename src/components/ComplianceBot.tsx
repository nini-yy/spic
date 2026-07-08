import { useState } from 'react'

interface ComplianceMessage {
  id: string
  from: 'me' | 'spop'
  text: string
  timestamp: string
}

const initialMessages: ComplianceMessage[] = [
  {
    id: 'spop-1',
    from: 'spop',
    text: "Hello! I'm SPOP, your handy compliance bot. Ask me anything you're unsure about regarding sending messages to other people in S&P.",
    timestamp: 'Just now',
  },
]

function getComplianceReply(text: string) {
  const normalized = text.toLowerCase()

  if (normalized.includes('hello') || normalized.includes('hi')) {
    return "Hello! I'm SPOP, your handy compliance bot. Ask me anything you're unsure about regarding sending messages to other people in S&P."
  }

  if (normalized.includes('after hours') || normalized.includes('after-hours') || normalized.includes('out of hours')) {
    return 'Yes, but keep it brief, professional, and relevant. If it is sensitive or urgent, it is better to wait until business hours.'
  }

  if (normalized.includes('avoid') || normalized.includes('share')) {
    return 'Avoid personal details, confidential information, or anything that could be seen as unprofessional or inappropriate.'
  }

  if (normalized.includes('cc') || normalized.includes('email')) {
    return 'Keep the recipient list tight and only include people who truly need the context. That helps protect privacy and keeps the message clear.'
  }

  return 'Thanks for checking. I would keep the message brief, professional, and focused on the work context.'
}

function ComplianceBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ComplianceMessage[]>(initialMessages)
  const [draft, setDraft] = useState('')

  const send = () => {
    const text = draft.trim()
    if (!text) return

    setMessages((prev) => [
      ...prev,
      { id: `me-${Date.now()}`, from: 'me', text, timestamp: 'Just now' },
    ])
    setDraft('')

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `spop-${Date.now()}`,
          from: 'spop',
          text: getComplianceReply(text),
          timestamp: 'Just now',
        },
      ])
    }, 700)
  }

  return (
    <div className={`compliance-bot${isOpen ? ' open' : ''}`}>
      <button type="button" className="compliance-bot-toggle" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? '×' : '🐾'}
      </button>

      {isOpen && (
        <div className="compliance-bot-panel">
          <div className="compliance-bot-header">
            <div className="compliance-bot-avatar">SP</div>
            <div>
              <div className="compliance-bot-name">SPOP</div>
              <div className="compliance-bot-subtitle">Compliance helper</div>
            </div>
          </div>

          <div className="compliance-bot-messages">
            {messages.map((message) => (
              <div key={message.id} className={`compliance-bot-bubble ${message.from === 'me' ? 'me' : 'spop'}`}>
                {message.text}
              </div>
            ))}
          </div>

          <div className="compliance-bot-input-row">
            <input
              className="compliance-bot-input"
              type="text"
              placeholder="Ask SPOP something…"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') send()
              }}
            />
            <button type="button" className="compliance-bot-send" onClick={send}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ComplianceBot
