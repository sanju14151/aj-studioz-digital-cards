# AJ STUDIOZ Digital Cards

<div align="center">

![AJ STUDIOZ](https://img.shields.io/badge/AJ-STUDIOZ-D4AF37?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkwxNSAxMEwyMiAxMkwxNSAxNEwxMiAyMkw5IDE0TDIgMTJMOSAxMEwxMiAyWiIgZmlsbD0iI0Q0QUYzNyIvPjwvc3ZnPg==)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?logo=vite)](https://vitejs.dev/)

**A modern, feature-rich digital business card platform with vCard.io-like capabilities**

[View Demo](#) · [Report Bug](https://github.com/sanju14151/aj-studioz-digital-cards/issues) · [Request Feature](https://github.com/sanju14151/aj-studioz-digital-cards/issues)

</div>

---

## ✨ Features

- 🎨 **Beautiful Card Builder** - Create stunning digital business cards with live preview
- 🎭 **Multiple Themes** - 5+ professional themes including AJ Gold, Modern, Minimal
- 📱 **Fully Responsive** - Perfect on mobile, tablet, and desktop
- 🔗 **Social Integration** - Connect all your social media profiles
- 📊 **Analytics** - Track views and clicks on your cards
- 🎯 **QR Code Ready** - Generate QR codes for easy sharing
- ⚡ **Fast & Modern** - Built with Vite, React, and TypeScript
- 🎭 **Smooth Animations** - Powered by Framer Motion
- 🗄️ **PostgreSQL Database** - Powered by Neon serverless PostgreSQL
- 🔐 **Authentication Ready** - Stack Auth integration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (Neon account recommended)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/sanju14151/aj-studioz-digital-cards.git

# Navigate to project directory
cd aj-studioz-digital-cards

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
npm run migrate

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your app!

## 🗄️ Database Setup

The project uses **Neon PostgreSQL** (serverless). Your database is already configured with:

### Tables Created
- ✅ `users` - User authentication
- ✅ `profiles` - User profiles  
- ✅ `digital_cards` - Digital business cards
- ✅ `card_themes` - Card themes and styling
- ✅ `social_links` - Social media links
- ✅ `card_views` - View analytics
- ✅ `card_clicks` - Click tracking

### Sample Data Included
- Demo user: `demo@ajstudioz.com`
- Username: `johndoe`
- 5 default themes (AJ Gold, Modern, Minimal, Midnight Blue, Rose Gold)

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.19
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion 12.23.24
- **Database**: PostgreSQL (Neon)
- **Database Client**: pg 8.16.3
- **Authentication**: Stack Auth
- **State Management**: TanStack Query 5.83.0
- **Routing**: React Router DOM 6.30.1
- **Form Handling**: React Hook Form 7.61.1
- **Icons**: Lucide React 0.462.0
- **QR Codes**: qrcode 1.5.4

## 📁 Project Structure

```
aj-studioz-digital-cards/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ui/         # shadcn/ui components
│   │   └── motion/     # Framer Motion components
│   ├── pages/          # Page components
│   │   ├── Index.tsx   # Landing page
│   │   ├── Builder.tsx # Card builder
│   │   ├── Preview.tsx # Card preview
│   │   └── Auth.tsx    # Authentication
│   ├── lib/            # Utility functions
│   │   ├── utils.ts    # Helper functions
│   │   └── db-api.js   # Database API
│   ├── hooks/          # Custom React hooks
│   └── integrations/   # Third-party integrations
├── supabase/
│   └── migrations/     # Database migrations
├── public/             # Static assets
└── package.json        # Dependencies

```

## 🎨 Available Themes

1. **AJ Gold** - Luxurious gold and black theme
2. **Modern Horizontal** - Contemporary horizontal layout
3. **Minimal White** - Clean and minimalist
4. **Midnight Blue** - Professional blue theme
5. **Rose Gold** - Elegant rose gold styling

## 📦 Build for Production

```bash
# Build production bundle
npm run build:prod

# Preview production build locally
npm run preview

# Deploy to Vercel
vercel --prod
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

3. Set environment variables in Vercel Dashboard

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Environment Variables

```env
# Database
DATABASE_URL=your_neon_database_url
POSTGRES_URL=your_postgres_url

# Auth
NEXT_PUBLIC_STACK_PROJECT_ID=your_project_id
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_key
STACK_SECRET_SERVER_KEY=your_secret

# App
NODE_ENV=production
```

## 🎯 Features Matching vCard.io

✅ Digital business card creation  
✅ QR code generation  
✅ Contact information management  
✅ Social media links  
✅ Custom themes and branding  
✅ Analytics and tracking  
✅ Responsive mobile design  
✅ Share functionality  
✅ Profile customization  
✅ Real-time preview  

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**AJ STUDIOZ**

- GitHub: [@sanju14151](https://github.com/sanju14151)
- Project: [aj-studioz-digital-cards](https://github.com/sanju14151/aj-studioz-digital-cards)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Neon](https://neon.tech/) for serverless PostgreSQL
- [Vercel](https://vercel.com/) for hosting
- [Stack Auth](https://stack-auth.com/) for authentication

## 📞 Support

For support, email support@ajstudioz.com or open an issue on GitHub.

---

<div align="center">

Made with ❤️ by **AJ STUDIOZ**

⭐ Star this repo if you find it helpful!

</div>
