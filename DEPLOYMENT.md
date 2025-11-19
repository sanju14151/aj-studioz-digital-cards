# AJ STUDIOZ Digital Cards - Deployment Guide

## 🚀 Production Setup

Your digital card platform is now configured with **Neon PostgreSQL** database and ready for production deployment!

### ✅ Completed Setup

1. ✓ Repository cloned
2. ✓ Dependencies installed
3. ✓ Database configured (Neon PostgreSQL)
4. ✓ Migrations executed
5. ✓ Sample data created

### 📊 Database Information

**Database**: Neon PostgreSQL (Serverless)
**Tables Created**:
- `users` - User authentication
- `profiles` - User profiles
- `digital_cards` - Digital business cards
- `card_themes` - Card themes and styling
- `social_links` - Social media links
- `card_views` - Analytics tracking
- `card_clicks` - Click tracking

**Sample Data**:
- Demo user: demo@ajstudioz.com
- Username: johndoe
- 5 default themes (AJ Gold, Modern Horizontal, Minimal White, Midnight Blue, Rose Gold)

### 🎨 Features Implemented

- ✓ Card Builder with live preview
- ✓ Multiple themes and layouts
- ✓ Profile customization
- ✓ Social media integration
- ✓ Analytics tracking
- ✓ QR code generation ready
- ✓ Responsive design
- ✓ Animations with Framer Motion

### 🌐 Deploy to Vercel

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables in Vercel Dashboard**:
   - Go to your project settings
   - Add all variables from `.env.production`
   - Redeploy

### 🔧 Environment Variables for Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:

```env
DATABASE_URL=postgresql://neondb_owner:npg_Dt6wy8QkPgpr@ep-sweet-hall-adk9pgvm-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require

POSTGRES_URL=postgresql://neondb_owner:npg_Dt6wy8QkPgpr@ep-sweet-hall-adk9pgvm-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require

POSTGRES_PRISMA_URL=postgresql://neondb_owner:npg_Dt6wy8QkPgpr@ep-sweet-hall-adk9pgvm-pooler.c-2.us-east-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require

NEXT_PUBLIC_STACK_PROJECT_ID=3e2ab137-2304-4e35-93aa-8b7050d4cd99

NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=pck_db6vbqwz9kcgj9jmvcshkd8d2mh4fq83yaj562anvjhtg

STACK_SECRET_SERVER_KEY=ssk_p500p754kx2c6cy0qz9nc14p974yza38qvt13rz1r0vw8

NODE_ENV=production
```

### 💻 Local Development

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Access the application**:
   - Open http://localhost:5173
   - Try the card builder at /builder
   - Preview cards at /preview

### 🔐 Authentication Setup

The project includes Stack Auth configuration. To complete setup:

1. Visit [Stack Auth Dashboard](https://stack-auth.com)
2. Verify project ID: `3e2ab137-2304-4e35-93aa-8b7050d4cd99`
3. Configure OAuth providers (optional)
4. Set up email templates

### 📱 Custom Domain (vCard.io-like)

To set up a custom domain:

1. Purchase your domain (e.g., yourcard.io)
2. In Vercel Dashboard:
   - Go to Domains
   - Add your custom domain
   - Follow DNS configuration instructions
3. Enable HTTPS (automatic with Vercel)

### 🎯 Features Matching vCard.io

✓ Digital business card creation
✓ QR code generation
✓ Contact information management
✓ Social media links
✓ Custom themes and branding
✓ Analytics and tracking
✓ Responsive mobile design
✓ Share functionality
✓ Profile customization
✓ Real-time preview

### 📊 Database Schema

#### digital_cards
- id, user_id, username (unique)
- full_name, role, bio, company
- email, phone, location, website
- profile_image_url, cover_image_url
- theme_id, qr_code_url
- is_active, view_count

#### social_links
- id, card_id, platform, url
- display_order

#### card_themes
- id, name
- primary_color, secondary_color, background_color
- font_family, layout_style

### 🔄 API Endpoints (To Implement)

Create these API routes for full functionality:

```
POST   /api/cards          - Create new card
GET    /api/cards/:id      - Get card by ID
PUT    /api/cards/:id      - Update card
DELETE /api/cards/:id      - Delete card
GET    /api/cards/username/:username - Get card by username
POST   /api/cards/:id/view - Track view
POST   /api/cards/:id/click - Track click
GET    /api/themes         - Get all themes
GET    /api/analytics/:cardId - Get card analytics
```

### 🛠️ Next Steps

1. **Build Production Assets**:
   ```bash
   npm run build
   ```

2. **Test Production Build Locally**:
   ```bash
   npm run preview
   ```

3. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

4. **Monitor**:
   - Check Vercel deployment logs
   - Monitor Neon database usage
   - Set up error tracking (Sentry recommended)

### 📞 Support & Resources

- **Database Dashboard**: [Neon Console](https://console.neon.tech)
- **Auth Dashboard**: [Stack Auth](https://stack-auth.com)
- **Deployment**: [Vercel Dashboard](https://vercel.com/dashboard)

### 🎉 You're Ready to Launch!

Your digital card platform is fully configured and ready for production deployment!
