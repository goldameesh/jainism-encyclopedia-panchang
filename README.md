# 🕉️ Jainism Encyclopedia + Panchang Platform

**Zero-Hallucination | Multi-Language | Fact-Certified | Sect-Aware**

A comprehensive digital platform for Jain knowledge, daily Panchang, and ritual guidance with support for English, Hindi, Marathi, and Gujarati.

## 🎯 Core Principles

- **Zero Hallucination**: All content validated against trusted sources
- **Multi-Language**: Native support for EN/HI/MR/GU
- **Sect-Aware**: Differentiated content for Śvetāmbara and Digambara traditions
- **Copyright Compliant**: Only public domain or licensed content
- **Factually Accurate**: Clear distinction between tradition and historical scholarship

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14 (React) with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **i18n**: next-intl for multilingual support
- **Deployment**: Vercel
- **Panchang Engine**: Custom astronomical calculations + verified APIs

### Core Modules

1. **Encyclopedia Module**
   - Jainism Foundations
   - 24 Tirthankara Profiles
   - Sect Differences
   - Scripture Knowledge (safe summaries)
   - Festivals & Vrats

2. **Panchang Engine**
   - Daily Panchang (Tithi, Nakshatra, Yoga, Karana, Vaar)
   - Location-aware Sunrise/Sunset
   - Pachkhan timing automation
   - Festival calculations

3. **Ritual Guides Module**
   - Navkar Mantra (with translations)
   - Samayik (48-minute guided flow)
   - Pratikraman (structure only)
   - Pachkhan/Pratyakhyan (vow-taking generator)

4. **Multi-Language Rendering Layer**
   - Dynamic language switching
   - Script-aware rendering (Devanagari, Gujarati, Latin)
   - Localized Panchang terminology

## 📁 Project Structure

```
jainism-encyclopedia-panchang/
├── src/
│   ├── app/                    # Next.js 14 app directory
│   ├── components/             # React components
│   │   ├── encyclopedia/       # Encyclopedia UI
│   │   ├── panchang/          # Panchang UI
│   │   ├── rituals/           # Ritual guides UI
│   │   └── shared/            # Shared components
│   ├── lib/                   # Utilities and helpers
│   │   ├── panchang/          # Panchang calculations
│   │   ├── i18n/              # Internationalization
│   │   └── validation/        # Content validation
│   ├── data/                  # Validated content data
│   │   ├── tirthankaras/      # Tirthankara profiles
│   │   ├── festivals/         # Festival data
│   │   └── scriptures/        # Scripture summaries
│   └── types/                 # TypeScript definitions
├── public/
│   ├── locales/               # Translation files
│   │   ├── en/
│   │   ├── hi/
│   │   ├── mr/
│   │   └── gu/
│   └── assets/                # Images, icons
├── docs/                      # Documentation
│   ├── MASTER_SPEC.md         # Master specification
│   ├── SOURCES.md             # Trusted sources list
│   └── API.md                 # API documentation
└── tests/                     # Test suites
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

```bash
# Clone the repository
git clone https://github.com/goldameesh/jainism-encyclopedia-panchang.git
cd jainism-encyclopedia-panchang

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Visit `http://localhost:3000`

## 🌍 Supported Languages

- 🇬🇧 English (EN)
- 🇮🇳 हिंदी (HI)
- 🇮🇳 मराठी (MR)
- 🇮🇳 ગુજરાતી (GU)

## 📚 Trusted Sources

All content is validated against:
- Encyclopaedia Britannica
- Jainworld.com
- Digital Jain Pathshala
- Jain Study Center
- Scholarly works on Jain history
- Community-certified Jain Panchang sources

## 🔒 Content Validation

Every piece of information must pass validation:
- Source verification
- Sect-appropriate rendering
- Copyright compliance
- Historical vs traditional distinction

**If uncertain**: System responds with "This is not Factually correct."

## 🛠️ Development Roadmap

### Phase 1: Foundation (Weeks 1-2)
- [ ] Project setup and architecture
- [ ] Database schema design
- [ ] Multi-language infrastructure
- [ ] User profile system

### Phase 2: Encyclopedia Module (Weeks 3-4)
- [ ] Tirthankara profiles
- [ ] Core philosophy content
- [ ] Sect differentiation system
- [ ] Festival database

### Phase 3: Panchang Engine (Weeks 5-6)
- [ ] Astronomical calculations
- [ ] Location services
- [ ] Pachkhan timing automation
- [ ] Festival date calculations

### Phase 4: Ritual Guides (Week 7)
- [ ] Navkar Mantra module
- [ ] Samayik guided flow
- [ ] Pratikraman structure
- [ ] Pachkhan vow generator

### Phase 5: Testing & Launch (Week 8)
- [ ] Content validation
- [ ] Multi-language testing
- [ ] Performance optimization
- [ ] Production deployment

## 🤝 Contributing

Contributions must adhere to:
1. Zero-hallucination policy
2. Source citation requirements
3. Multi-language support
4. Sect-aware content guidelines

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

## 📞 Contact

For questions or suggestions, please open an issue.

---

**Built with respect for Jain tradition and commitment to factual accuracy.**