'use client';

import { useState } from 'react';
import { Calendar, Clock, Plus, Trash2, Edit, CheckCircle } from 'lucide-react';
import { format, addDays } from 'date-fns';

interface ScheduledVideo {
  id: string;
  title: string;
  date: Date;
  time: string;
  status: 'scheduled' | 'published' | 'failed';
  thumbnail: string;
}

export default function ContentScheduler() {
  const [scheduledVideos, setScheduledVideos] = useState<ScheduledVideo[]>([
    {
      id: '1',
      title: 'Top 10 React Tips for Beginners',
      date: addDays(new Date(), 1),
      time: '10:00',
      status: 'scheduled',
      thumbnail: '/api/placeholder/320/180',
    },
    {
      id: '2',
      title: 'Building a Full-Stack App with Next.js',
      date: addDays(new Date(), 3),
      time: '14:30',
      status: 'scheduled',
      thumbnail: '/api/placeholder/320/180',
    },
    {
      id: '3',
      title: 'JavaScript Performance Optimization',
      date: addDays(new Date(), 5),
      time: '09:00',
      status: 'scheduled',
      thumbnail: '/api/placeholder/320/180',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '10:00',
  });

  const handleAddVideo = () => {
    if (!newVideo.title) return;

    const video: ScheduledVideo = {
      id: Date.now().toString(),
      title: newVideo.title,
      date: new Date(newVideo.date),
      time: newVideo.time,
      status: 'scheduled',
      thumbnail: '/api/placeholder/320/180',
    };

    setScheduledVideos([...scheduledVideos, video]);
    setShowAddModal(false);
    setNewVideo({ title: '', date: format(new Date(), 'yyyy-MM-dd'), time: '10:00' });
  };

  const handleDeleteVideo = (id: string) => {
    setScheduledVideos(scheduledVideos.filter((v) => v.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'published':
        return 'bg-green-500/20 text-green-400 border-green-500';
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Content Scheduler</h2>
          <p className="text-gray-400">Schedule your videos for automatic publishing</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-pink-600 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Schedule Video</span>
        </button>
      </div>

      {/* Calendar View */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {[0, 1, 2, 3, 4, 5, 6].map((day) => {
          const date = addDays(new Date(), day);
          const videosForDay = scheduledVideos.filter(
            (v) => format(v.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
          );

          return (
            <div key={day} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
              <div className="text-center mb-3">
                <p className="text-gray-400 text-xs uppercase">{format(date, 'EEE')}</p>
                <p className="text-white text-2xl font-bold">{format(date, 'd')}</p>
                <p className="text-gray-400 text-xs">{format(date, 'MMM')}</p>
              </div>
              <div className="space-y-2">
                {videosForDay.map((video) => (
                  <div key={video.id} className="bg-gray-600/50 rounded p-2">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-300">{video.time}</span>
                    </div>
                    <p className="text-xs text-white truncate">{video.title}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Scheduled Videos List */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">All Scheduled Videos</h3>
        <div className="space-y-3">
          {scheduledVideos
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .map((video) => (
              <div
                key={video.id}
                className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-32 h-18 bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Thumbnail</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{video.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{format(video.date, 'MMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{video.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(video.status)}`}>
                    {video.status.toUpperCase()}
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteVideo(video.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Add Video Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Schedule New Video</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Video Title</label>
                <input
                  type="text"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                  placeholder="Enter video title"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                <input
                  type="date"
                  value={newVideo.date}
                  onChange={(e) => setNewVideo({ ...newVideo, date: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                <input
                  type="time"
                  value={newVideo.time}
                  onChange={(e) => setNewVideo({ ...newVideo, time: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddVideo}
                  disabled={!newVideo.title}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
