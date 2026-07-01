import { newInterns } from './posts'

export interface DmMessage {
  id: string
  from: 'me' | string
  text: string
  timestamp: string
}

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-')
}

const conversationTemplates: Record<string, DmMessage[]> = {
  'Alice Apple': [
    { id: 'm1', from: 'Alice Apple', text: 'hey! saw your comment on the analytics doc', timestamp: '2:01 PM' },
    { id: 'm2', from: 'Alice Apple', text: 'did you want to hop on a call about it', timestamp: '2:01 PM' },
    { id: 'm3', from: 'me', text: 'yeah for sure, free after 3?', timestamp: '2:04 PM' },
    { id: 'm4', from: 'Alice Apple', text: 'works for me', timestamp: '2:05 PM' },
    { id: 'm5', from: 'Alice Apple', text: 'i’ll send a calendar invite', timestamp: '2:05 PM' },
  ],
  'Bob Banana': [
    { id: 'm1', from: 'Bob Banana', text: 'yo are you going to the coffee chat friday', timestamp: '11:14 AM' },
    { id: 'm2', from: 'me', text: 'thinking about it, is it worth it', timestamp: '11:20 AM' },
    { id: 'm3', from: 'Bob Banana', text: ' 100%, free cold brew', timestamp: '11:21 AM' },
    { id: 'm4', from: 'Bob Banana', text: 'also a good chance to meet the MI team', timestamp: '11:21 AM' },
    { id: 'm5', from: 'me', text: 'ok you sold me, see you there', timestamp: '11:23 AM' },
  ],
  'Carlos Carrot': [
    { id: 'm1', from: 'Carlos Carrot', text: 'quick q — do you know who owns the demo day sign up sheet', timestamp: 'Yesterday 4:40 PM' },
    { id: 'm2', from: 'me', text: 'pretty sure it’s Maria', timestamp: 'Yesterday 4:52 PM' },
    { id: 'm3', from: 'Carlos Carrot', text: 'ty!!', timestamp: 'Yesterday 4:53 PM' },
  ],
  'Damien Date': [
    { id: 'm1', from: 'Damien Date', text: 'congrats on the demo prep, saw the sneak peek in show-and-tell', timestamp: 'Mon 9:10 AM' },
    { id: 'm2', from: 'Damien Date', text: 'the ratings dashboard looked really clean', timestamp: 'Mon 9:10 AM' },
    { id: 'm3', from: 'me', text: 'thank you!! still polishing the charts', timestamp: 'Mon 9:15 AM' },
    { id: 'm4', from: 'Damien Date', text: 'lmk if you want a second pair of eyes before friday', timestamp: 'Mon 9:16 AM' },
  ],
}

export interface DmContact {
  id: string
  name: string
  team: string
  avatarColor: string
  status: 'online' | 'offline'
  messages: DmMessage[]
}

export const dmContacts: DmContact[] = newInterns.map((intern, index) => ({
  id: slugify(intern.name),
  name: intern.name,
  team: intern.team,
  avatarColor: intern.avatarColor,
  status: index % 3 === 0 ? 'offline' : 'online',
  messages: conversationTemplates[intern.name] ?? [],
}))
