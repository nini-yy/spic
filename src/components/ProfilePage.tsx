import { useState } from 'react'
import { posts, typeMeta } from '../data/posts'
import { currentUser } from '../data/me'

interface ProfilePageProps {
  onBack: () => void
  onOpenPost: (postId: string) => void
}

const snoozeOptions = [
  { id: '1h', label: 'For 1 hour' },
  { id: '4h', label: 'For 4 hours' },
  { id: 'today', label: 'Until tomorrow' },
  { id: '1w', label: 'For 1 week' },
  { id: 'forever', label: 'Until I turn it back on' },
]

const dmOptions = [
  { id: 'everyone', label: 'Everyone' },
  { id: 'team', label: 'My team only' },
  { id: 'none', label: 'No one' },
]

function ProfilePage({ onBack, onOpenPost }: ProfilePageProps) {
  const myPosts = posts.filter((p) => p.author === currentUser.name)
  const likesReceived = myPosts.reduce((sum, p) => sum + p.likes, 0)
  const commentsReceived = myPosts.reduce((sum, p) => sum + (p.commentThread?.length ?? 0), 0)

  const [dndEnabled, setDndEnabled] = useState(false)
  const [snooze, setSnooze] = useState(snoozeOptions[0].id)
  const [showOnlineStatus, setShowOnlineStatus] = useState(true)
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [dmPermission, setDmPermission] = useState(dmOptions[0].id)

  return (
    <div className="new-post-page">
      <header className="topbar">
        <div>
          <h1 className="topbar-title">Profile & Settings</h1>
          <p className="topbar-subtitle">Manage how you show up in InternHub</p>
        </div>
        <div className="topbar-actions">
          <button type="button" className="ghost-btn" onClick={onBack}>
            ← Back to Home
          </button>
        </div>
      </header>

      <div className="profile-page-wrap">
        <div className="profile-header-card">
          <div className="post-avatar profile-avatar-lg" style={{ background: currentUser.avatarColor }}>
            {currentUser.initials}
          </div>
          <div>
            <div className="profile-name">{currentUser.name}</div>
            <div className="profile-role">
              {currentUser.role} · {currentUser.team}
            </div>
          </div>
          {dndEnabled && (
            <span className="dnd-pill">🔕 Notifications snoozed — {snoozeOptions.find((o) => o.id === snooze)?.label.toLowerCase()}</span>
          )}
        </div>

        <div className="profile-stats-row">
          <div className="profile-stat">
            <strong>{myPosts.length}</strong>
            <span>Posts</span>
          </div>
          <div className="profile-stat">
            <strong>{likesReceived}</strong>
            <span>Likes received</span>
          </div>
          <div className="profile-stat">
            <strong>{commentsReceived}</strong>
            <span>Comments received</span>
          </div>
        </div>

        <section className="profile-section">
          <h2 className="profile-section-title">Your Posts</h2>
          {myPosts.length === 0 ? (
            <div className="empty-state">You haven’t posted anything yet.</div>
          ) : (
            <ul className="profile-post-list">
              {myPosts.map((p) => {
                const meta = typeMeta[p.type]
                return (
                  <li key={p.id}>
                    <button type="button" className="profile-post-row" onClick={() => onOpenPost(p.id)}>
                      <span className="post-type-badge" style={{ background: `${meta.color}1a`, color: meta.color }}>
                        {meta.label}
                      </span>
                      <span className="profile-post-title">{p.title ?? p.body}</span>
                      <span className="profile-post-meta">
                        #{p.channel} · {p.timestamp}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </section>

        <section className="profile-section">
          <h2 className="profile-section-title">Notifications</h2>

          <div className="settings-row">
            <div>
              <div className="settings-label">Do Not Disturb</div>
              <div className="settings-sub">Pause DMs, mentions, and comment alerts</div>
            </div>
            <button
              type="button"
              className={`toggle-switch${dndEnabled ? ' on' : ''}`}
              onClick={() => setDndEnabled((v) => !v)}
              aria-pressed={dndEnabled}
            >
              <span className="toggle-thumb" />
            </button>
          </div>

          {dndEnabled && (
            <div className="settings-row settings-row-indent">
              <div>
                <div className="settings-label">Snooze duration</div>
              </div>
              <select className="form-input settings-select" value={snooze} onChange={(e) => setSnooze(e.target.value)}>
                {snoozeOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="settings-row">
            <div>
              <div className="settings-label">Show online status</div>
              <div className="settings-sub">Let others see the green dot next to your name</div>
            </div>
            <button
              type="button"
              className={`toggle-switch${showOnlineStatus ? ' on' : ''}`}
              onClick={() => setShowOnlineStatus((v) => !v)}
              aria-pressed={showOnlineStatus}
            >
              <span className="toggle-thumb" />
            </button>
          </div>

          <div className="settings-row">
            <div>
              <div className="settings-label">Email notifications</div>
              <div className="settings-sub">Get a daily digest of channel activity</div>
            </div>
            <button
              type="button"
              className={`toggle-switch${emailNotifs ? ' on' : ''}`}
              onClick={() => setEmailNotifs((v) => !v)}
              aria-pressed={emailNotifs}
            >
              <span className="toggle-thumb" />
            </button>
          </div>
        </section>

        <section className="profile-section">
          <h2 className="profile-section-title">Privacy</h2>
          <div className="settings-row">
            <div>
              <div className="settings-label">Who can message you</div>
              <div className="settings-sub">Choose who’s allowed to open a DM with you</div>
            </div>
            <select className="form-input settings-select" value={dmPermission} onChange={(e) => setDmPermission(e.target.value)}>
              {dmOptions.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProfilePage
