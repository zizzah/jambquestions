import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Menu, X, Bell, Search, User, Settings, LogOut } from 'lucide-react';

// Navigation configuration
const navigationConfig = {
  main: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "🏠",
      description: "Overview and quick stats"
    },
    {
      title: "Practice",
      href: "/practice",
      icon: "🎯",
      description: "Practice questions and sessions",
      children: [
        { title: "All Subjects", href: "/practice" },
        { title: "Mathematics", href: "/practice/mathematics" },
        { title: "English", href: "/practice/english" },
        { title: "Physics", href: "/practice/physics" },
        { title: "Chemistry", href: "/practice/chemistry" },
        { title: "Biology", href: "/practice/biology" },
        { title: "Literature", href: "/practice/literature" }
      ]
    },
    {
      title: "Mock Exams",
      href: "/mock-exam",
      icon: "📝",
      description: "Full exam simulations"
    },
    {
      title: "Subjects",
      href: "/subjects",
      icon: "📚",
      description: "Subject-wise learning",
      children: [
        { title: "All Subjects", href: "/subjects" },
        { title: "Mathematics", href: "/subjects/mathematics" },
        { title: "English", href: "/subjects/english" },
        { title: "Physics", href: "/subjects/physics" },
        { title: "Chemistry", href: "/subjects/chemistry" },
        { title: "Biology", href: "/subjects/biology" },
        { title: "Literature", href: "/subjects/literature" }
      ]
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: "📊",
      description: "Performance insights",
      children: [
        { title: "Overview", href: "/analytics" },
        { title: "Performance", href: "/analytics/performance" },
        { title: "Reports", href: "/analytics/reports" }
      ]
    },
    {
      title: "Study Materials",
      href: "/study-materials",
      icon: "📖",
      description: "Learning resources"
    }
  ],
  secondary: [
    {
      title: "Goals",
      href: "/goals",
      icon: "🎯",
      description: "Track your objectives"
    },
    {
      title: "Planner",
      href: "/planner",
      icon: "📅",
      description: "Study schedule"
    },
    {
      title: "Community",
      href: "/community",
      icon: "👥",
      description: "Connect with peers"
    }
  ]
};

// Mock user data
const userData = {
  name: "Adunni Okafor",
  email: "adunni@example.com",
  avatar: "👩🏽‍🎓"
};

