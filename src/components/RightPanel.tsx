import { newInterns, upcomingEvents } from '../data/posts'

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

interface RightPanelProps {
  onSelectIntern: (name: string) => void
}

function RightPanel({ onSelectIntern }: RightPanelProps) {
  return (
    <aside className="right-panel">
      <div className="panel-card">
        <h4 className="panel-title">Upcoming Events</h4>
        <ul className="panel-list">
          {upcomingEvents.map((e) => (
            <li key={e.title} className="event-item">
              <div className="event-dot" />
              <div>
                <div className="event-title">{e.title}</div>
                <div className="event-when">{e.when}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="panel-card">
        <h4 className="panel-title">Interns with DMs Open</h4>
        <ul className="panel-list">
          {newInterns.map((i) => (
            <li key={i.name}>
              <button
                type="button"
                className="intern-item intern-item-button"
                onClick={() => onSelectIntern(i.name)}
              >
                <div className="post-avatar small" style={{ background: i.avatarColor }}>
                  {initials(i.name)}
                </div>
                <div>
                  <div className="intern-name">{i.name}</div>
                  <div className="intern-team">{i.team}</div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

    </aside>
  )
}

export default RightPanel
