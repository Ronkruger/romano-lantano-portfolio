# Portfolio - Vite + React + TypeScript + Tailwind CSS

Modern portfolio website built with Vite, React, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/      # React components
│   │   ├── Header.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Services.tsx
│   │   ├── Projects.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── hooks/          # Custom React hooks
│   │   └── useTypingEffect.ts
│   ├── App.tsx         # Main App component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles with Tailwind
├── public/             # Static assets
├── images/             # Project images
├── resume/             # Resume PDF
└── index-new.html      # HTML template
```

## 🛠️ Technologies

- **Vite** - Fast build tool and dev server
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **AOS** - Animate on scroll library
- **Font Awesome** - Icon library

## ✨ Features

- ⚡ Lightning-fast development with Vite HMR
- 🎨 Modern, techy design with dark theme
- 📱 Fully responsive layout
- ✨ Smooth scroll animations with AOS
- ⌨️ Typing effect in hero section
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS for rapid styling
- 📧 Contact form with GetForm.io integration

## 📝 Customization

1. Update personal information in components
2. Replace images in the `images/` folder
3. Update resume PDF in `resume/` folder
4. Modify color scheme in `tailwind.config.js`
5. Customize animations in component files

## 🎨 Color Palette

- Dark Background: `#1a1a2e`
- Dark Background Alt: `#16213e`
- Accent Primary: `#e94560` (Pink/Red)
- Highlight Blue: `#00bcd4` (Cyan)
- Highlight Green: `#39ff14` (Neon Green)
- Text Light: `#e0e0e0`

## 📦 Deployment

Build the project and deploy the `dist` folder to your hosting service:

- Netlify
- Vercel
- GitHub Pages
- Render
- Any static hosting service

## 📄 License

© 2025 Romano Lantano. All rights reserved.
