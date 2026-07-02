import { useMemo, useState } from 'react'
import Sidebar from './components/Sidebar'
import RightPanel from './components/RightPanel'
import Composer from './components/Composer'
import PostCard from './components/PostCard'
import NewPostPage from './components/NewPostPage'
import DMChat from './components/DMChat'
import PostDetail from './components/PostDetail'
import ProfilePage from './components/ProfilePage'
import { posts, typeMeta, type PostType } from './data/posts'
import { dmContacts } from './data/dms'
import './App.css'

const filters: Array<{ id: 'all' | PostType; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'announcement', label: typeMeta.announcement.label },
  { id: 'event', label: typeMeta.event.label },
  { id: 'shoutout', label: typeMeta.shoutout.label },
  { id: 'resource', label: typeMeta.resource.label },
  { id: 'question', label: typeMeta.question.label },
]

function App() {
  const [page, setPage] = useState<'home' | 'new-post' | 'profile'>('home')
  const [newPostType, setNewPostType] = useState<PostType | undefined>(undefined)
  const [view, setView] = useState<'feed' | 'dm' | 'post'>('feed')
  const [activeChannel, setActiveChannel] = useState('all')
  const [activeFilter, setActiveFilter] = useState<'all' | PostType>('all')
  const [activeDmId, setActiveDmId] = useState<string | null>(null)
  const [activePostId, setActivePostId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const visiblePosts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase()

    return posts
      .filter((p) => activeChannel === 'all' || p.channel === activeChannel)
      .filter((p) => activeFilter === 'all' || p.type === activeFilter)
      .filter((p) => {
        if (!normalizedSearch) return true

        const searchableText = [
          p.title,
          p.body,
          p.author,
          p.channel,
          p.type,
          ...(p.tags ?? []),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()

        return searchableText.includes(normalizedSearch)
      })
      .sort((a, b) => Number(b.pinned) - Number(a.pinned))
  }, [activeChannel, activeFilter, searchQuery])

  const activeContact = dmContacts.find((c) => c.id === activeDmId) ?? null
  const activePost = posts.find((p) => p.id === activePostId) ?? null

  const goToNewPost = (type?: PostType) => {
    setNewPostType(type)
    setPage('new-post')
  }

  const openChannel = (channelId: string) => {
    setView('feed')
    setActiveChannel(channelId)
  }

  const openDm = (dmId: string) => {
    setView('dm')
    setActiveDmId(dmId)
  }

  const openDmByName = (name: string) => {
    const contact = dmContacts.find((c) => c.name === name)
    if (contact) openDm(contact.id)
  }

  const openPost = (postId: string) => {
    setView('post')
    setActivePostId(postId)
  }

  if (page === 'new-post') {
    return (
      <NewPostPage
        initialType={newPostType}
        onCancel={() => setPage('home')}
        onSubmit={() => setPage('home')}
      />
    )
  }

  if (page === 'profile') {
    return (
      <ProfilePage
        onBack={() => setPage('home')}
        onOpenPost={(postId) => {
          openPost(postId)
          setPage('home')
        }}
      />
    )
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeChannel={view === 'feed' ? activeChannel : null}
        onSelectChannel={openChannel}
        activeDmId={view === 'dm' ? activeDmId : null}
        onSelectDm={openDm}
        onOpenProfile={() => setPage('profile')}
      />

      <div className="main-column">
        {view === 'post' && activePost ? (
          <>
            <header className="topbar">
              <div>
                <button type="button" className="ghost-btn back-btn" onClick={() => setView('feed')}>
                  ← Back to #{activePost.channel}
                </button>
                <h1 className="topbar-title">{activePost.title ?? 'Post'}</h1>
              </div>
            </header>
            <PostDetail key={activePost.id} post={activePost} />
          </>
        ) : view === 'dm' && activeContact ? (
          <>
            <header className="topbar">
              <div className="dm-topbar-heading">
                <div className="post-avatar" style={{ background: activeContact.avatarColor }}>
                  {activeContact.name
                    .split(' ')
                    .map((p) => p[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div>
                  <h1 className="topbar-title">{activeContact.name}</h1>
                  <p className="topbar-subtitle">{activeContact.team}</p>
                </div>
              </div>
            </header>
            <DMChat key={activeContact.id} contact={activeContact} />
          </>
        ) : (
          <>
            <header className="topbar">
              <div>
                <h1 className="topbar-title">
                  {activeChannel === 'all' ? 'Home' : `#${activeChannel}`}
                </h1>
                <p className="topbar-subtitle">Where the intern class keeps up with each other</p>
              </div>
              <div className="topbar-actions">
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search posts…"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
                <button type="button" className="new-post-btn" onClick={() => goToNewPost()}>
                  + New Post
                </button>
              </div>
            </header>

            <div className="feed-wrap">
              <Composer onNewPost={goToNewPost} />

              <div className="filter-row">
                {filters.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className={`filter-chip${activeFilter === f.id ? ' active' : ''}`}
                    onClick={() => setActiveFilter(f.id)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="feed">
                {visiblePosts.length === 0 && (
                  <div className="empty-state">No posts here yet — be the first to post!</div>
                )}
                {visiblePosts.map((post) => (
                  <PostCard key={post.id} post={post} onOpen={() => openPost(post.id)} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <RightPanel onSelectIntern={openDmByName} />
    </div>
  )
}

export default App
