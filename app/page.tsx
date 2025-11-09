'use client';

import { useState } from 'react';
import {
  Video,
  Calendar,
  BarChart3,
  Upload,
  Wand2,
  Clock,
  TrendingUp,
  Users,
  Eye,
  ThumbsUp,
  MessageSquare,
  PlayCircle
} from 'lucide-react';
import VideoGenerator from '@/components/VideoGenerator';
import ContentScheduler from '@/components/ContentScheduler';
import Analytics from '@/components/Analytics';
import VideoUploader from '@/components/VideoUploader';

type Tab = 'generate' | 'schedule' | 'upload' | 'analytics';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('generate');

  const stats = [
    { icon: Eye, label: 'Total Views', value: '1.2M', change: '+12.5%' },
    { icon: Users, label: 'Subscribers', value: '45.3K', change: '+8.2%' },
    { icon: ThumbsUp, label: 'Likes', value: '89.4K', change: '+15.3%' },
    { icon: MessageSquare, label: 'Comments', value: '12.8K', change: '+9.7%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <PlayCircle className="w-8 h-8 text-red-500" />
              <h1 className="text-2xl font-bold text-white">YouTube Automation Suite</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Connected Channel</span>
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-8 h-8 text-red-500" />
                <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-white text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 mb-8">
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab('generate')}
              className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'generate'
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Wand2 className="w-5 h-5" />
              <span>AI Content Generator</span>
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'upload'
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Upload className="w-5 h-5" />
              <span>Upload Video</span>
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'schedule'
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Content Scheduler</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'analytics'
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Analytics</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'generate' && <VideoGenerator />}
            {activeTab === 'upload' && <VideoUploader />}
            {activeTab === 'schedule' && <ContentScheduler />}
            {activeTab === 'analytics' && <Analytics />}
          </div>
        </div>
      </div>
    </div>
  );
}
