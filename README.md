# YouTube Automation Suite

A complete YouTube automation platform built with Next.js for content creation, scheduling, uploading, and analytics.

## Features

### 🎬 AI Content Generator
- Generate video titles, descriptions, and tags automatically
- Create video scripts based on topics
- Generate thumbnail concepts
- Support for multiple video styles (educational, entertainment, tutorial, etc.)

### 📤 Video Uploader
- Drag-and-drop video upload interface
- Set title, description, tags, visibility, and category
- Real-time upload progress tracking
- Direct upload to YouTube (API integration ready)

### 📅 Content Scheduler
- Schedule videos for automatic publishing
- Visual calendar view of scheduled content
- Manage multiple scheduled videos
- Edit and delete scheduled items

### 📊 Analytics Dashboard
- Track views, subscribers, likes, and comments
- View performance over time with interactive charts
- Top performing videos analysis
- Audience demographics (age, gender, location)
- Watch time and engagement metrics

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file with your API keys:
```
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CLIENT_ID=your_client_id
YOUTUBE_CLIENT_SECRET=your_client_secret
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

```bash
vercel deploy --prod
```

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns

## License

MIT
