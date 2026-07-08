import { useState } from 'react'
import type { DmMessage } from '../data/dms'
import type { GroupChat as GroupChatData } from '../data/groupChats'
import { currentUser } from '../data/me'

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

interface MessageGroup {
  from: string
  timestamp: string
  texts: string[]
}

function groupMessages(messages: DmMessage[]): MessageGroup[] {
  const groups: MessageGroup[] = []
  for (const m of messages) {
    const last = groups[groups.length - 1]
    if (last && last.from === m.from) {
      last.texts.push(m.text)
    } else {
      groups.push({ from: m.from, timestamp: m.timestamp, texts: [m.text] })
    }
  }
  return groups
}

interface GroupChatProps {
  chat: GroupChatData
}

function GroupChat({ chat }: GroupChatProps) {
  const [messages, setMessages] = useState<DmMessage[]>(chat.messages)
  const [draft, setDraft] = useState('')

  const groups = groupMessages(messages)

  const colorFor = (from: string) => (from === 'me' ? currentUser.avatarColor : chat.memberColors[from] ?? '#9ca3af')

  const send = () => {
    const text = draft.trim()
    if (!text) return
    setMessages((prev) => [
      ...prev,
      { id: `local-${prev.length}`, from: 'me', text, timestamp: 'Just now' },
    ])
    setDraft('')
  }

  return (
    <div className="dm-chat">
      <div className="dm-messages">
        {groups.map((g, i) => {
          const isMe = g.from === 'me'
          const name = isMe ? 'You' : g.from
          return (
            <div className="dm-group" key={i}>
              <div className="post-avatar small dm-group-avatar" style={{ background: colorFor(g.from) }}>
                {initials(name)}
              </div>
              <div className="dm-group-body">
                <div className="dm-group-header">
                  <span className="dm-sender">{name}</span>
                  <span className="dm-timestamp">{g.timestamp}</span>
                </div>
                {g.texts.map((t, j) => (
                  <div className="dm-line" key={j}>
                    {t}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="dm-input-row">
        <input
          className="dm-input"
          type="text"
          placeholder={`Message ${chat.name}`}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') send()
          }}
        />
        <button type="button" className="dm-send-btn" onClick={send}>
          Send
        </button>
      </div>
    </div>
  )
}

export default GroupChat
