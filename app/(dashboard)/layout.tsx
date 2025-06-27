/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import { userData, notifications } from '../lid/data';
import Link from 'next/link';
import DashboardLayouts from '../ui/dashboard/navigation';


const navItems = [
  { name: 'Dashboard', icon: '📊', href: '/dashboard' },
  { name: 'Practice', icon: '📝', href: '/dashboard/practice' },
  { name: 'Mock Exams', icon: '🎯', href: '/dashboard/mock' },
  { name: 'Analytics', icon: '📈', href: '/dashboard/analytics' },
  { name: 'Goals', icon: '🎯', href: '/dashboard/goals' },
];

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayouts>{children}</DashboardLayouts>;
}