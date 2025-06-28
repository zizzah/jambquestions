'use client';

import React, { useState, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { userData, stats, subjects,recentActivity, upcomingGoals,notifications} from '../../lid/data';
export default function JAMBDashboard() {
  const [isVisible, setIsVisible] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentStreak, setCurrentStreak] = useState(7);
  const [selectedSubject, setSelectedSubject] = useState('all');
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">
                {getGreeting()}, {userData.name.split(' ')[0]}! 👋
              </h2>
              <p className="text-gray-300">Ready to continue your JAMB preparation journey?</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <span className="text-2xl">{stat.icon}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                    <p className="text-sm text-gray-300 mb-1">{stat.title}</p>
                    <p className="text-xs text-green-400">{stat.change}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Subject Progress */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Subject Progress</h3>
                    <select 
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-sm text-white"
                    >
                      <option value="all" className="bg-gray-800">All Subjects</option>
                      <option value="weak" className="bg-gray-800">Weak Areas</option>
                      <option value="strong" className="bg-gray-800">Strong Areas</option>
                    </select>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {subjects.map((subject, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all group cursor-pointer">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 ${subject.color} rounded-lg flex items-center justify-center`}>
                              <span className="text-white text-lg">{subject.icon}</span>
                            </div>
                            <div>
                              <h4 className="font-semibold">{subject.name}</h4>
                              <p className="text-xs text-gray-400">{subject.questions} questions</p>
                            </div>
                          </div>
                          <span className="text-lg font-bold">{subject.progress}%</span>
                        </div>
                        
                        <div className="mb-2">
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${subject.color}`}
                              style={{ width: `${subject.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-green-400">{subject.recent}</span>
                          <button className="text-yellow-400 hover:text-yellow-300 transition-colors">
                            Practice →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                          <span className="text-lg">{activity.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{activity.action}</h4>
                          <p className="text-sm text-gray-300">{activity.subject} • {activity.time}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-400">{activity.score}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 py-3 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-all text-center">
                    View All Activity
                  </button>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                
                {/* Quick Actions */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:shadow-xl transition-all flex items-center justify-center">
                      <span className="mr-2">🚀</span>
                      Start Practice Session
                    </button>
                    <button className="w-full py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/15 transition-all flex items-center justify-center">
                      <span className="mr-2">📝</span>
                      Take Mock Exam
                    </button>
                    <button className="w-full py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/15 transition-all flex items-center justify-center">
                      <span className="mr-2">📊</span>
                      View Analytics
                    </button>
                    <button className="w-full py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/15 transition-all flex items-center justify-center">
                      <span className="mr-2">📚</span>
                      Study Materials
                    </button>
                  </div>
                </div>

                {/* Goals */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Current Goals</h3>
                  <div className="space-y-4">
                    {upcomingGoals.map((goal, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{goal.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            goal.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                            goal.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-green-500/20 text-green-300'
                          }`}>
                            {goal.priority}
                          </span>
                        </div>
                        <div className="mb-2">
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div 
                              className="h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-400">{goal.progress}% complete</span>
                          <span className="text-gray-400">{goal.deadline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Study Streak */}
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-6">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🔥</div>
                    <h3 className="text-2xl font-bold mb-2">{currentStreak} Day Streak!</h3>
                    <p className="text-sm text-gray-300 mb-4">You are on fire! Keep up the great work.</p>
                    <div className="flex justify-center space-x-1">
                      {[...Array(7)].map((_, i) => (
                        <div 
                          key={i}
                          className={`w-6 h-6 rounded-full ${
                            i < currentStreak ? 'bg-orange-500' : 'bg-white/20'
                          }`}
                        ></div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">This week</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}