'use client';

import React, { useState, useEffect } from 'react';
import { faqData,helpSections,} from '../lid/data';
import { AdditionalHelp } from '../ui/help/additional';
import ContactSupport from '../ui/help/contactSupport';
import { Hero } from '../ui/help/hero';
import QuickAction from '../ui/help/quickAction';
import Header from '../ui/help/header';
import { SearchBar } from '../ui/help/searchBar';
import { Main } from '../ui/help/main';
import { Sidebar } from '../ui/help/sideBar';

export default function HelpPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('getting-started');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredFAQs = faqData.filter(faq => 
    (activeSection === 'all' || faq.category === activeSection) &&
    (searchQuery === '' || 
     faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleFAQ = (faqId: string) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse"></div>
      </div>
      <div className="relative z-10">
        {/* Header */}
          <Header/>
        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Hero Section */}
             <Hero />
            {/* Search Bar */}
           <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            {/* Quick Actions */}
             <QuickAction/>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar - Help Categories */}
              <Sidebar activeSection={activeSection}
               setActiveSection={setActiveSection} helpSections={helpSections} />
              {/* Main Content - FAQ */}
              <div className="lg:col-span-3">
                <Main activeSection= {activeSection} helpSections={helpSections}
                filteredFAQs={filteredFAQs} toggleFAQ={toggleFAQ} openFAQ={openFAQ}/>
                {/* Contact Support Section */}
                  <ContactSupport/>
              </div>
            </div>
            {/* Additional Resources */}
        <AdditionalHelp/>
          </div>
        </main>
      </div>
    </div>
  );
}