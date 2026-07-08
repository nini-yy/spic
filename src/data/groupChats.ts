import type { DmMessage } from './dms'
import { currentUser } from './me'

export interface GroupChat {
  id: string
  name: string
  icon: string
  members: string[]
  memberColors: Record<string, string>
  messages: DmMessage[]
}

const allGroupChats: GroupChat[] = [
  {
    id: 'product-team',
    name: 'Product Team',
    icon: '🎯',
    members: ['Mimi Me', 'Priya Shah', 'Jordan Reyes'],
    memberColors: {
      'Priya Shah': '#f59e0b',
      'Jordan Reyes': '#10b981',
    },
    messages: [
      { id: 'g1', from: 'Priya Shah', text: 'team sync moved to 2pm today', timestamp: '9:40 AM' },
      { id: 'g2', from: 'Jordan Reyes', text: 'noted, updating the invite', timestamp: '9:42 AM' },
      { id: 'g3', from: 'me', text: 'sounds good, I’ll have the roadmap slide ready', timestamp: '9:45 AM' },
      { id: 'g4', from: 'Priya Shah', text: 'perfect 🙌', timestamp: '9:46 AM' },
    ],
  },
  {
    id: 'summer-2026-interns',
    name: 'Summer 2026 Interns',
    icon: '☀️',
    members: ['Mimi Me', 'Alice Apple', 'Bob Banana', 'Carlos Carrot', 'Damien Date'],
    memberColors: {
      'Alice Apple': '#f59e0b',
      'Bob Banana': '#10b981',
      'Carlos Carrot': '#ef4444',
      'Damien Date': '#0ea5e9',
    },
    messages: [
      { id: 'g1', from: 'Alice Apple', text: 'does anyone have the wifi password for the 4th floor', timestamp: 'Yesterday 3:12 PM' },
      { id: 'g2', from: 'Bob Banana', text: 'internhub2026 i think', timestamp: 'Yesterday 3:15 PM' },
      { id: 'g3', from: 'me', text: 'can confirm that works', timestamp: 'Yesterday 3:20 PM' },
    ],
  },
]

export const groupChats: GroupChat[] = allGroupChats.filter((g) => g.members.includes(currentUser.name))
