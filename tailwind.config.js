/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1a1a2e',
        'dark-bg-alt': '#16213e',
        'text-light': '#e0e0e0',
        'text-muted': '#a0a0a0',
        'accent-primary': '#e94560',
        'accent-secondary': '#0f3460',
        'highlight-blue': '#00bcd4',
        'highlight-green': '#39ff14',
        'link-hover': '#f7d94c',
      },
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        code: ['Fira Code', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(90deg, rgba(255, 255, 255, .05) 1px, transparent 1px),
                         linear-gradient(rgba(255, 255, 255, .05) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '30px 30px',
      },
      animation: {
        'blink-caret': 'blink-caret 0.75s infinite',
        'scanline': 'scanline 3s infinite linear',
      },
      keyframes: {
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#00bcd4' },
        },
        'scanline': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
