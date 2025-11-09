import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const tags = formData.get('tags') as string;
    const visibility = formData.get('visibility') as string;
    const category = formData.get('category') as string;

    if (!file || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // In production, this would:
    // 1. Upload video to YouTube API
    // 2. Set metadata (title, description, tags)
    // 3. Set visibility and category
    // 4. Return video URL and stats

    // Simulate upload processing
    const uploadResult = {
      success: true,
      videoId: `vid_${Date.now()}`,
      url: `https://youtube.com/watch?v=${Date.now()}`,
      title,
      description,
      tags: tags.split(',').map(t => t.trim()),
      visibility,
      category,
      uploadedAt: new Date().toISOString(),
      status: 'processing',
    };

    return NextResponse.json(uploadResult);
  } catch (error) {
    console.error('Error uploading video:', error);
    return NextResponse.json({ error: 'Failed to upload video' }, { status: 500 });
  }
}
