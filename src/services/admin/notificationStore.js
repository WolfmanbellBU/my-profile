const NOTIFICATIONS_KEY = "hh_admin_notifications"

const DEMO_AVATAR =
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Jacob"

function seedNotifications() {
  return [
    {
      id: crypto.randomUUID(),
      type: "comment",
      actorName: "Jacob Lash",
      actorAvatar: DEMO_AVATAR,
      articleTitle:
        "The Fascinating World of Cats: Why We Love Our Furry Friends",
      message:
        "I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting.",
      link: "/admin/articles",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      read: false,
    },
    {
      id: crypto.randomUUID(),
      type: "like",
      actorName: "Jacob Lash",
      actorAvatar: DEMO_AVATAR,
      articleTitle:
        "The Fascinating World of Cats: Why We Love Our Furry Friends",
      message: "",
      link: "/admin/articles?status=published",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      read: false,
    },
  ]
}

function readNotifications() {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  const seeded = seedNotifications()
  writeNotifications(seeded)
  return seeded
}

function writeNotifications(notifications) {
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications))
}

export function getNotifications() {
  return readNotifications().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )
}

export function markNotificationRead(id) {
  const notifications = readNotifications()
  const index = notifications.findIndex((item) => item.id === id)
  if (index === -1) return null
  notifications[index] = { ...notifications[index], read: true }
  writeNotifications(notifications)
  return notifications[index]
}

export function addNotification(notification) {
  const notifications = readNotifications()
  const item = {
    id: crypto.randomUUID(),
    read: false,
    createdAt: new Date().toISOString(),
    actorName: "System",
    actorAvatar: "https://api.dicebear.com/9.x/shapes/svg?seed=System",
    articleTitle: "",
    message: "",
    ...notification,
  }
  writeNotifications([item, ...notifications])
  return item
}

export function formatTimeAgo(dateValue) {
  const date = new Date(dateValue)
  const diffMs = Date.now() - date.getTime()
  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  if (hours < 1) return "Just now"
  if (hours === 1) return "1 hour ago"
  if (hours < 24) return `${hours} hours ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return "1 day ago"
  return `${days} days ago`
}
