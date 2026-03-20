import { useState } from 'react'
import { CharacterClass } from '../types'
import { classDescriptions, classIcons, classStartingStats } from '../utils/gameEngine'

interface Props {
  onComplete: (name: string, charClass: CharacterClass) => void
}

const classes: CharacterClass[] = ['Warrior', 'Ranger', 'Mage', 'Paladin']

export default function CharacterSetup({ onComplete }: Props) {
  const [name, setName] = useState('')
  const [selected, setSelected] = useState<CharacterClass>('Warrior')
  const [step, setStep] = useState<1 | 2>(1)

  const handleSubmit = () => {
    if (name.trim().length === 0) return
    onComplete(name.trim(), selected)
  }

  const stats = classStartingStats[selected]

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">⚔️</div>
          <h1 className="text-4xl font-bold text-white mb-1 tracking-tight">
            Fit<span className="text-purple-400">Warrior</span>
          </h1>
          <p className="text-slate-400">Level up your real life. One habit at a time.</p>
        </div>

        {step === 1 ? (
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-1">What's your warrior name?</h2>
            <p className="text-slate-400 text-sm mb-5">This is how you'll appear on your character sheet.</p>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && name.trim() && setStep(2)}
              placeholder="Enter your name..."
              maxLength={20}
              className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
            <button
              onClick={() => name.trim() && setStep(2)}
              disabled={!name.trim()}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all"
            >
              Choose Your Class →
            </button>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-1">Choose your class</h2>
            <p className="text-slate-400 text-sm mb-5">Each class starts with different stat bonuses. You can grow any stat over time.</p>

            <div className="grid grid-cols-2 gap-3 mb-5">
              {classes.map(cls => (
                <button
                  key={cls}
                  onClick={() => setSelected(cls)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selected === cls
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                  }`}
                >
                  <div className="text-3xl mb-1">{classIcons[cls]}</div>
                  <div className="font-bold text-white">{cls}</div>
                  <div className="text-xs text-slate-400 mt-1">{classDescriptions[cls]}</div>
                </button>
              ))}
            </div>

            {/* Stat preview */}
            <div className="bg-slate-700/50 rounded-xl p-4 mb-5">
              <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider">Starting Stats — {selected}</p>
              <div className="grid grid-cols-5 gap-2">
                {(Object.entries(stats) as [string, number][]).map(([key, val]) => (
                  <div key={key} className="text-center">
                    <div className="text-yellow-400 font-bold text-lg">{val}</div>
                    <div className="text-slate-400 text-xs uppercase">{key}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition-all"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-[2] bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition-all"
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
