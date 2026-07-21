import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  formatTimeAgo,
  getNotifications,
  markNotificationRead,
} from "@/services/admin/notificationStore"

export function NotificationsPage() {
  const navigate = useNavigate()
  const [refreshKey, setRefreshKey] = useState(0)
  const notifications = useMemo(() => getNotifications(), [refreshKey])

  function handleView(notification) {
    markNotificationRead(notification.id)
    setRefreshKey((value) => value + 1)
    navigate(notification.link || "/admin/articles")
  }

  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b border-gray-200 px-10 py-6">
        <h1 className="text-2xl font-bold text-black">Notification</h1>
      </header>

      <div className="px-10 py-2">
        {notifications.length === 0 ? (
          <p className="py-10 text-center text-sm text-gray-500">
            No notifications
          </p>
        ) : (
          <ul>
            {notifications.map((notification) => {
              const actionText =
                notification.type === "comment"
                  ? "Commented on your article"
                  : notification.type === "like"
                    ? "liked your article"
                    : "updated"

              return (
                <li
                  key={notification.id}
                  className="flex items-start gap-4 border-b border-gray-200 py-6"
                >
                  <img
                    src={notification.actorAvatar}
                    alt={notification.actorName}
                    className="size-12 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-800">
                      <span className="font-bold">{notification.actorName}</span>{" "}
                      {actionText}
                      {notification.articleTitle
                        ? `: ${notification.articleTitle}`
                        : ""}
                    </p>
                    {notification.message ? (
                      <p className="mt-2 text-sm text-gray-500">
                        &quot;{notification.message}&quot;
                      </p>
                    ) : null}
                    <p className="mt-2 text-sm text-[#c4a484]">
                      {formatTimeAgo(notification.createdAt)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleView(notification)}
                    className="shrink-0 text-sm font-medium text-gray-700 underline"
                  >
                    View
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
