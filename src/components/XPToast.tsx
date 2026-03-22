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
          className="px-4 py-2.5 rounded-xl font-bold text-sm animate-bounce-in"
          style={{
            background: 'linear-gradient(135deg, rgba(217,119,6,0.95), rgba(245,158,11,0.95))',
            color: '#1c1005',
            boxShadow: '0 4px 20px rgba(245,158,11,0.4), 0 0 0 1px rgba(245,158,11,0.3)',
            backdropFilter: 'blur(12px)',
          }}
        >
          +{n.amount} XP — {n.label}
        </div>
      ))}

      {/* Achievement unlocked */}
      {newAchievements.map(a => (
        <div
          key={a.id}
          className="px-4 py-3 rounded-xl animate-bounce-in pointer-events-auto cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, rgba(91,33,182,0.97), rgba(109,40,217,0.97))',
            boxShadow: '0 4px 24px rgba(109,40,217,0.5), 0 0 0 1px rgba(139,92,246,0.3)',
            backdropFilter: 'blur(12px)',
          }}
          onClick={() => onDismissAchievement(a.id)}
        >
          <div className="text-xs font-semibold mb-0.5" style={{ color: '#c4b5fd' }}>
            🏆 Achievement Unlocked!
          </div>
          <div className="font-bold text-white">{a.icon} {a.name}</div>
          <div className="text-xs mt-0.5" style={{ color: '#a78bfa' }}>{a.description}</div>
        </div>
      ))}
    </div>
  )
}
