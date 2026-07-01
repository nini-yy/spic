import { useState } from 'react'
import { channels, typeMeta, type PostType } from '../data/posts'

interface NewPostPageProps {
  initialType?: PostType
  onCancel: () => void
  onSubmit: () => void
}

const postableChannels = channels.filter((c) => c.id !== 'all')

function NewPostPage({ initialType, onCancel, onSubmit }: NewPostPageProps) {
  const [type, setType] = useState<PostType>(initialType ?? 'announcement')
  const [channel, setChannel] = useState(postableChannels[0].id)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  return (
    <div className="new-post-page">
      <header className="topbar">
        <div>
          <h1 className="topbar-title">New Post</h1>
          <p className="topbar-subtitle">Share something with the intern channel</p>
        </div>
        <div className="topbar-actions">
          <button type="button" className="ghost-btn" onClick={onCancel}>
            ← Back to Home
          </button>
        </div>
      </header>

      <div className="new-post-form-wrap">
        <form
          className="new-post-form"
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
          }}
        >
          <label className="form-field">
            <span className="form-label">Post type</span>
            <div className="type-picker">
              {(Object.keys(typeMeta) as PostType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`type-option${type === t ? ' active' : ''}`}
                  style={
                    type === t
                      ? { background: `${typeMeta[t].color}1a`, borderColor: typeMeta[t].color, color: typeMeta[t].color }
                      : undefined
                  }
                  onClick={() => setType(t)}
                >
                  {typeMeta[t].label}
                </button>
              ))}
            </div>
          </label>

          <label className="form-field">
            <span className="form-label">Channel</span>
            <select className="form-input" value={channel} onChange={(e) => setChannel(e.target.value)}>
              {postableChannels.map((c) => (
                <option key={c.id} value={c.id}>
                  #{c.name}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span className="form-label">Title</span>
            <input
              className="form-input"
              type="text"
              placeholder="Give your post a title…"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label className="form-field">
            <span className="form-label">Details</span>
            <textarea
              className="form-input form-textarea"
              placeholder="What's on your mind?"
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>

          <div className="form-actions">
            <button type="button" className="ghost-btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="new-post-btn">
              Post to #{channel}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewPostPage
