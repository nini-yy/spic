export type PostType = 'announcement' | 'event' | 'shoutout' | 'resource' | 'question' | 'poll'

export interface Comment {
  id: string
  author: string
  avatarColor: string
  text: string
  timestamp: string
}

export interface Post {
  id: string
  type: PostType
  channel: string
  author: string
  role: string
  avatarColor: string
  timestamp: string
  title?: string
  body: string
  tags?: string[]
  likes: number
  comments: number
  pinned?: boolean
  poll?: { option: string; votes: number }[]
  commentThread?: Comment[]
}

export const typeMeta: Record<PostType, { label: string; color: string }> = {
  announcement: { label: 'Announcement', color: '#aa3bff' },
  event: { label: 'Event', color: '#2563eb' },
  shoutout: { label: 'Shoutout', color: '#f59e0b' },
  resource: { label: 'Resource', color: '#10b981' },
  question: { label: 'Question', color: '#ef4444' },
  poll: { label: 'Poll', color: '#0ea5e9' },
}

export const posts: Post[] = [
  {
    id: 'p1',
    type: 'announcement',
    channel: 'announcements',
    author: 'Evan Eggplant',
    role: 'Intern Program Lead',
    avatarColor: '#aa3bff',
    timestamp: '9:02 AM',
    title: 'Summer picnic sign-ups are open!',
    body:
      "The picnic is Friday, July 24th. Every intern and even full-time are welcome. Sign up for a spot from the link in the thread. Snacks and fun merch are included!",
    tags: ['company-event', 'important'],
    likes: 10,
    comments: 4,
    pinned: true,
    commentThread: [
      { id: 'c1', author: 'Damian Date', avatarColor: '#ef4444', text: 'omw to sign up right now', timestamp: '9:10 AM' },
      { id: 'c2', author: 'Sam Strawberry', avatarColor: '#f59e0b', text: 'are the spots limited?', timestamp: '9:14 AM' },
      { id: 'c3', author: 'Evan Eggplant', avatarColor: '#aa3bff', text: 'yes! first come first serve!', timestamp: '9:16 AM' },
      { id: 'c4', author: 'Evan Eggplant', avatarColor: '#aa3bff', text: 'slots tend to fill up fast pls sign up asap!', timestamp: '9:16 AM' },
    ],
  },
  {
    id: 'p2',
    type: 'event',
    channel: 'events',
    author: 'Felicity Fig',
    role: 'Ratings Tech',
    avatarColor: '#2563eb',
    timestamp: '8:15 AM',
    title: 'Intern Coffee Chat — Friday 3:00 PM',
    body:
      'Grab a coffee and meet interns from other teams! We’ll be on the 4th floor terrace. RSVP so we know how much cold brew to order.',
    tags: ['social'],
    likes: 2,
    comments: 0,
  },
  {
    id: 'p3',
    type: 'shoutout',
    channel: 'show-and-tell',
    author: 'Sam Strawberry',
    role: 'Analytics',
    avatarColor: '#f59e0b',
    timestamp: 'Yesterday, 4:47 PM',
    title: 'Kudos to Pete!',
    body:
      'Huge shoutout to @Pete for staying late to help me debug a gnarly XXX issue before my demo. Reach out to him if you have any questions about XXX',
    tags: ['kudos'],
    likes: 19,
    comments: 2,
    commentThread: [
      { id: 'c1', author: 'Pete Pear', avatarColor: '#f59e0b', text: 'aw stop it 🥹', timestamp: 'Yesterday 4:52 PM' },
      { id: 'c2', author: 'Alice Apple', avatarColor: '#10b981', text: 'love to see interns helping interns', timestamp: 'Yesterday 5:01 PM' },
    ],
  },
  {
    id: 'p4',
    type: 'resource',
    channel: 'resources',
    author: 'Alice Apple',
    role: 'Analytics Intern',
    avatarColor: '#10b981',
    timestamp: 'Yesterday, 2:10 PM',
    title: 'Intern onboarding wiki + repo access checklist',
    body:
      'Dropping an updated onboarding doc here — covers VPN setup, repo access requests, and where to find design specs. Saved me a lot of time last yr as a returning intern :) Hope it helps save you a lot of time!',
    tags: ['onboarding', 'docs'],
    likes: 35,
    comments: 3,
  },
  {
    id: 'p9',
    type: 'resource',
    channel: 'resources',
    author: 'Mimi Me',
    role: 'Product Intern',
    avatarColor: '#0ea5e9',
    timestamp: 'Today, 10:18 AM',
    title: 'Frontend PR checklist before requesting review',
    body:
      'Sharing the checklist I use before opening a PR: run the app locally, test empty states, check mobile sizing, remove console logs, include screenshots for UI changes, and write a short description of what changed.',
    tags: ['pull-request', 'frontend', 'code-review'],
    likes: 18,
    comments: 2,
    commentThread: [
      {
        id: 'c1',
        author: 'Damian Date',
        avatarColor: '#ef4444',
        text: 'The screenshot reminder is so useful — I always forget that part.',
        timestamp: 'Today 10:24 AM',
      },
      {
        id: 'c2',
        author: 'Alice Apple',
        avatarColor: '#10b981',
        text: 'Also worth mentioning how to test the change locally in the PR description.',
        timestamp: 'Today 10:31 AM',
      },
    ],
  },
  {
    id: 'p10',
    type: 'resource',
    channel: 'resources',
    author: 'Taylor Tangerine',
    role: 'HR Business Partner',
    avatarColor: '#d6002a',
    timestamp: 'Today, 1:05 PM',
    title: 'Intern presentation template and demo day tips',
    body:
      'Here is a starter outline for intern presentations: problem, goal, approach, demo, impact, lessons learned, and next steps. Keep slides simple and practice the live demo at least twice before presenting.',
    tags: ['presentation', 'demo-day', 'career'],
    likes: 24,
    comments: 4,
    commentThread: [
      {
        id: 'c1',
        author: 'Sam Strawberry',
        avatarColor: '#f59e0b',
        text: 'The problem → impact structure makes the story way easier to follow.',
        timestamp: 'Today 1:14 PM',
      },
      {
        id: 'c2',
        author: 'Evan Eggplant',
        avatarColor: '#aa3bff',
        text: 'Great resource — pinning this in the next intern roundup.',
        timestamp: 'Today 1:22 PM',
      },
    ],
  },
  {
    id: 'p5',
    type: 'question',
    channel: 'intern-general',
    author: 'Damian Date',
    role: 'Ratings Intern',
    avatarColor: '#ef4444',
    timestamp: 'Yesterday, 11:32 AM',
    body:
      'Anyone free to pair for 30 min on a React state bug? My modal keeps re-rendering the whole list on every keystroke and I can’t figure out why 😵‍💫',
    tags: ['help-wanted', 'react'],
    likes: 7,
    comments: 9,
    commentThread: [
      { id: 'c1', author: 'Mimi Me', avatarColor: '#0ea5e9', text: 'sounds like the list isn’t memoized', timestamp: 'Yesterday 11:35 AM' },
      { id: 'c2', author: 'Mimi Me', avatarColor: '#0ea5e9', text: 'are you passing a new array/object as a prop every render?', timestamp: 'Yesterday 11:35 AM' },
      { id: 'c3', author: 'Damian Date', avatarColor: '#ef4444', text: 'oh probably, the filter function is defined inline', timestamp: 'Yesterday 11:40 AM' },
      { id: 'c4', author: 'Mimi Me', avatarColor: '#0ea5e9', text: 'yep that’ll do it, wrap it in useMemo', timestamp: 'Yesterday 11:41 AM' },
    ],
  },
  {
    id: 'p6',
    type: 'poll',
    channel: 'intern-general',
    author: 'Mimi Me',
    role: 'Product Intern',
    avatarColor: '#0ea5e9',
    timestamp: 'Mon, 5:20 PM',
    title: 'What should we get for the intern snack cart?',
    body: 'Voting closes Wednesday — winner gets stocked in the 4th floor kitchen all week.',
    likes: 14,
    comments: 0,
    poll: [
      { option: 'Boba', votes: 38 },
      { option: 'Trail mix bar', votes: 12 },
      { option: 'Mini donuts', votes: 27 },
      { option: 'Fresh fruit', votes: 9 },
    ],
  },
  {
    id: 'p7',
    type: 'announcement',
    channel: 'announcements',
    author: 'Evan Eggplant',
    role: 'Intern Program Lead',
    avatarColor: '#aa3bff',
    timestamp: 'Mon, 9:00 AM',
    title: 'New #show-and-tell channel is live',
    body:
      'Created a dedicated space to share progress screenshots, demos, and wins throughout the summer — no need to save it all for Demo Day. Post early and often!',
    tags: ['new-channel'],
    likes: 22,
    comments: 2,
  },
  {
    id: 'p8',
    type: 'event',
    channel: 'events',
    author: 'Taylor Tangerine',
    role: 'HR Business Partner',
    avatarColor: '#2563eb',
    timestamp: 'Mon, 8:30 AM',
    title: 'Resume & LinkedIn workshop — next Tuesday',
    body:
      'Recruiting is hosting a workshop on tightening up your resume and LinkedIn ahead of return-offer season. Optional but highly recommended, 12–1 PM in Room 302.',
    tags: ['career', 'workshop'],
    likes: 16,
    comments: 0,
  },
]

export const channels = [
  { id: 'all', name: 'All Posts', icon: '#' },
  { id: 'announcements', name: 'announcements', icon: '#' },
  { id: 'events', name: 'events', icon: '#' },
  { id: 'intern-general', name: 'intern-general', icon: '#' },
  { id: 'show-and-tell', name: 'show-and-tell', icon: '#' },
  { id: 'resources', name: 'resources', icon: '#' },
  { id: 'random', name: 'random', icon: '#' },
]

export const upcomingEvents = [
  { title: 'Volunteering at Animal Shelter', when: 'Tue, Jul 7 · 12:00 PM' },
  { title: 'Intern Coffee Chat', when: 'Fri, Jul 10 · 3:00 PM' },
  { title: 'Summer Ferry Trip', when: 'Fri, Jul 24 · 1:00 PM' },
]

export const newInterns = [
  { name: 'Alice Apple', team: 'Analytics', avatarColor: '#f59e0b' },
  { name: 'Bob Banana', team: 'MI', avatarColor: '#10b981' },
  { name: 'Carlos Carrot', team: 'Commercial', avatarColor: '#ef4444' },
  { name: 'Damien Date', team: 'Ratings', avatarColor: '#0ea5e9' },
]
