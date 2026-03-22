import { useState } from 'react'
import { CharacterClass } from '../types'
import { classDescriptions, classIcons, classStartingStats } from '../utils/gameEngine'

interface Props {
  onComplete: (name: string, charClass: CharacterClass) => void
}

const classes: CharacterClass[] = ['Warrior', 'Ranger', 'Mage', 'Paladin']

export default function CharacterSetup({ onComplete }: Props) {
  const [name, setName]         = useState('')
  const [selected, setSelected] = useState<CharacterClass>('Warrior')
  const [step, setStep]         = useState<1 | 2>(1)

  const handleSubmit = () => {
    if (name.trim().length === 0) return
    onComplete(name.trim(), selected)
  }

  const stats = classStartingStats[selected]

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: '#09090f',
        backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(109,40,217,0.2) 0%, transparent 60%)',
      }}
    >
      <div className="w-full max-w-lg animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 rounded-3xl mx-auto mb-4 flex items-center justify-center text-5xl animate-glow-pulse"
            style={{
              background: 'rgba(109,40,217,0.2)',
              border: '1px solid rgba(139,92,246,0.3)',
              boxShadow: '0 0 40px rgba(109,40,217,0.25)',
            }}
          >
            ⚔️
          </div>
          <h1 className="text-4xl font-bold text-white mb-1 tracking-tight">
            Fit<span className="text-gradient-violet">Warrior</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">Level up your real life. One habit at a time.</p>
        </div>

        {step === 1 ? (
          <div
            className="rounded-2xl p-6"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <h2 className="text-lg font-bold text-white mb-1">What's your warrior name?</h2>
            <p className="text-slate-500 text-sm mb-5">This is how you'll appear on your character sheet.</p>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && name.trim() && setStep(2)}
              placeholder="Enter your name..."
              maxLength={20}
              className="w-full rounded-xl px-4 py-3 text-white placeholder-slate-600 text-base focus:outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              onFocus={e => {
                e.target.style.border = '1px solid rgba(139,92,246,0.5)'
                e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.1)'
              }}
              onBlur={e => {
                e.target.style.border = '1px solid rgba(255,255,255,0.1)'
                e.target.style.boxShadow = 'none'
              }}
            />
            <button
              onClick={() => name.trim() && setStep(2)}
              disabled={!name.trim()}
              className="mt-4 w-full font-bold py-3 rounded-xl transition-all duration-200 text-white"
              style={
                name.trim()
                  ? {
                      background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                      boxShadow: '0 4px 20px rgba(109,40,217,0.35)',
                    }
                  : {
                      background: 'rgba(255,255,255,0.05)',
                      color: '#475569',
                      cursor: 'not-allowed',
                    }
              }
            >
              Choose Your Class →
            </button>
          </div>
        ) : (
          <div
            className="rounded-2xl p-6"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <h2 className="text-lg font-bold text-white mb-1">Choose your class</h2>
            <p className="text-slate-500 text-sm mb-5">Each class starts with different stat bonuses.</p>

            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {classes.map(cls => {
                const isSelected = selected === cls
                return (
                  <button
                    key={cls}
                    onClick={() => setSelected(cls)}
                    className="p-4 rounded-xl text-left transition-all duration-200"
                    style={
                      isSelected
                        ? {
                            background: 'rgba(109,40,217,0.2)',
                            border: '2px solid rgba(139,92,246,0.5)',
                            boxShadow: '0 0 16px rgba(109,40,217,0.2)',
                          }
                        : {
                            background: 'rgba(255,255,255,0.04)',
                            border: '2px solid rgba(255,255,255,0.07)',
                          }
                    }
                  >
                    <div className="text-3xl mb-1.5">{classIcons[cls]}</div>
                    <div className="font-bold text-white text-sm">{cls}</div>
                    <div className="text-xs text-slate-500 mt-0.5 leading-snug">{classDescriptions[cls]}</div>
                  </button>
                )
              })}
            </div>

            {/* Stat preview */}
            <div
              className="rounded-xl p-4 mb-5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p className="text-xs text-slate-500 mb-3 font-semibold uppercase tracking-wider">
                Starting Stats — {selected}
              </p>
              <div className="grid grid-cols-5 gap-2">
                {(Object.entries(stats) as [string, number][]).map(([key, val]) => (
                  <div key={key} className="text-center">
                    <div className="text-amber-400 font-bold text-lg">{val}</div>
                    <div className="text-slate-500 text-xs uppercase font-medium">{key}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={() => setStep(1)}
                className="flex-1 font-bold py-3 rounded-xl transition-all duration-200 text-slate-300"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-[2] font-bold py-3 rounded-xl transition-all duration-200 text-white"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                  boxShadow: '0 4px 20px rgba(109,40,217,0.35)',
                }}
              >
                Begin Journey 🚀
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
