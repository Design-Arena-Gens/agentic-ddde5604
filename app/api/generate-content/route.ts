import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { topic, duration, style } = await request.json();

    // Simulate AI content generation
    // In production, this would call OpenAI API or similar
    const generatedContent = {
      title: `${topic} - Complete ${style.charAt(0).toUpperCase() + style.slice(1)} Guide`,
      description: `Learn everything about ${topic} in this comprehensive ${style} video. Perfect for beginners and advanced learners alike.\n\n⏱️ Timestamps:\n0:00 - Introduction\n0:30 - Main content\n${Math.floor(parseInt(duration) / 2)}:00 - Advanced tips\n${Math.floor(parseInt(duration) * 0.8)}:00 - Conclusion\n\n🔔 Subscribe for more content like this!\n\n#${topic.replace(/\s+/g, '')} #Tutorial #${style}`,
      tags: [
        ...topic.toLowerCase().split(' ').slice(0, 5),
        style,
        'tutorial',
        'guide',
        'educational',
        'howto',
      ].slice(0, 10),
      script: `[INTRO - 0:00]\nHello everyone! Welcome back to the channel. Today we're diving deep into ${topic}.\n\n[MAIN CONTENT - 0:30]\nLet's start by understanding the fundamentals of ${topic}...\n\n[Key Point 1]\n${topic} is essential because...\n\n[Key Point 2]\nOne important aspect to consider is...\n\n[Key Point 3]\nHere's a pro tip that many beginners miss...\n\n[ADVANCED SECTION - ${Math.floor(parseInt(duration) / 2)}:00]\nNow let's look at some advanced techniques...\n\n[CONCLUSION - ${Math.floor(parseInt(duration) * 0.8)}:00]\nTo wrap up, remember these key takeaways about ${topic}...\n\nIf you found this helpful, please like and subscribe!\n\n[END SCREEN]\nThanks for watching!`,
      thumbnail: {
        backgroundColor: '#ef4444',
        textColor: '#ffffff',
        mainText: topic,
        subText: style.toUpperCase(),
      },
    };

    return NextResponse.json(generatedContent);
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
