import { useState } from 'react'
import type { Comment, Post } from '../data/posts'
import { currentUser } from '../data/me'
import PostCard from './PostCard'

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

interface CommentGroup {
  author: string
  avatarColor: string
  timestamp: string
  texts: string[]
}

function groupComments(comments: Comment[]): CommentGroup[] {
  const groups: CommentGroup[] = []
  for (const c of comments) {
    const last = groups[groups.length - 1]
    if (last && last.author === c.author) {
      last.texts.push(c.text)
    } else {
      groups.push({ author: c.author, avatarColor: c.avatarColor, timestamp: c.timestamp, texts: [c.text] })
    }
  }
  return groups
}

interface PostDetailProps {
  post: Post
}

function PostDetail({ post }: PostDetailProps) {
  const [comments, setComments] = useState<Comment[]>(post.commentThread ?? [])
  const [draft, setDraft] = useState('')

  const groups = groupComments(comments)

  const send = () => {
    const text = draft.trim()
    if (!text) return
    setComments((prev) => [
      ...prev,
      { id: `local-${prev.length}`, author: currentUser.name, avatarColor: currentUser.avatarColor, text, timestamp: 'Just now' },
    ])
    setDraft('')
  }

  return (
    <div className="post-detail">
      <div className="post-detail-scroll">
        <div className="post-detail-post">
          <PostCard post={post} />
        </div>

        <div className="dm-messages post-detail-comments">
          <div className="comments-divider">
            <span>{comments.length} Comments</span>
          </div>
          {groups.length === 0 && (
            <div className="empty-state">No comments yet — be the first to reply!</div>
          )}
          {groups.map((g, i) => (
            <div className="dm-group" key={i}>
              <div className="post-avatar small dm-group-avatar" style={{ background: g.avatarColor }}>
                {initials(g.author)}
              </div>
              <div className="dm-group-body">
                <div className="dm-group-header">
                  <span className="dm-sender">{g.author}</span>
                  <span className="dm-timestamp">{g.timestamp}</span>
                </div>
                {g.texts.map((t, j) => (
                  <div className="dm-line" key={j}>
                    {t}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dm-input-row">
        <input
          className="dm-input"
          type="text"
          placeholder={`Reply to #${post.channel}…`}
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

export default PostDetail
