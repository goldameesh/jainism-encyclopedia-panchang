# 🛠️ DEVELOPMENT GUIDE

Complete guide for developing the Jainism Encyclopedia + Panchang Platform.

## 📋 Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Git**: Latest version
- **Supabase Account**: For database hosting
- **Vercel Account** (optional): For deployment

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/goldameesh/jainism-encyclopedia-panchang.git
cd jainism-encyclopedia-panchang
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_LANGUAGE=en
```

### 4. Set Up Database

1. Create a new Supabase project
2. Run the schema migration:

```bash
# Copy the contents of supabase/schema.sql
# Paste into Supabase SQL Editor
# Execute the query
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
jainism-encyclopedia-panchang/
├── src/
│   ├── app/                    # Next.js 14 app directory
│   │   ├── [locale]/          # Internationalized routes
│   │   ├── api/               # API routes
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── encyclopedia/      # Encyclopedia UI
│   │   ├── panchang/         # Panchang UI
│   │   ├── rituals/          # Ritual guides UI
│   │   └── shared/           # Shared components
│   ├── lib/                  # Utilities and helpers
│   │   ├── panchang/         # Panchang calculations
│   │   ├── i18n/             # Internationalization
│   │   ├── validation/       # Content validation
│   │   └── supabase/         # Database client
│   ├── data/                 # Validated content data
│   │   ├── tirthankaras/     # Tirthankara profiles
│   │   ├── festivals/        # Festival data
│   │   └── scriptures/       # Scripture summaries
│   └── types/                # TypeScript definitions
├── public/
│   ├── locales/              # Translation files
│   │   ├── en/
│   │   ├── hi/
│   │   ├── mr/
│   │   └── gu/
│   └── assets/               # Images, icons
├── supabase/
│   └── schema.sql            # Database schema
├── docs/                     # Documentation
└── tests/                    # Test suites
```

## 🔧 Development Workflow

### Adding New Content

#### 1. Encyclopedia Article

```typescript
// src/data/articles/new-article.ts
import type { EncyclopediaArticle } from '@/types';

export const newArticle: EncyclopediaArticle = {
  id: 'uuid-here',
  slug: 'article-slug',
  category: 'philosophy',
  title: {
    en: 'English Title',
    hi: 'हिंदी शीर्षक',
    mr: 'मराठी शीर्षक',
    gu: 'ગુજરાતી શીર્ષક',
  },
  content: {
    en: 'English content...',
    hi: 'हिंदी सामग्री...',
    mr: 'मराठी सामग्री...',
    gu: 'ગુજરાતી સામગ્રી...',
  },
  is_traditional: true,
  sources: [
    {
      name: 'Encyclopaedia Britannica',
      type: 'academic',
      url: 'https://...',
    },
  ],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};
```

#### 2. Validate Content

```typescript
import { validateContent } from '@/lib/validation/content-validator';

const validation = validateContent({
  sources: newArticle.sources,
  is_traditional: newArticle.is_traditional,
});

if (!validation.is_valid) {
  console.error(validation.error_message);
}
```

#### 3. Insert into Database

```typescript
import { supabase } from '@/lib/supabase/client';

const { data, error } = await supabase
  .from('encyclopedia_articles')
  .insert(newArticle);
```

### Adding Translations

1. Edit translation files in `public/locales/[lang]/`
2. Follow the JSON structure:

```json
{
  "common": {
    "app_name": "Jainism Encyclopedia",
    "welcome": "Welcome"
  },
  "encyclopedia": {
    "tirthankaras": "Tirthankaras",
    "philosophy": "Philosophy"
  }
}
```

### Creating Components

```typescript
// src/components/encyclopedia/TirthankaraCard.tsx
import type { Tirthankara } from '@/types';
import { useTranslations } from 'next-intl';

interface Props {
  tirthankara: Tirthankara;
}

