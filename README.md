<div align="center">

  <img src="https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/shadcn/ui-latest-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />

<br /><br />

  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Pot%20of%20Food.png" width="90" alt="Restaurant UI" />

  <h1>QuickPrimeTech Restaurant UI</h1>

  <p>
    <strong>⚡ Scaffold restaurant websites in seconds, not hours</strong>
  </p>

  <p>
    Production-ready blocks, components, and pages powered by AI 
    <br />
    to build stunning restaurant websites instantly
  </p>

  <p>
    <a href="#-quick-start"><strong>🚀 Get Started</strong></a> •
    <a href="#-blocks"><strong>🧱 Blocks</strong></a> •
    <a href="#-components"><strong>🧩 Components</strong></a> •
    <a href="#-pages"><strong>📄 Pages</strong></a>
  </p>

  <br />

<img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop&q=80" 
       alt="Restaurant UI Preview" 
       style="border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); max-width: 800px; width: 100%;" />

</div>

---

## ✨ What is This?

**QuickPrimeTech Restaurant UI** is a comprehensive design system and component library built specifically for restaurant businesses. It transforms the traditional hours-long website development process into seconds through AI-powered scaffolding.

### 🎯 Key Value Propositions

- **🤖 AI-Powered**: Describe your restaurant concept, and AI assembles the perfect layout
- **🧩 Modular Architecture**: Mix and match blocks like LEGO pieces
- **⚡ Instant Deployment**: Go from idea to live site in minutes
- **🎨 Restaurant-First Design**: Every component optimized for food service UX

---

## 🚀 Quick Start

Get your restaurant website running locally in under 60 seconds:

```bash
# Clone the repository
git clone https://github.com/quickprimetech/restaurant-ui.git
cd restaurant-ui

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

> 💡 **Pro Tip**: Start editing by modifying `app/page.tsx`. The page auto-updates as you edit the file thanks to Next.js Fast Refresh.

---

## 🧱 Blocks

Production-ready page sections you can mix and match:

| Block                | Description                   | Features                                                  |
| -------------------- | ----------------------------- | --------------------------------------------------------- |
| 🦸 **Hero**          | Immersive full-screen headers | Video backgrounds, animated text, reservation CTAs        |
| 🍽️ **Menu Showcase** | Beautiful dish presentations  | Category filtering, dietary badges, price formatting      |
| ⭐ **Testimonials**  | Customer review displays      | Star ratings, photo carousels, verified badges            |
| 👨‍🍳 **Chef Profiles** | Team member highlights        | Bio cards, specialty tags, social links                   |
| 📅 **Reservations**  | Booking system integration    | Calendar pickers, party size selectors, SMS confirmations |
| 🖼️ **Gallery**       | Visual ambiance showcases     | Masonry layouts, lightbox views, lazy loading             |
| 📍 **Location**      | Find us sections              | Embedded maps, hours tables, parking info                 |
| 🦶 **Footer**        | Multi-column footers          | Newsletter signup, social links, sitemap                  |

---

## 🧩 Components

Specialized restaurant UI primitives built on accessibility-first principles:

```tsx
// Example: Complete Menu Item Component
import { MenuCard } from "@/components/restaurant/menu-card";

<MenuCard
  name="Truffle Mushroom Risotto"
  description="Arborio rice, wild mushrooms, black truffle oil, parmesan crisp"
  price={28}
  image="/dishes/risotto.jpg"
  tags={["Vegetarian", "Gluten-Free Available"]}
  calories={450}
  spicyLevel={0}
  preparationTime="25 min"
  isChefSpecial={true}
/>;
```

### Available Component Categories

**Layout Components**

- `Container` — Responsive width constraints
- `Section` — Spacing and background variants
- `Grid` — Menu and gallery layouts
- `Split` — Two-column content layouts

**Content Components**

- `MenuCard` — Dish displays with rich metadata
- `ChefCard` — Staff profiles with hover effects
- `ReviewCard` — Customer testimonials
- `BlogCard` — Article previews
- `EventCard` — Special occasions and promotions

**Form Components**

- `ReservationForm` — Complete booking flow
- `ContactForm` — Inquiry handling
- `NewsletterSignup` — Email capture
- `ReviewForm` — Customer feedback

**Feedback Components**

- `Toast` — Action confirmations
- `Modal` — Dish detail views
- `Tooltip` — Information hints
- `LoadingSpinner` — Async state handling

---

## 📄 Pages

Complete page templates ready for your content:

### 🏠 Homepage (`/`)

Hero Section → Featured Menu Items → About Preview → Customer Reviews → Reservation CTA → Footer

### 📖 Menu Page (`/menu`)

Category Navigation → Filterable Dish Grid → Detailed Modals → Dietary Legend → Chef Recommendations

### 📅 Reservations (`/reservations`)

Availability Calendar → Time Slot Selection → Party Size → Contact Details → Confirmation

### 👥 About (`/about`)

Restaurant Story → Philosophy → Team Grid → Awards & Press → Timeline

### 📸 Gallery (`/gallery`)

Filterable Masonry Grid → Lightbox Viewer → Category Tabs → Download Options

### 📞 Contact (`/contact`)

Contact Form → Location Map → Operating Hours → FAQ Accordion → Parking Info

---

## 🛠️ Tech Stack

<div align="center">

| Technology       | Purpose                         | Link                                        |
| ---------------- | ------------------------------- | ------------------------------------------- |
| **Next.js 15**   | React Framework with App Router | [Documentation](https://nextjs.org/docs)    |
| **TypeScript**   | Type-safe development           | [Documentation](https://typescriptlang.org) |
| **Tailwind CSS** | Utility-first styling           | [Documentation](https://tailwindcss.com)    |
| **shadcn/ui**    | Accessible component primitives | [Documentation](https://ui.shadcn.com)      |
| **Radix UI**     | Headless UI components          | [Documentation](https://radix-ui.com)       |
| **Geist**        | Modern font family              | [Vercel Font](https://vercel.com/font)      |

</div>

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

---

## 📚 Learn More

### Next.js Resources

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial
- [Next.js GitHub Repository](https://github.com/vercel/next.js) - Your feedback and contributions are welcome!

### QuickPrimeTech Resources

- [Documentation](https://docs.quickprimetech.com) - Comprehensive guides and API references
- [Component Gallery](https://ui.quickprimetech.com) - Live interactive component playground
- [Discord Community](https://discord.gg/quickprimetech) - Get help and share your projects

---

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/quickprimetech/restaurant-ui)

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

<div align="center">

### Built with ❤️ by QuickPrimeTech

  <p>
    <sub>Transforming restaurant web design from hours into seconds.</sub>
  </p>

  <p>
    <a href="https://instagram.com/quickprimetech">Instagram</a> •
    <a href="https://github.com/QuickPrimeTech">GitHub</a> •
    <a href="https://quickprimetech.com">Website</a>
  </p>

</div>
