# 🚀 QUICK START GUIDE

Get the Jainism Encyclopedia + Panchang Platform running in 10 minutes.

---

## ⚡ Prerequisites

- Node.js 18+ installed
- Git installed
- Supabase account (free tier works)
- Code editor (VS Code recommended)

---

## 📦 Installation

### 1. Clone Repository

```bash
git clone https://github.com/goldameesh/jainism-encyclopedia-panchang.git
cd jainism-encyclopedia-panchang
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

**Create Project:**
1. Go to https://supabase.com
2. Click "New Project"
3. Name it "jainism-encyclopedia"
4. Choose region closest to you
5. Set a strong database password

**Run Database Schema:**
1. Open Supabase SQL Editor
2. Copy contents of `supabase/schema.sql`
3. Paste and execute

**Get API Keys:**
1. Go to Project Settings → API
2. Copy `Project URL`
3. Copy `anon public` key
4. Copy `service_role` key (keep secret!)

### 4. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_LANGUAGE=en
```

### 5. Run Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

---

## ✅ Verify Setup

You should see:
- ✅ App loads without errors
- ✅ Database connection works
- ✅ No console errors

---

## 🎯 Next Steps

### For Developers

1. **Read Documentation**
   - `/docs/MASTER_SPEC.md` - Complete specification
   - `/docs/DEVELOPMENT.md` - Development guide
   - `/docs/PROJECT_PLAN.md` - Roadmap

2. **Explore Codebase**
   - `/src/types/` - TypeScript definitions
   - `/src/lib/validation/` - Content validation
   - `/src/lib/panchang/` - Panchang calculations

3. **Start Building**
   - Add Tirthankara data
   - Create encyclopedia articles
   - Build UI components

### For Content Contributors

1. **Review Sources**
   - Read `/docs/SOURCES.md`
   - Understand trusted sources
   - Learn validation rules

2. **Content Format**
   - All content in 4 languages (EN/HI/MR/GU)
   - Cite trusted sources
   - Mark traditional vs historical

3. **Submit Content**
   - Create data files
   - Validate against schema
   - Submit pull request

---

## 🐛 Troubleshooting

### Database Connection Error

**Problem**: Can't connect to Supabase

**Solution**:
1. Check `.env.local` has correct values
2. Verify Supabase project is active
3. Check API keys are correct
4. Restart dev server

### Build Errors

**Problem**: TypeScript or build errors

**Solution**:
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### Port Already in Use

**Problem**: Port 3000 is busy

**Solution**:
```bash
# Use different port
PORT=3001 npm run dev
```

---

## 📚 Key Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # Check TypeScript
npm test               # Run tests

# Database
# (Run in Supabase SQL Editor)
# Copy from supabase/schema.sql
```

---

## 🎨 Project Structure

```
jainism-encyclopedia-panchang/
├── src/
│   ├── app/           # Next.js pages
│   ├── components/    # React components
│   ├── lib/          # Utilities
│   ├── data/         # Content data
│   └── types/        # TypeScript types
├── public/
│   └── locales/      # Translations
├── supabase/
│   └── schema.sql    # Database schema
└── docs/             # Documentation
```

---

## 🔐 Security Notes

⚠️ **NEVER commit `.env.local`**
⚠️ **Keep service_role key secret**
⚠️ **Use environment variables in production**

---

## 🤝 Get Help

- **Issues**: https://github.com/goldameesh/jainism-encyclopedia-panchang/issues
- **Discussions**: https://github.com/goldameesh/jainism-encyclopedia-panchang/discussions
- **Documentation**: `/docs/` folder

---

## 🎯 What's Built So Far

✅ **Foundation**
- Project structure
- Database schema
- Type definitions
- Content validation
- Panchang calculator (basic)

⏳ **In Progress**
- User authentication
- Multi-language setup
- UI components

📋 **Planned**
- Tirthankara profiles
- Encyclopedia articles
- Ritual guides
- Production deployment

---

## 🚀 Deploy to Production

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial setup"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repo
   - Add environment variables
   - Deploy!

3. **Set Environment Variables**
   - Add all variables from `.env.local`
   - Click "Deploy"

Your app will be live at: `https://your-project.vercel.app`

---

## 📊 Development Checklist

- [ ] Repository cloned
- [ ] Dependencies installed
- [ ] Supabase project created
- [ ] Database schema executed
- [ ] Environment variables configured
- [ ] Dev server running
- [ ] No console errors
- [ ] Documentation reviewed
- [ ] Ready to contribute!

---

**You're all set! Start building the future of Jain digital resources. 🕉️**

**Jai Jinendra!**