export default function NavigationSystem() {
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleExpanded = (title) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedItems(newExpanded);
  };

  const handleNavigation = (href) => {
    setCurrentPath(href);
    setIsMobileMenuOpen(false);
  };

  const NavItem = ({ item, level = 0 }) => {
    const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/');
    const isExpanded = expandedItems.has(item.title);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div className="relative">
        <div
          className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all ${
            isActive 
              ? 'bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-300 border-l-2 border-yellow-400' 
              : 'hover:bg-white/5 text-gray-300 hover:text-white'
          } ${level > 0 ? 'ml-4 text-sm' : ''}`}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.title);
            } else {
              handleNavigation(item.href);
            }
          }}
        >
          <div className="flex items-center space-x-3">
            <span className="text-lg">{item.icon}</span>
            {!isSidebarCollapsed && (
              <div>
                <div className="font-medium">{item.title}</div>
                {item.description && level === 0 && (
                  <div className="text-xs text-gray-400">{item.description}</div>
                )}
              </div>
            )}
          </div>
          {hasChildren && !isSidebarCollapsed && (
            <div className="text-gray-400">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
          )}
        </div>
        
        {hasChildren && isExpanded && !isSidebarCollapsed && (
          <div className="mt-1 space-y-1">
            {item.children.map((child, index) => (
              <NavItem key={index} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const Sidebar = () => (
    <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-white/5 backdrop-blur-sm border-r border-white/10 flex flex-col`}>
      {/* Logo */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">📚</span>
          </div>
          {!isSidebarCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-white">JAMBPrep</h1>
              <p className="text-xs text-gray-400">Your success path</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Main Navigation */}
        <div>
          {!isSidebarCollapsed && (
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Main
            </h3>
          )}
          <div className="space-y-1">
            {navigationConfig.main.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
          </div>
        </div>

        {/* Secondary Navigation */}
        <div>
          {!isSidebarCollapsed && (
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Tools
            </h3>
          )}
          <div className="space-y-1">
            {navigationConfig.secondary.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Collapse Button */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="w-full flex items-center justify-center p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
        >
          <ChevronRight className={`transform transition-transform ${isSidebarCollapsed ? '' : 'rotate-180'}`} size={16} />
        </button>
      </div>
    </div>
  );

  const Header = () => (
    <header className="bg-white/5 backdrop-blur-sm border-b border-white/10 p-4">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
          >
            <Menu size={20} />
          </button>
          
          {/* Breadcrumbs */}
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-300">
            <span>Home</span>
            <ChevronRight size={16} />
            <span className="text-white">Dashboard</span>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center bg-white/10 rounded-lg px-3 py-2 min-w-[200px]">
            <Search size={16} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-white placeholder-gray-400 flex-1"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
            <Bell size={20} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-3 bg-white/10 rounded-lg px-3 py-2 hover:bg-white/20 transition-all"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-sm">{userData.avatar}</span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">{userData.name}</p>
                <p className="text-xs text-gray-400">Student</p>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-12 w-48 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl py-2">
                <div className="px-4 py-2 border-b border-white/10">
                  <p className="text-sm font-medium text-white">{userData.name}</p>
                  <p className="text-xs text-gray-400">{userData.email}</p>
                </div>
                <button className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-white/10 transition-all text-left">
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-white/10 transition-all text-left">
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <div className="border-t border-white/10 mt-2 pt-2">
                  <button className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-white/10 transition-all text-left text-red-400">
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );

  const MobileMenu = () => (
    <div className={`fixed inset-0 z-50 lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsMobileMenuOpen(false)}
      />
      
      {/* Menu */}
      <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 border-r border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">📚</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">JAMBPrep</h1>
              <p className="text-xs text-gray-400">Your success path</p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Main Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Main
            </h3>
            <div className="space-y-1">
              {navigationConfig.main.map((item, index) => (
                <NavItem key={index} item={item} />
              ))}
            </div>
          </div>

          {/* Secondary Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Tools
            </h3>
            <div className="space-y-1">
              {navigationConfig.secondary.map((item, index) => (
                <NavItem key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile Menu */}
        <MobileMenu />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          
          {/* Page Content */}
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Navigation System Demo</h2>
                <p className="text-gray-300 mb-4">
                  This is a complete navigation system for your JAMB prep app. 
                  Try clicking on different navigation items to see the routing in action.
                </p>
                <p className="text-sm text-gray-400">
                  Current path: <span className="text-yellow-400 font-mono">{currentPath}</span>
                </p>
                
                <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">🎯 Features</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Responsive sidebar</li>
                      <li>• Collapsible navigation</li>
                      <li>• Mobile-friendly menu</li>
                      <li>• Nested menu support</li>
                      <li>• Active state tracking</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">📱 Mobile Ready</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Touch-friendly interface</li>
                      <li>• Slide-out mobile menu</li>
                      <li>• Responsive breakpoints</li>
                      <li>• Gesture support</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">🎨 Design</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Consistent with dashboard</li>
                      <li>• Smooth animations</li>
                      <li>• Glassmorphism effects</li>
                      <li>• Accessible design</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/30 rounded-lg">
                  <h3 className="font-semibold text-yellow-300 mb-2">🚀 Implementation Guide</h3>
                  <p className="text-sm text-gray-300 text-left">
                    1. <strong>Copy the navigation config</strong> to your lib/navigation.ts file<br/>
                    2. <strong>Update the layout.tsx</strong> to use this navigation system<br/>
                    3. <strong>Add proper routing</strong> using Next.js App Router structure<br/>
                    4. <strong>Customize the styling</strong> to match your brand colors<br/>
                    5. <strong>Add authentication</strong> guards for protected routes
                  </p>
                </div>
              </div>
              
              {/* Demo Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">🎯</span>
                    <h3 className="text-lg font-semibold">Practice Sessions</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Interactive practice with immediate feedback and progress tracking.
                  </p>
                  <button className="w-full py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:shadow-xl transition-all">
                    Start Practice
                  </button>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">📊</span>
                    <h3 className="text-lg font-semibold">Analytics</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Detailed insights into your performance and learning patterns.
                  </p>
                  <button className="w-full py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/15 transition-all">
                    View Analytics
                  </button>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">📚</span>
                    <h3 className="text-lg font-semibold">Study Materials</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Comprehensive learning resources for all JAMB subjects.
                  </p>
                  <button className="w-full py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/15 transition-all">
                    Browse Materials
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}