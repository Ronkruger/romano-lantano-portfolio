/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#07090d',
        'dark-bg-alt': '#0d1118',
        'surface-raised': '#121722',
        'surface-soft': '#171d28',
        'text-light': '#f4efe6',
        'text-muted': '#a7abb6',
        'accent-primary': '#d9b46d',
        'accent-secondary': '#2a3140',
        'highlight-blue': '#8fd3ff',
        'highlight-green': '#7dd3a8',
        'link-hover': '#f2cc8f',
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
      boxShadow: {
        editorial: '0 24px 80px rgba(0, 0, 0, 0.35)',
        lift: '0 18px 45px rgba(0, 0, 0, 0.28)',
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
