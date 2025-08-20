'use client';

import { useState, useEffect } from 'react';
import { User,  Edit2, 
  Save, X, Upload, Settings, Bell, Shield, BookOpen, Target, Trophy, Camera, Eye, EyeOff } from 'lucide-react';

// Types
interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  dateOfBirth: string;
  bio: string;
  avatar: string;
  joinDate: string;
  examTarget: string;
  targetScore: number;
  preferredSubjects: string[];
}

interface AcademicStats {
  totalQuestions: number;
  correctAnswers: number;
  studyStreak: number;
  rank: number;
  certificates: number;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  studyReminders: boolean;
  weeklyReport: boolean;
  achievementAlerts: boolean;
}

export default function ProfilePage() {
  // State management
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Available subjects - choose any 4
  const availableSubjects = [
    { id: 'English Language', name: 'English Language', emoji: '📚' },
    { id: 'Mathematics', name: 'Mathematics', emoji: '🔢' },
    { id: 'Biology', name: 'Biology', emoji: '🧬' },
    { id: 'Chemistry', name: 'Chemistry', emoji: '⚗️' },
    { id: 'Physics', name: 'Physics', emoji: '⚡' },
    { id: 'Economics', name: 'Economics', emoji: '💰' },
    { id: 'Government', name: 'Government', emoji: '🏛️' },
    { id: 'Geography', name: 'Geography', emoji: '🌍' },
    { id: 'Literature', name: 'Literature in English', emoji: '📖' },
    { id: 'Christian Religious Knowledge', name: 'Christian Religious Knowledge', emoji: '✝️' },
    { id: 'Islamic Religious Knowledge', name: 'Islamic Religious Knowledge', emoji: '☪️' },
    { id: 'Commerce', name: 'Commerce', emoji: '💼' },
    { id: 'Accounting', name: 'Accounting', emoji: '📊' },
    { id: 'Agricultural Science', name: 'Agricultural Science', emoji: '🌾' },
    { id: 'Civic Education', name: 'Civic Education', emoji: '🏛️' },
    { id: 'Computer Studies', name: 'Computer Studies', emoji: '💻' }
  ];

  // Mock data - replace with real data from your API
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+234 812 345 6789',
    location: 'Lagos, Nigeria',
    dateOfBirth: '2000-05-15',
    bio: 'Aspiring medical student passionate about achieving excellence in JAMB and pursuing my dreams of becoming a doctor.',
    avatar: '👨🏽‍🎓',
    joinDate: '2024-01-15',
    examTarget: 'JAMB UTME 2024',
    targetScore: 300,
    preferredSubjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry']
  });

  const [academicStats] = useState<AcademicStats>({
    totalQuestions: 2847,
    correctAnswers: 2156,
    studyStreak: 28,
    rank: 156,
    certificates: 5
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    studyReminders: true,
    weeklyReport: false,
    achievementAlerts: true
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleProfileSave = () => {
    // API call to save profile
    setIsEditing(false);
    // Show success toast
  };

  const handleNotificationToggle = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePasswordChange = () => {
    // API call to change password
    setPasswords({ current: '', new: '', confirm: '' });
    // Show success toast
  };

  const calculateAccuracy = () => {
    return ((academicStats.correctAnswers / academicStats.totalQuestions) * 100).toFixed(1);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'academic', label: 'Academic', icon: BookOpen },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
            <p className="text-gray-300">Manage your account settings and preferences</p>
          </div>

          {/* Profile Header Card */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl">
                  {profile.avatar}
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={16} className="text-white" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
                <p className="text-gray-300 mb-2">{profile.email}</p>
                <p className="text-sm text-gray-400">
                  Member since {new Date(profile.joinDate).toLocaleDateString()}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-yellow-400">{academicStats.studyStreak}</div>
                  <div className="text-xs text-gray-400">Day Streak</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">{calculateAccuracy()}%</div>
                  <div className="text-xs text-gray-400">Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">#{academicStats.rank}</div>
                  <div className="text-xs text-gray-400">Rank</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap border-b border-white/20 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-yellow-400 text-yellow-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Personal Information</h3>
                    <button
                      onClick={() => isEditing ? handleProfileSave() : setIsEditing(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      {isEditing ? <Save size={16} /> : <Edit2 size={16} />}
                      <span>{isEditing ? 'Save' : 'Edit'}</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        disabled={!isEditing}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        disabled={!isEditing}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        disabled={!isEditing}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => setProfile({...profile, location: e.target.value})}
                        disabled={!isEditing}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Date of Birth</label>
                      <input
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => setProfile({...profile, dateOfBirth: e.target.value})}
                        disabled={!isEditing}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Bio</label>
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white disabled:opacity-50 resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Goals */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-6">Academic Goals</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Target Exam</label>
                      <select
                        value={profile.examTarget}
                        onChange={(e) => setProfile({...profile, examTarget: e.target.value})}
                        disabled={!isEditing}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white disabled:opacity-50"
                      >
                        <option value="JAMB UTME 2024" className="bg-gray-800">JAMB UTME 2024</option>
                        <option value="JAMB UTME 2025" className="bg-gray-800">JAMB UTME 2025</option>
                        <option value="POST UTME" className="bg-gray-800">POST UTME</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Target Score</label>
                      <input
                        type="number"
                        value={profile.targetScore}
                        onChange={(e) => setProfile({...profile, targetScore: parseInt(e.target.value)})}
                        disabled={!isEditing}
                        min="0"
                        max="400"
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        JAMB Subjects 
                        <span className="text-xs text-gray-400 ml-2">
                          (Select any 4 subjects - {profile.preferredSubjects.length}/4 selected)
                        </span>
                      </label>
                      
                      {/* All Subjects - Choose any 4 */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {availableSubjects.map((subject) => {
                          const isSelected = profile.preferredSubjects.includes(subject.id);
                          const selectedCount = profile.preferredSubjects.length;
                          const canSelect = isSelected || selectedCount < 4;
                          
                          return (
                            <button
                              key={subject.id}
                              onClick={() => {
                                if (!isEditing || !canSelect) return;
                                
                                let newSubjects;
                                if (isSelected) {
                                  // Remove subject
                                  newSubjects = profile.preferredSubjects.filter(s => s !== subject.id);
                                } else {
                                  // Add subject
                                  newSubjects = [...profile.preferredSubjects, subject.id];
                                }
                                setProfile({...profile, preferredSubjects: newSubjects});
                              }}
                              disabled={!isEditing || (!isSelected && selectedCount >= 4)}
                              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all text-left ${
                                isSelected
                                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                                  : canSelect
                                  ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                                  : 'bg-white/5 text-gray-500 cursor-not-allowed'
                              } ${!isEditing && 'opacity-50'}`}
                            >
                              <span className="text-base">{subject.emoji}</span>
                              <span className="text-xs">{subject.name}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Selection guidance */}
                      {profile.preferredSubjects.length < 4 && isEditing && (
                        <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <span className="text-blue-400">ℹ️</span>
                            <span className="text-sm text-blue-300">
                              {profile.preferredSubjects.length === 0 
                                ? "Please select 4 subjects for your JAMB examination" 
                                : `Select ${4 - profile.preferredSubjects.length} more subject${4 - profile.preferredSubjects.length > 1 ? 's' : ''} to complete your selection`
                              }
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Selected subjects summary */}
                      {profile.preferredSubjects.length > 0 && (
                        <div className="p-3 bg-white/5 rounded-lg">
                          <div className="text-sm text-gray-400 mb-2">Selected Subjects:</div>
                          <div className="flex flex-wrap gap-2">
                            {profile.preferredSubjects.map((subjectId) => {
                              const subject = availableSubjects.find(s => s.id === subjectId);
                              return (
                                <span key={subjectId} className="flex items-center space-x-1 px-2 py-1 bg-white/10 rounded text-xs">
                                  <span>{subject?.emoji}</span>
                                  <span>{subject?.name}</span>
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Completion status */}
                      {profile.preferredSubjects.length === 4 && (
                        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <span className="text-green-400">✅</span>
                            <span className="text-sm text-green-300">
                              Perfect! You have selected all 4 required subjects for JAMB.
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Academic Tab */}
            {activeTab === 'academic' && (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Performance Stats */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-6">Performance Overview</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <BookOpen className="text-white" size={24} />
                      </div>
                      <div className="text-2xl font-bold">{academicStats.totalQuestions.toLocaleString()}</div>
                      <div className="text-sm text-gray-400">Questions Answered</div>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Target className="text-white" size={24} />
                      </div>
                      <div className="text-2xl font-bold">{calculateAccuracy()}%</div>
                      <div className="text-sm text-gray-400">Accuracy Rate</div>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Trophy className="text-white" size={24} />
                      </div>
                      <div className="text-2xl font-bold">#{academicStats.rank}</div>
                      <div className="text-sm text-gray-400">Current Rank</div>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Settings className="text-white" size={24} />
                      </div>
                      <div className="text-2xl font-bold">{academicStats.certificates}</div>
                      <div className="text-sm text-gray-400">Certificates</div>
                    </div>
                  </div>
                </div>

                {/* Study Progress */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-6">Study Progress</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Current Goal Progress</span>
                        <span className="text-sm text-gray-400">75%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" style={{width: '75%'}}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Weekly Target</span>
                        <span className="text-sm text-gray-400">12/15 hours</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" style={{width: '80%'}}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Monthly Target</span>
                        <span className="text-sm text-gray-400">42/60 hours</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" style={{width: '70%'}}></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">Study Streak</div>
                        <div className="text-sm text-gray-400">Keep it up! 🔥</div>
                      </div>
                      <div className="text-3xl font-bold text-yellow-400">
                        {academicStats.studyStreak}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="max-w-2xl">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-6">Notification Settings</h3>
                  
                  <div className="space-y-6">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
                        <div>
                          <div className="font-medium capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="text-sm text-gray-400">
                            {key === 'emailNotifications' && 'Receive notifications via email'}
                            {key === 'pushNotifications' && 'Receive push notifications on your device'}
                            {key === 'studyReminders' && 'Get reminders for your study sessions'}
                            {key === 'weeklyReport' && 'Weekly performance summary reports'}
                            {key === 'achievementAlerts' && 'Notifications for achievements and milestones'}
                          </div>
                        </div>
                        <button
                          onClick={() => handleNotificationToggle(key as keyof NotificationSettings)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                            value ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-white/20'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="max-w-2xl">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-6">Change Password</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={passwords.current}
                          onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                          className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 pr-10 text-white"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">New Password</label>
                      <input
                        type="password"
                        value={passwords.new}
                        onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        value={passwords.confirm}
                        onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white"
                        placeholder="Confirm new password"
                      />
                    </div>

                    <button
                      onClick={handlePasswordChange}
                      className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Update Password
                    </button>
                  </div>

                  <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Shield className="text-red-400 mt-1" size={16} />
                      <div>
                        <h4 className="font-medium text-red-400 mb-1">Account Security</h4>
                        <p className="text-sm text-gray-300">
                          Use a strong password with at least 8 characters, including uppercase, lowercase, numbers, and special characters.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}