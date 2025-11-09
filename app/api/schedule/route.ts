import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// In-memory storage (in production, use a database)
let scheduledVideos: any[] = [];

export async function GET() {
  try {
    return NextResponse.json({ videos: scheduledVideos });
  } catch (error) {
    console.error('Error fetching scheduled videos:', error);
    return NextResponse.json({ error: 'Failed to fetch scheduled videos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const video = await request.json();

    const newVideo = {
      id: `sched_${Date.now()}`,
      ...video,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
    };

    scheduledVideos.push(newVideo);

    return NextResponse.json(newVideo);
  } catch (error) {
    console.error('Error scheduling video:', error);
    return NextResponse.json({ error: 'Failed to schedule video' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('id');

    if (!videoId) {
      return NextResponse.json({ error: 'Video ID required' }, { status: 400 });
    }

    scheduledVideos = scheduledVideos.filter((v) => v.id !== videoId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting scheduled video:', error);
    return NextResponse.json({ error: 'Failed to delete scheduled video' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedVideo = await request.json();

    const index = scheduledVideos.findIndex((v) => v.id === updatedVideo.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    scheduledVideos[index] = {
      ...scheduledVideos[index],
      ...updatedVideo,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(scheduledVideos[index]);
  } catch (error) {
    console.error('Error updating scheduled video:', error);
    return NextResponse.json({ error: 'Failed to update scheduled video' }, { status: 500 });
  }
}
