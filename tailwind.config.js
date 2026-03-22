/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow':  'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up':    'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-in':   'bounceIn 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        'glow-pulse':  'glowPulse 2.5s ease-in-out infinite',
        'fade-in':     'fadeIn 0.2s ease-out',
        'scale-in':    'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        slideUp: {
          '0%':   { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        bounceIn: {
          '0%':   { transform: 'scale(0.85) translateY(-4px)', opacity: '0' },
          '60%':  { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1)',   opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 12px rgba(139, 92, 246, 0.4)' },
          '50%':      { boxShadow: '0 0 32px rgba(139, 92, 246, 0.75)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%':   { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)',    opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
