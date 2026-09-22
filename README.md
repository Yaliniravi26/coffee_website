# VELORA BEAUTY — Web Application

> **"Beauty, Refined."**  
> Luxury cosmetics, skincare, and fragrance brand combining fashion editorial aesthetics with 3D product visualization.

---

## 🚀 Quick Start Guide

### 1. Requirements
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher (or pnpm / yarn / bun)

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Local Development Server
```bash
npm run dev
```

Open your browser at `http://localhost:3000` (or the port specified by Vite in terminal output).

### 4. Build for Production
```bash
npm run build
```

The production-ready assets will be created in the `dist/` directory.

---

## 📁 Project Architecture

- `src/App.tsx`: Main page layout, cart & wishlist state management, global interaction modals.
- `src/components/SignatureProductSection.tsx`: 3D interactive procedural campaign showcase with Three.js (Glow Serum bottle, physical label texture, white camellia flower, light ribbons, and responsive resize observer).
- `src/components/Hero.tsx`: High-fashion magazine editorial opening with instant preloading.
- `src/components/CategorySection.tsx`: 10 distinct beauty categories with high-resolution imagery and graceful fallbacks.
- `src/components/BestsellersSection.tsx`: Dynamic product collection showcase with category filtering, quick view, and cart actions.
- `src/components/ShopByConcern.tsx`: Cellular targeting interactive accordion.
- `src/components/MakeupEditorial.tsx`: High-fashion magazine spread with color stories.
- `src/components/DailyRitualSection.tsx`: 4-step ceremonial skincare protocol.
- `src/components/BrandStorySection.tsx`: The Velora philosophy and sustainability manifesto.
- `src/components/JournalSection.tsx`: Editorial essays and reading modal.
- `src/components/BeautyQuiz.tsx`: Interactive custom ritual diagnostic.
- `src/data/images.ts`: Centralized high-resolution image assets with automatic fallback error handling.
- `src/data/products.ts`: Complete product specifications, ingredients, concerns, and categories.

---

## 🛠 Tech Stack
- **React 19**
- **TypeScript**
- **Vite 8**
- **Tailwind CSS 4**
- **Three.js** (WebGL 3D interactive bottle & campaign stage)
- **Lucide React** (Icons)
