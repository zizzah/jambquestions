
'use client';

import { useState, useEffect } from 'react';
import {  DashboardData } from "@/app/types/dashbord";

import { WelcomeSection } from './welcomeSection';
import { StatsGrid } from './statsGrid';
import { SubjectProgress } from './subjectProgres';
import { RecentActivity } from './filtering/recentActivity';
import { QuickActions } from './filtering/quickAction';
import { GoalsSection } from './navigation/goalSection';
import StudyStreak from './navigation/studyStreak';
import { BackgroundElements } from './backgroundElement';
interface DashboardClientProps {
  data: DashboardData;
}

export function DashboardClient({ data }: DashboardClientProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('all');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      <BackgroundElements />
      
      <div className="relative z-10">
        <main className="container mx-auto px-6 py-8">
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            
            <WelcomeSection user={data.user} />
            
            <StatsGrid stats={data.stats} />
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <SubjectProgress 
                  subjects={data.subjects}
                  selectedSubject={selectedSubject}
                  onSubjectChange={setSelectedSubject}
                />
                
                <RecentActivity activities={data.recentActivity} />
              </div>

              <div className="space-y-8">
                <QuickActions />
                
                <GoalsSection goals={data.upcomingGoals} />
                
                <StudyStreak currentStreak={data.currentStreak} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}