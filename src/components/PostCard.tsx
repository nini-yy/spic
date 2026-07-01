import { type Post, typeMeta } from '../data/posts'

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

interface PostCardProps {
  post: Post
  onOpen?: () => void
}

function PostCard({ post, onOpen }: PostCardProps) {
  const meta = typeMeta[post.type]
  const totalVotes = post.poll?.reduce((sum, o) => sum + o.votes, 0) ?? 0

  return (
    <article
      className={`post-card${post.pinned ? ' pinned' : ''}${onOpen ? ' clickable' : ''}`}
      onClick={onOpen}
    >
      {post.pinned && <div className="post-pinned-flag">📌 Pinned</div>}
      <div className="post-header">
        <div className="post-avatar" style={{ background: post.avatarColor }}>
          {initials(post.author)}
        </div>
        <div className="post-header-text">
          <div className="post-author-row">
            <span className="post-author">{post.author}</span>
            <span className="post-role">{post.role}</span>
          </div>
          <div className="post-meta-row">
            <span className="post-channel">#{post.channel}</span>
            <span className="post-dot">·</span>
            <span className="post-time">{post.timestamp}</span>
          </div>
        </div>
        <span className="post-type-badge" style={{ background: `${meta.color}1a`, color: meta.color }}>
          {meta.label}
        </span>
      </div>

      <div className="post-body">
        {post.title && <h3 className="post-title">{post.title}</h3>}
        <p>{post.body}</p>
      </div>

      {post.poll && (
        <div className="post-poll">
          {post.poll.map((o) => {
            const pct = totalVotes ? Math.round((o.votes / totalVotes) * 100) : 0
            return (
              <div className="poll-option" key={o.option}>
                <div className="poll-option-row">
                  <span>{o.option}</span>
                  <span>{pct}%</span>
                </div>
                <div className="poll-bar-track">
                  <div className="poll-bar-fill" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
          <div className="poll-total">{totalVotes} votes</div>
        </div>
      )}

      {post.tags && (
        <div className="post-tags">
          {post.tags.map((t) => (
            <span className="post-tag" key={t}>
              #{t}
            </span>
          ))}
        </div>
      )}

      <div className="post-actions">
        <button type="button" className="post-action" onClick={(e) => e.stopPropagation()}>
          ❤️ {post.likes}
        </button>
        <button type="button" className="post-action">
          💬 {post.comments} Comments
        </button>
        <button type="button" className="post-action" onClick={(e) => e.stopPropagation()}>
          ↗️ Share
        </button>
      </div>
    </article>
  )
}

export default PostCard
