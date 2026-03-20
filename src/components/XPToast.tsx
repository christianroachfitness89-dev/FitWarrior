import { Achievement, XPNotification } from '../types'

interface ToastProps {
  notifications: XPNotification[]
  newAchievements: Achievement[]
  onDismissAchievement: (id: string) => void
}

export default function XPToast({ notifications, newAchievements, onDismissAchievement }: ToastProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none max-w-xs">
      {/* XP gained notifications */}
      {notifications.map(n => (
        <div
          key={n.id}
          className="bg-yellow-500/90 backdrop-blur text-yellow-900 px-4 py-2 rounded-xl font-bold text-sm animate-bounce-in shadow-lg"
        >
          +{n.amount} XP — {n.label}
        </div>
      ))}

      {/* Achievement unlocked */}
      {newAchievements.map(a => (
        <div
          key={a.id}
          className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-3 rounded-xl animate-bounce-in shadow-lg pointer-events-auto cursor-pointer"
          onClick={() => onDismissAchievement(a.id)}
        >
          <div className="text-xs font-medium text-purple-200 mb-0.5">🏆 Achievement Unlocked!</div>
          <div className="font-bold">{a.icon} {a.name}</div>
          <div className="text-xs text-purple-200 mt-0.5">{a.description}</div>
        </div>
      ))}
    </div>
  )
}
