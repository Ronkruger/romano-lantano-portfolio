# Quick Start Guide - Vite Portfolio

## 🚀 Commands

### Development
```bash
npm run dev
```
Opens at http://localhost:3000

### Build for Production
```bash
npm run build
```
Output in `dist/` folder

### Preview Production Build
```bash
npm run preview
```

## 📂 File Structure

### Original Files (Keep for reference)
- `index-old.html` - Original HTML file (rename current index.html to this)
- `style.css` - Original CSS file  
- `script.js` - Original JavaScript file

### New Vite Structure
- `index.html` - Vite HTML entry point (currently index-new.html)
- `src/` - All source code
  - `main.tsx` - App entry point
  - `App.tsx` - Main app component
  - `index.css` - Tailwind CSS
  - `components/` - All React components
  - `hooks/` - Custom React hooks

## 🎨 Customization

### Colors
Edit `tailwind.config.js` - colors are in the `theme.extend.colors` section

### Content
Edit component files in `src/components/`:
- `Header.tsx` - Hero section
- `About.tsx` - About section
- `Skills.tsx` - Skills grid
- `Services.tsx` - Services cards
- `Projects.tsx` - Project showcase
- `Testimonials.tsx` - Reviews
- `Contact.tsx` - Contact form
- `Footer.tsx` - Footer

### Typing Effect
Edit phrases in `src/components/Header.tsx`:
```typescript
useTypingEffect(
  ['Beautiful Digital Experiences', 'Your Custom Text', 'Another Phrase'],
  typingRef
);
```

## 🐛 Common Issues

### Port already in use
Change port in `vite.config.ts`:
```typescript
server: {
  port: 3001, // Change to another port
  open: true
}
```

### Images not showing
- Make sure images are in root folder or `public/`
- Use relative paths: `./images/image.png`

## 📦 Deployment

1. Build: `npm run build`
2. Deploy `dist/` folder to Netlify, Vercel, or GitHub Pages

## 💡 Tips

- Hot Module Replacement - Changes reflect instantly
- TypeScript - Hover over code for type information
- Install Tailwind CSS IntelliSense extension for VS Code
