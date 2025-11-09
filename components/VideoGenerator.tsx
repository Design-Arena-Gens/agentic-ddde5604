'use client';

import { useState } from 'react';
import { Wand2, Sparkles, Download, RefreshCw } from 'lucide-react';

export default function VideoGenerator() {
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('60');
  const [style, setStyle] = useState('educational');
  const [generating, setGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<any>(null);

  const handleGenerate = async () => {
    setGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedVideo({
        title: `${topic} - Complete Guide`,
        description: `Learn everything about ${topic} in this comprehensive guide. Perfect for beginners and advanced users alike.`,
        tags: topic.split(' ').slice(0, 5),
        thumbnail: '/api/placeholder/1280/720',
        script: `Introduction to ${topic}...\n\nMain content about ${topic}...\n\nConclusion and call to action...`,
      });
      setGenerating(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">AI Video Content Generator</h2>
        <p className="text-gray-400">Generate video scripts, titles, descriptions, and thumbnails automatically</p>
      </div>

      {/* Input Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Video Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., How to learn Python programming"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Video Duration (seconds)</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="30">30 seconds (Short)</option>
              <option value="60">60 seconds (Standard)</option>
              <option value="180">3 minutes (Medium)</option>
              <option value="600">10 minutes (Long)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Video Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="educational">Educational</option>
              <option value="entertainment">Entertainment</option>
              <option value="tutorial">Tutorial</option>
              <option value="review">Review</option>
              <option value="vlog">Vlog</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!topic || generating}
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {generating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              <span>Generate Content</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Content */}
      {generatedVideo && (
        <div className="mt-8 space-y-6 p-6 bg-gray-700/50 rounded-lg border border-gray-600">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span>Generated Content</span>
            </h3>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center space-x-2 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={generatedVideo.title}
                readOnly
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                value={generatedVideo.description}
                readOnly
                rows={3}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                {generatedVideo.tags.map((tag: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Script</label>
              <textarea
                value={generatedVideo.script}
                readOnly
                rows={6}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Thumbnail Preview</label>
              <div className="w-full h-64 bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{topic}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
