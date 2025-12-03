
# Achievable SAT Prep - Next.js

AI-powered SAT preparation platform migrated from Vite to Next.js 14+ with App Router.

## Features

- **AI-Powered Study Planner**: Generate personalized study plans using Google GenAI
- **Module-Based Learning**: Structured learning paths with progress tracking
- **Dual Dashboard Views**: 
  - Grid View: Card-based module display
  - Traditional View: Two-column sidebar + content layout
- **Interactive Learning**: Study units with practice questions and tools
- **Progress Analytics**: Track scores, streaks, and module completion

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google GenAI (via API routes)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Google GenAI API key:
```
GEMINI_API_KEY=your_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── api/
│   │   └── generate-plan/
│   │       └── route.ts          # API route for AI plan generation
│   ├── learn/
│   │   └── [module]/
│   │       └── [section]/
│   │           └── page.tsx      # Dynamic learning page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                 # Main dashboard page
│   └── globals.css              # Global styles
├── components/
│   ├── DashboardWidgets.tsx    # Stat cards, charts, recommendations
│   ├── GeminiPlanner.tsx        # AI study plan generator
│   ├── Layout.tsx               # Main layout wrapper
│   ├── ModuleModal.tsx         # Module detail modal
│   ├── TraditionalDashboard.tsx # Two-column dashboard view
│   └── UnitStudyView.tsx       # Learning unit interface
├── lib/
│   ├── constants.ts            # Module data and constants
│   ├── types.ts                # TypeScript type definitions
│   └── utils.ts                # Utility functions
└── public/                     # Static assets
```

## Key Features

### Dashboard Views

1. **Grid View**: Modern card-based layout showing all modules
2. **Traditional View**: Two-column layout with expandable sidebar and content area

### Learning System

- Module-based structure with sections and topics
- Progress tracking per module and section
- Interactive learning interface with practice questions
- Study tools (calculator, notes, hints)

### AI Integration

- Secure API routes for AI plan generation
- Personalized study plans based on timeline and focus
- AI-powered recommendations and insights

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The app is optimized for Vercel deployment with:
- Automatic code splitting
- Image optimization
- Edge runtime support
- Serverless API routes

## Environment Variables

- `GEMINI_API_KEY`: Your Google GenAI API key (required for AI features)

## Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```


## License

Private - All rights reserved

=======
# SAT-Prep-Dashboard
>>>>>>> 8e50203680b51cd6531d7fc5390e13e23c14fd3d
