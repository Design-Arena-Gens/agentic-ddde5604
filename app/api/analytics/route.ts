import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '7d';

    // In production, this would fetch real data from YouTube Analytics API
    const mockAnalytics = {
      summary: {
        totalViews: 1234567,
        totalSubscribers: 45320,
        totalLikes: 89400,
        totalComments: 12800,
        watchTime: 24567,
        avgViewDuration: '4:32',
        engagementRate: 8.4,
      },
      viewsOverTime: generateTimeSeriesData(timeRange, 'views'),
      subscribersOverTime: generateTimeSeriesData(timeRange, 'subscribers'),
      topVideos: [
        {
          id: '1',
          title: 'React Tutorial for Beginners',
          views: 45000,
          likes: 3200,
          comments: 450,
          watchTime: 3600,
          thumbnail: '/api/placeholder/320/180',
        },
        {
          id: '2',
          title: 'Python Programming Basics',
          views: 38000,
          likes: 2800,
          comments: 380,
          watchTime: 3200,
          thumbnail: '/api/placeholder/320/180',
        },
        {
          id: '3',
          title: 'Web Design Tips & Tricks',
          views: 32000,
          likes: 2400,
          comments: 320,
          watchTime: 2800,
          thumbnail: '/api/placeholder/320/180',
        },
      ],
      demographics: {
        ageGroups: [
          { name: '18-24', value: 30 },
          { name: '25-34', value: 45 },
          { name: '35-44', value: 15 },
          { name: '45+', value: 10 },
        ],
        gender: [
          { name: 'Male', value: 60 },
          { name: 'Female', value: 38 },
          { name: 'Other', value: 2 },
        ],
        countries: [
          { name: 'United States', value: 35 },
          { name: 'United Kingdom', value: 20 },
          { name: 'Canada', value: 15 },
          { name: 'Australia', value: 10 },
          { name: 'Other', value: 20 },
        ],
      },
    };

    return NextResponse.json(mockAnalytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}

function generateTimeSeriesData(timeRange: string, metric: string) {
  const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365;
  const data = [];

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));

    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.floor(Math.random() * (metric === 'views' ? 10000 : 200)) + (metric === 'views' ? 1000 : 50),
    });
  }

  return data;
}