export function TirthankaraCard({ tirthankara }: Props) {
  const t = useTranslations('encyclopedia');
  
  return (
    <div className="card">
      <h3>{tirthankara.name.en}</h3>
      {/* Component content */}
    </div>
  );
}
```

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Test Coverage

```bash
npm run test:coverage
```

### Writing Tests

```typescript
// src/lib/validation/__tests__/content-validator.test.ts
import { validateContent } from '../content-validator';

describe('Content Validator', () => {
  it('should validate trusted sources', () => {
    const result = validateContent({
      sources: [
        {
          name: 'Encyclopaedia Britannica',
          type: 'academic',
        },
      ],
    });
    
    expect(result.is_valid).toBe(true);
  });
  
  it('should reject untrusted sources', () => {
    const result = validateContent({
      sources: [
        {
          name: 'Random Blog',
          type: 'academic',
        },
      ],
    });
    
    expect(result.is_valid).toBe(false);
  });
});
```

## 🎨 Styling Guidelines

### Tailwind CSS Classes

- Use semantic color names: `saffron`, `lotus`, `sacred`
- Follow mobile-first approach
- Use consistent spacing scale

```tsx
<div className="bg-saffron-50 p-4 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-saffron-900">
    Title
  </h2>
</div>
```

### Component Patterns

```tsx
// Button component
<button className="px-4 py-2 bg-saffron-600 text-white rounded-md hover:bg-saffron-700 transition-colors">
  Click Me
</button>

// Card component
<div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
  {/* Card content */}
</div>
```

## 🌍 Internationalization

### Using Translations

```typescript
import { useTranslations } from 'next-intl';

function Component() {
  const t = useTranslations('namespace');
  
  return <h1>{t('key')}</h1>;
}
```

### Language Switching

```typescript
import { useRouter } from 'next/navigation';

function LanguageSwitcher() {
  const router = useRouter();
  
  const changeLanguage = (locale: string) => {
    router.push(`/${locale}`);
  };
  
  return (
    <select onChange={(e) => changeLanguage(e.target.value)}>
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
      <option value="mr">मराठी</option>
      <option value="gu">ગુજરાતી</option>
    </select>
  );
}
```

## 📊 Database Operations

### Querying Data

```typescript
import { supabase } from '@/lib/supabase/client';

// Get all Tirthankaras
const { data: tirthankaras } = await supabase
  .from('tirthankaras')
  .select('*')
  .order('number');

// Get articles by category
const { data: articles } = await supabase
  .from('encyclopedia_articles')
  .select('*')
  .eq('category', 'philosophy');

// Get Panchang for date
const { data: panchang } = await supabase
  .from('panchang_cache')
  .select('*')
  .eq('date', '2025-12-11')
  .single();
```

### Inserting Data

```typescript
const { data, error } = await supabase
  .from('user_profiles')
  .insert({
    user_id: userId,
    preferred_language: 'en',
    sect: 'svetambara',
  });
```

### Updating Data

```typescript
const { data, error } = await supabase
  .from('user_profiles')
  .update({ preferred_language: 'hi' })
  .eq('user_id', userId);
```

## 🔐 Authentication

### User Sign Up

```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password',
});
```

### User Sign In

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password',
});
```

### Get Current User

```typescript
const { data: { user } } = await supabase.auth.getUser();
```

## 🚀 Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

```bash
# Or use Vercel CLI
npm install -g vercel
vercel
```

### Environment Variables

Set these in Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 📝 Code Quality

### Linting

```bash
npm run lint
```

### Type Checking

```bash
npm run type-check
```

### Formatting

```bash
npm run format
```

## 🐛 Debugging

### Enable Debug Mode

```typescript
// .env.local
NEXT_PUBLIC_DEBUG=true
```

### Console Logging

```typescript
if (process.env.NEXT_PUBLIC_DEBUG === 'true') {
  console.log('Debug info:', data);
}
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines.

## 📞 Support

For development questions:
- Open an issue on GitHub
- Check existing documentation
- Review code examples

---

**Happy Coding! 🕉️**