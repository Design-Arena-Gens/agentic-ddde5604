'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TrendingUp, Users, Eye, ThumbsUp, MessageSquare, Clock } from 'lucide-react';

const viewsData = [
  { date: 'Jan 1', views: 2400, subscribers: 100 },
  { date: 'Jan 2', views: 1398, subscribers: 95 },
  { date: 'Jan 3', views: 9800, subscribers: 150 },
  { date: 'Jan 4', views: 3908, subscribers: 120 },
  { date: 'Jan 5', views: 4800, subscribers: 180 },
  { date: 'Jan 6', views: 3800, subscribers: 140 },
  { date: 'Jan 7', views: 4300, subscribers: 160 },
];

const videoPerformance = [
  { title: 'React Tutorial', views: 45000, likes: 3200, comments: 450 },
  { title: 'Python Basics', views: 38000, likes: 2800, comments: 380 },
  { title: 'Web Design Tips', views: 32000, likes: 2400, comments: 320 },
  { title: 'JavaScript ES6', views: 28000, likes: 2100, comments: 280 },
  { title: 'CSS Grid', views: 24000, likes: 1800, comments: 240 },
];

const audienceData = [
  { name: '18-24', value: 30 },
  { name: '25-34', value: 45 },
  { name: '35-44', value: 15 },
  { name: '45+', value: 10 },
];

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e'];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Analytics Dashboard</h2>
          <p className="text-gray-400">Track your channel performance and audience insights</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {/* Views & Subscribers Chart */}
      <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
        <h3 className="text-lg font-semibold text-white mb-4">Views & Subscribers Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={viewsData}>
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSubs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="views" stroke="#ef4444" fillOpacity={1} fill="url(#colorViews)" />
            <Area type="monotone" dataKey="subscribers" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSubs)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Video Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
          <h3 className="text-lg font-semibold text-white mb-4">Top Performing Videos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={videoPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9ca3af" />
              <YAxis dataKey="title" type="category" stroke="#9ca3af" width={120} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="views" fill="#ef4444" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
          <h3 className="text-lg font-semibold text-white mb-4">Audience Demographics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={audienceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {audienceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
        <h3 className="text-lg font-semibold text-white mb-4">Engagement Metrics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={viewsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Line type="monotone" dataKey="views" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444' }} />
            <Line type="monotone" dataKey="subscribers" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Videos Performance */}
      <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Videos Performance</h3>
        <div className="space-y-3">
          {videoPerformance.map((video, idx) => (
            <div key={idx} className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-2">{video.title}</h4>
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{video.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{video.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{video.comments.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">+{((video.views / 1000) * 2.5).toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Watch Time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-purple-500" />
            <span className="text-green-400 text-sm font-semibold">+18.2%</span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Watch Time</p>
          <p className="text-white text-2xl font-bold">24,567 hrs</p>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <Eye className="w-8 h-8 text-blue-500" />
            <span className="text-green-400 text-sm font-semibold">+22.5%</span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Avg View Duration</p>
          <p className="text-white text-2xl font-bold">4:32 min</p>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <span className="text-green-400 text-sm font-semibold">+31.8%</span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Engagement Rate</p>
          <p className="text-white text-2xl font-bold">8.4%</p>
        </div>
      </div>
    </div>
  );
}
