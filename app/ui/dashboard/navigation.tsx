'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ChevronDown, ChevronRight, Menu, X, Bell, Search, User, Settings, LogOut } from 'lucide-react';
import { handleSignOut } from '@/app/lid/action/action';

// Define interfaces for better type safety
interface NavigationItem {
  title: string;
  href: string;
  icon: string;
  description: string;
  children?: NavigationItem[];
}

interface NavigationConfig {
  main: NavigationItem[];
  secondary: NavigationItem[];
}

interface UserData {
  name: string;
  email: string;
  avatar: string;
}

interface NavItemProps {
  item: NavigationItem;
  level?: number;
  isSidebarCollapsed: boolean;
  expandedItems: Set<string>;
  onToggleExpanded: (title: string) => void;
  onNavigate: (href: string) => void;
  pathname: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Navigation configuration with proper typing
const navigationConfig: NavigationConfig = {
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
        { title: "All Subjects", href: "/practice", icon: "📋", description: "All subjects overview" },
        { title: "Mathematics", href: "/practice/mathematics", icon: "🔢", description: "Math practice" },
        { title: "English", href: "/practice/english", icon: "📝", description: "English practice" },
        { title: "Physics", href: "/practice/physics", icon: "⚛️", description: "Physics practice" },
        { title: "Chemistry", href: "/practice/chemistry", icon: "🧪", description: "Chemistry practice" },
        { title: "Biology", href: "/practice/biology", icon: "🧬", description: "Biology practice" },
        { title: "Literature", href: "/practice/literature", icon: "📖", description: "Literature practice" }
      ]
    },
    {
      title: "Mock Exams",
      href: "/mock-exams",
      icon: "📝",
      description: "Full exam simulations"
    },
    {
      title: "Subjects",
      href: "/subjects",
      icon: "📚",
      description: "Subject-wise learning",
      children: [
        { title: "All Subjects", href: "/subjects", icon: "📋", description: "All subjects overview" },
        { title: "Mathematics", href: "/subjects/mathematics", icon: "🔢", description: "Math learning" },
        { title: "English", href: "/subjects/english", icon: "📝", description: "English learning" },
        { title: "Physics", href: "/subjects/physics", icon: "⚛️", description: "Physics learning" },
        { title: "Chemistry", href: "/subjects/chemistry", icon: "🧪", description: "Chemistry learning" },
        { title: "Biology", href: "/subjects/biology", icon: "🧬", description: "Biology learning" },
        { title: "Literature", href: "/subjects/literature", icon: "📖", description: "Literature learning" }
      ]
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: "📊",
      description: "Performance insights",
      children: [
        { title: "Overview", href: "/analytics", icon: "📈", description: "Analytics overview" },
        { title: "Performance", href: "/analytics/performance", icon: "🎯", description: "Performance metrics" },
        { title: "Reports", href: "/analytics/reports", icon: "📋", description: "Detailed reports" }
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

// Helper function to get user avatar based on name or email
const getUserAvatar = (name: string, email: string): string => {
  // You can customize this logic based on your requirements
  const firstLetter = name ? name.charAt(0).toUpperCase() : email.charAt(0).toUpperCase();
  
  // Simple avatar assignment based on first letter
  const avatars = {
    'A': '👩🏽‍🎓', 'B': '👨🏽‍🎓', 'C': '👩🏻‍🎓', 'D': '👨🏻‍🎓',
    'E': '👩🏾‍🎓', 'F': '👨🏾‍🎓', 'G': '👩🏽‍🎓', 'H': '👨🏽‍🎓',
    'I': '👩🏻‍🎓', 'J': '👨🏻‍🎓', 'K': '👩🏾‍🎓', 'L': '👨🏾‍🎓',
    'M': '👩🏽‍🎓', 'N': '👨🏽‍🎓', 'O': '👩🏻‍🎓', 'P': '👨🏻‍🎓',
    'Q': '👩🏾‍🎓', 'R': '👨🏾‍🎓', 'S': '👩🏽‍🎓', 'T': '👨🏽‍🎓',
    'U': '👩🏻‍🎓', 'V': '👨🏻‍🎓', 'W': '👩🏾‍🎓', 'X': '👨🏾‍🎓',
    'Y': '👩🏽‍🎓', 'Z': '👨🏽‍🎓'
  };
  
  return avatars[firstLetter as keyof typeof avatars] || '👨🏽‍🎓';
};

// NavItem Component
const NavItem: React.FC<NavItemProps> = ({ 
  item, 
  level = 0, 
  isSidebarCollapsed, 
  expandedItems, 
  onToggleExpanded, 
  onNavigate, 
  pathname 
}) => {
  const isActive: boolean = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
  const isExpanded: boolean = expandedItems.has(item.title);
  const hasChildren: boolean = Boolean(item.children && item.children.length > 0);

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
            onToggleExpanded(item.title);
          } else {
            onNavigate(item.href);
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
          {item.children!.map((child: NavigationItem, index: number) => (
            <NavItem 
              key={index} 
              item={child} 
              level={level + 1}
              isSidebarCollapsed={isSidebarCollapsed}
              expandedItems={expandedItems}
              onToggleExpanded={onToggleExpanded}
              onNavigate={onNavigate}
              pathname={pathname}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Main Dashboard Layout Component
const DashboardLayouts: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Get user data from session
  const userData: UserData = {
    name: session?.user?.name || 'User',
    email: session?.user?.email || 'user@example.com',
    avatar: session?.user?.name && session?.user?.email 
      ? getUserAvatar(session.user.name, session.user.email)
      : '👨🏽‍🎓'
  };

  // Handle loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Handle unauthenticated state
  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isUserMenuOpen) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen]);

  const toggleExpanded = (title: string): void => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedItems(newExpanded);
  };

  const handleNavigation = (href: string): void => {
    router.push(href);
    setIsMobileMenuOpen(false);
  };

  // Generate breadcrumbs from current path
  const generateBreadcrumbs = (): string[] => {
    const pathSegments = pathname.split('/').filter(Boolean);
    return pathSegments.map(segment => 
      segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ')
    );
  };

  // Sidebar Component
  const Sidebar: React.FC = () => (
    <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-white/5 backdrop-blur-sm border-r border-white/10 flex flex-col`}>
      {/* Logo */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigation('/dashboard')}>
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
            {navigationConfig.main.map((item: NavigationItem, index: number) => (
              <NavItem 
                key={index} 
                item={item}
                isSidebarCollapsed={isSidebarCollapsed}
                expandedItems={expandedItems}
                onToggleExpanded={toggleExpanded}
                onNavigate={handleNavigation}
                pathname={pathname}
              />
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
            {navigationConfig.secondary.map((item: NavigationItem, index: number) => (
              <NavItem 
                key={index} 
                item={item}
                isSidebarCollapsed={isSidebarCollapsed}
                expandedItems={expandedItems}
                onToggleExpanded={toggleExpanded}
                onNavigate={handleNavigation}
                pathname={pathname}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Collapse Button */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="w-full flex items-center justify-center p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronRight className={`transform transition-transform ${isSidebarCollapsed ? '' : 'rotate-180'}`} size={16} />
        </button>
      </div>
    </div>
  );

  // Header Component
  const Header: React.FC = () => {
    const breadcrumbs = generateBreadcrumbs();
    
    return (
      <header className="bg-white/5 backdrop-blur-sm border-b border-white/10 p-4 relative z-30">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
              aria-label="Open mobile menu"
            >
              <Menu size={20} />
            </button>
            
            {/* Breadcrumbs */}
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-300">
              <span>Home</span>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <ChevronRight size={16} />
                  <span className={index === breadcrumbs.length - 1 ? 'text-white' : 'text-gray-300'}>
                    {crumb}
                  </span>
                </React.Fragment>
              ))}
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
            <button 
              className="relative p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>

            {/* User Menu */}
            <div className="relative z-40">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUserMenuOpen(!isUserMenuOpen);
                }}
                className="flex items-center space-x-3 bg-white/10 rounded-lg px-3 py-2 hover:bg-white/20 transition-all"
                aria-label="User menu"
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
                <div className="absolute right-0 top-12 w-48 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-white/10">
                    <p className="text-sm font-medium text-white">{userData.name}</p>
                    <p className="text-xs text-gray-400">{userData.email}</p>
                  </div>
                  <button 
                    className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-white/10 transition-all text-left"
                    onClick={() => handleNavigation('/profile')}
                  >
                    <User size={16} />
                    <span>Profile</span>
                  </button>
                  <button 
                    className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-white/10 transition-all text-left"
                    onClick={() => handleNavigation('/settings')}
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                  <div className="border-t border-white/10 mt-2 pt-2">
                    <button 
                      className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-white/10 transition-all text-left text-red-400"
                      onClick={handleSignOut}
                    >
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
  };

  // Mobile Menu Component
  const MobileMenu: React.FC = () => (
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
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigation('/dashboard')}>
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
            aria-label="Close mobile menu"
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
              {navigationConfig.main.map((item: NavigationItem, index: number) => (
                <NavItem 
                  key={index} 
                  item={item}
                  isSidebarCollapsed={false}
                  expandedItems={expandedItems}
                  onToggleExpanded={toggleExpanded}
                  onNavigate={handleNavigation}
                  pathname={pathname}
                />
              ))}
            </div>
          </div>

          {/* Secondary Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Tools
            </h3>
            <div className="space-y-1">
              {navigationConfig.secondary.map((item: NavigationItem, index: number) => (
                <NavItem 
                  key={index} 
                  item={item}
                  isSidebarCollapsed={false}
                  expandedItems={expandedItems}
                  onToggleExpanded={toggleExpanded}
                  onNavigate={handleNavigation}
                  pathname={pathname}
                />
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
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayouts;