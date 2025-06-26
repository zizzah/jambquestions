'use client';

import React, { useState } from 'react';
import { userData, notifications } from '../lid/data';
import Link from 'next/link';

const navItems = [
  { name: 'Dashboard', icon: '📊', href: '/dashboard' },
  { name: 'Practice', icon: '📝', href: '/dashboard/practice' },
  { name: 'Mock Exams', icon: '🎯', href: '/dashboard/mock' },
  { name: 'Analytics', icon: '📈', href: '/dashboard/analytics' },
  { name: 'Goals', icon: '🎯', href: '/dashboard/goals' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white relative">
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 border-r border-white/10 p-6 hidden md:block">
        <div className="mb-10">
          <h1 className="text-2xl font-bold">🎓 JAMBPrep</h1>
          <p className="text-sm text-gray-400">Success starts here</p>
        </div>
        <nav className="space-y-4">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="flex items-center space-x-2 p-2 hover:bg-white/10 rounded transition-all"
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Layout */}
      <div className="flex-1 relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm px-6 py-4 flex justify-between items-center relative z-20">
          <div className="flex items-center space-x-4 relative z-30">
            <div className="relative z-30">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 bg-white/10 rounded-lg hover:bg-white/20"
              >
                <span className="text-lg">🔔</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              </button>

              {showNotifications && (
                <div className="absolute right top-2 w-80 bg-white/10 border border-white/20 rounded-xl p-4 shadow-2xl z-50 backdrop-blur-md">
                  <h3 className="font-semibold mb-3">Notifications</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {notifications.map((notif, index) => (
                      <div key={index} className="p-2 bg-white/5 rounded-lg">
                        <p className="text-white">{notif.message}</p>
                        <p className="text-gray-400 text-xs">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-3 bg-white/10 px-4 py-2 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-sm">{userData.avatar}</span>
            </div>
            <div className="text-sm">
              <p className="font-medium">{userData.name}</p>
              <p className="text-gray-300 text-xs">{userData.currentLevel}</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="px-6 py-8 relative z-10">{children}</main>
      </div>
    </div>
  );
}
