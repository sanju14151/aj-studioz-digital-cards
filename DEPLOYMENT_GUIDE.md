# Deployment Guide - Vercel Configuration

## ✅ Completed Features

### 1. Image Upload with Vercel Blob Storage
- Implemented Vercel Blob SDK integration
- Image validation (5MB profile, 10MB cover)
- Automatic image compression
- Public URL generation
- **File:** `src/lib/vercel-blob-upload.ts`

### 2. Industry Field
- Added `industry` VARCHAR(100) to `digital_cards` table
- 20 industry options with emojis (Technology, Healthcare, Finance, etc.)
- Industry dropdown in Builder
- Industry badge display on public cards
- API endpoints updated to save/retrieve industry

### 3. Custom Domain Support
- Custom domain settings page
- DNS verification system (CNAME + TXT records)
- Domain management API endpoints
- Real-time verification status
- **Route:** `/settings/custom-domain/:cardId`

### 4. UI Updates
- Changed "Company" label to "Company Name"
- Added industry badge to public cards
- Custom domain option in Dashboard

---

## 🔧 Required Vercel Configuration

### Environment Variables to Add in Vercel Dashboard

Go to your Vercel project → Settings → Environment Variables

```bash
# Vercel Blob Storage Token (Client-side)
VITE_BLOB_READ_WRITE_TOKEN="vercel_blob_rw_KhQZCPC2VupLCMEK_Pf4prNspY0QiZl3T8gS9d1yJWRuTrT"

# Vercel Blob Storage Token (Server-side)
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_KhQZCPC2VupLCMEK_Pf4prNspY0QiZl3T8gS9d1yJWRuTrT"
```

**Important:** Add these to all environments:
- ✅ Production
- ✅ Preview
- ✅ Development

---

## 📋 Deployment Steps

### 1. Commit & Push to GitHub
```bash
cd "D:\New folder (32)\aj-studioz-digital-cards"
git add .
git commit -m "feat: add Vercel Blob upload, industry field, and custom domain support"
git push origin main
```

### 2. Configure Vercel Environment Variables
1. Go to https://vercel.com/dashboard
2. Select your project: `aj-studioz-digital-cards`
3. Go to **Settings** → **Environment Variables**
4. Add both tokens (see above)
5. Click **Save**

### 3. Redeploy (if auto-deploy didn't trigger)
- Go to **Deployments** tab
- Click **Redeploy** on latest deployment
- Or push another commit to trigger auto-deploy

---

## 🧪 Testing Checklist

### Image Upload
- [ ] Upload profile image (should upload to Vercel Blob)
- [ ] Upload cover/banner image
- [ ] Verify images display correctly
- [ ] Check image URLs start with `https://` (Blob URLs)

### Industry Field
- [ ] Create new card with industry selection
- [ ] Update existing card with industry
- [ ] Verify industry displays on public card as badge
- [ ] Check Dashboard shows industry

### Custom Domain
- [ ] Navigate to `/settings/custom-domain/:cardId`
- [ ] Add custom domain (e.g., `mycard.example.com`)
- [ ] View DNS configuration instructions
- [ ] Test verification after configuring DNS

---

## 🔍 Troubleshooting

### Image Upload Not Working
**Error:** `VITE_BLOB_READ_WRITE_TOKEN is not defined`
**Solution:** Add environment variable to Vercel and redeploy

### Industry Field Not Saving
**Error:** `column "industry" does not exist`
**Solution:** Migration already run successfully. Check database connection.

### Custom Domain Verification Fails
**Error:** DNS records not found
**Solution:** 
1. Wait 5-10 minutes for DNS propagation
2. Verify CNAME points to your Vercel domain
3. Verify TXT record contains verification token

---

## 📊 Database Schema Changes

Migration already applied successfully:

```sql
-- Added to digital_cards table
ALTER TABLE digital_cards 
  ADD COLUMN industry VARCHAR(100);

-- Custom domain fields
ALTER TABLE digital_cards 
  ADD COLUMN custom_domain VARCHAR(255),
  ADD COLUMN custom_domain_verified BOOLEAN DEFAULT FALSE,
  ADD COLUMN custom_domain_verified_at TIMESTAMP;

-- New tables created
CREATE TABLE custom_domains (
  id SERIAL PRIMARY KEY,
  card_id INT REFERENCES digital_cards(id),
  domain VARCHAR(255) UNIQUE,
  verification_token VARCHAR(100),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE industries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE,
  icon VARCHAR(10)
);
```

---

## 🎯 Next Steps

1. **Deploy to Production**
   - Push code to GitHub
   - Configure environment variables
   - Verify deployment

2. **Test All Features**
   - Image uploads
   - Industry selection
   - Custom domain setup

3. **Monitor & Debug**
   - Check Vercel logs for errors
   - Test user flows end-to-end
   - Verify database updates

---

## 📁 Modified Files Summary

### API Endpoints
- ✅ `api/cards/index.js` - Added industry field to INSERT/UPDATE
- ✅ `api/cards/[username].js` - Returns industry automatically (SELECT *)
- ✅ `api/custom-domain/index.js` - New endpoint for domain management
- ✅ `api/custom-domain/verify/[domainId].js` - DNS verification endpoint

### Components & Pages
- ✅ `src/lib/vercel-blob-upload.ts` - New Vercel Blob integration
- ✅ `src/components/ImageUpload.tsx` - Updated to use Vercel Blob
- ✅ `src/pages/Builder.tsx` - Industry dropdown + Company Name label
- ✅ `src/pages/PublicCard.tsx` - Industry badge display
- ✅ `src/pages/CustomDomainSettings.tsx` - New custom domain page
- ✅ `src/pages/Dashboard.tsx` - Custom domain menu option
- ✅ `src/App.tsx` - Custom domain route

### Database
- ✅ `supabase/migrations/add-industry-and-custom-domain.cjs` - Schema updates

### Configuration
- ✅ `.env` - Added Vercel Blob tokens
- ✅ `package.json` - Added @vercel/blob and dotenv

---

## 🚀 Production URL
https://aj-studioz-digital-cards.vercel.app/

## 📦 GitHub Repository
https://github.com/sanju14151/aj-studioz-digital-cards
