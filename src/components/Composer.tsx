import type { PostType } from '../data/posts'
import { currentUser } from '../data/me'

interface ComposerProps {
  onNewPost: (type?: PostType) => void
}

function Composer({ onNewPost }: ComposerProps) {
  return (
    <div className="composer">
      <div className="post-avatar" style={{ background: currentUser.avatarColor }}>
        {currentUser.initials}
      </div>
      <button type="button" className="composer-input" onClick={() => onNewPost()}>
        + Add Post
      </button>
    </div>
  )
}

export default Composer
