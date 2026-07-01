import { channels } from '../data/posts'
import { dmContacts } from '../data/dms'
import { currentUser } from '../data/me'

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

interface SidebarProps {
  activeChannel: string | null
  onSelectChannel: (channelId: string) => void
  activeDmId: string | null
  onSelectDm: (dmId: string) => void
  onOpenProfile: () => void
}

function Sidebar({ activeChannel, onSelectChannel, activeDmId, onSelectDm, onOpenProfile }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">SPIC</div>
        <div>
          <div className="sidebar-brand-name">S&P Global Intern Community</div>
          <div className="sidebar-brand-sub">Summer 2026</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Channels</div>
        <ul>
          {channels.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                className={`sidebar-channel${activeChannel === c.id ? ' active' : ''}`}
                onClick={() => onSelectChannel(c.id)}
              >
                <span className="sidebar-channel-icon">{c.icon}</span>
                {c.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="sidebar-section-label sidebar-section-label-spaced">Direct Messages</div>
        <ul>
          {dmContacts.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                className={`sidebar-channel sidebar-dm${activeDmId === c.id ? ' active' : ''}`}
                onClick={() => onSelectDm(c.id)}
              >
                <span className="sidebar-dm-avatar-wrap">
                  <span className="post-avatar small" style={{ background: c.avatarColor }}>
                    {initials(c.name)}
                  </span>
                  <span className={`dm-status-dot ${c.status}`} />
                </span>
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <button type="button" className="sidebar-footer sidebar-footer-button" onClick={onOpenProfile}>
        <div className="sidebar-avatar" style={{ background: currentUser.avatarColor }}>
          {currentUser.initials}
        </div>
        <div>
          <div className="sidebar-footer-name">{currentUser.name}</div>
          <div className="sidebar-footer-sub">{currentUser.role}</div>
        </div>
      </button>
    </aside>
  )
}

export default Sidebar
