
export const userData = {
    name: "Adunni Okafor",
    targetScore: 300,
    currentLevel: "Intermediate",
    joinDate: "January 2024",
    avatar: "👩🏽‍🎓"
  };

     export const stats = [
    { title: "Questions Answered", value: "2,847", change: "+127 this week", icon: "📊", color: "from-blue-500 to-blue-600" },
    { title: "Current Streak", value: `${90} days`, change: "Keep it up!", icon: "🔥", color: "from-orange-500 to-red-500" },
    { title: "Average Score", value: "78%", change: "+5% from last week", icon: "📈", color: "from-green-500 to-emerald-600" },
    { title: "Mock Exams", value: "12", change: "3 this month", icon: "📝", color: "from-purple-500 to-purple-600" }
  ];

 export const subjects = [
    { name: "Mathematics", progress: 85, questions: 1247, icon: "📊", color: "bg-blue-500", recent: "+45 today" },
    { name: "English", progress: 92, questions: 1089, icon: "📚", color: "bg-green-500", recent: "+32 today" },
    { name: "Physics", progress: 67, questions: 892, icon: "⚛️", color: "bg-purple-500", recent: "+28 today" },
    { name: "Chemistry", progress: 74, questions: 756, icon: "🧪", color: "bg-red-500", recent: "+19 today" },
    { name: "Biology", progress: 81, questions: 934, icon: "🧬", color: "bg-emerald-500", recent: "+37 today" },
    { name: "Literature", progress: 58, questions: 423, icon: "📖", color: "bg-orange-500", recent: "+12 today" }
  ];

 export  const recentActivity = [
    { subject: "Mathematics", action: "Completed Algebra Quiz", score: "85%", time: "2 hours ago", icon: "📊" },
    { subject: "English", action: "Mock Exam Attempt", score: "92%", time: "5 hours ago", icon: "📚" },
    { subject: "Physics", action: "Practice Session", score: "78%", time: "1 day ago", icon: "⚛️" },
    { subject: "Chemistry", action: "Topic Review", score: "81%", time: "2 days ago", icon: "🧪" }
  ];

export  const upcomingGoals = [
    { title: "Complete 100 Math Questions", progress: 67, deadline: "3 days left", priority: "high" },
    { title: "Take Physics Mock Exam", progress: 0, deadline: "5 days left", priority: "medium" },
    { title: "Review Chemistry Chapters 1-5", progress: 40, deadline: "1 week left", priority: "low" }
  ];

 export  const notifications = [
    { type: "achievement", message: "🎉 You've reached a 7-day streak!", time: "Just now" },
    { type: "reminder", message: "📚 Don't forget your daily English practice", time: "2 hours ago" },
    { type: "update", message: "✨ New questions added to Mathematics", time: "1 day ago" }
  ];



  export  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
    'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
    'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
    'Yobe', 'Zamfara'
  ];

 export const availableSubjects = [
    { id: 'english', name: 'English Language', emoji: '📚', required: true },
    { id: 'mathematics', name: 'Mathematics', emoji: '🔢' },
    { id: 'biology', name: 'Biology', emoji: '🧬' },
    { id: 'chemistry', name: 'Chemistry', emoji: '⚗️' },
    { id: 'physics', name: 'Physics', emoji: '⚡' },
    { id: 'economics', name: 'Economics', emoji: '💰' },
    { id: 'government', name: 'Government', emoji: '🏛️' },
    { id: 'geography', name: 'Geography', emoji: '🌍' },
    { id: 'literature', name: 'Literature in English', emoji: '📖' },
    { id: 'crk', name: 'Christian Religious Knowledge', emoji: '✝️' },
    { id: 'irk', name: 'Islamic Religious Knowledge', emoji: '☪️' },
    { id: 'commerce', name: 'Commerce', emoji: '💼' },
    { id: 'accounting', name: 'Accounting', emoji: '📊' },
    { id: 'agricultural_science', name: 'Agricultural Science', emoji: '🌾' },
    { id: 'civic_education', name: 'Civic Education', emoji: '🏛️' },
    { id: 'computer_studies', name: 'Computer Studies', emoji: '💻' }
  ];


  export   const helpSections = [
    { id: 'getting-started', title: 'Getting Started', emoji: '🚀' },
    { id: 'account', title: 'Account Management', emoji: '👤' },
    { id: 'practice', title: 'Practice & Study', emoji: '📚' },
    { id: 'exams', title: 'Mock Exams', emoji: '📝' },
    { id: 'progress', title: 'Progress Tracking', emoji: '📊' },
    { id: 'technical', title: 'Technical Support', emoji: '🛠️' },
    { id: 'billing', title: 'Billing & Payments', emoji: '💳' }
  ];

 export   const faqData = [
    {
      id: 'registration',
      category: 'getting-started',
      question: 'How do I create an account?',
      answer: 'Click on "Register" from the homepage, fill in your personal information, select your 4 JAMB subjects (English is mandatory), and complete the registration process. You\'ll receive a confirmation email to verify your account.'
    },
    {
      id: 'subjects',
      category: 'getting-started',
      question: 'Can I change my subjects after registration?',
      answer: 'Yes, you can change your subjects anytime from your profile settings. Go to Settings > Profile > Edit Subjects. Remember that English Language is mandatory and cannot be removed.'
    },
    {
      id: 'forgot-password',
      category: 'account',
      question: 'I forgot my password. How do I reset it?',
      answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.'
    },
    {
      id: 'practice-questions',
      category: 'practice',
      question: 'How many practice questions are available?',
      answer: 'We have over 50,000 practice questions covering all JAMB subjects. Questions are regularly updated and include detailed explanations for each answer.'
    },
    {
      id: 'mock-exams',
      category: 'exams',
      question: 'How do mock exams work?',
      answer: 'Mock exams simulate the real JAMB CBT experience. They are timed (3 hours), cover all your selected subjects, and provide detailed performance analysis after completion.'
    },
    {
      id: 'progress-tracking',
      category: 'progress',
      question: 'How can I track my progress?',
      answer: 'Your dashboard shows comprehensive analytics including: subject-wise performance, improvement trends, time spent studying, strengths and weaknesses analysis, and mock exam scores.'
    },
    {
      id: 'mobile-app',
      category: 'technical',
      question: 'Is there a mobile app?',
      answer: 'Currently, JAMBPrep is available as a responsive web application that works perfectly on all devices. A dedicated mobile app is coming soon!'
    },
    {
      id: 'subscription',
      category: 'billing',
      question: 'What subscription plans are available?',
      answer: 'We offer Free (limited access), Basic (₦2,000/month), and Premium (₦5,000/month) plans. Premium includes unlimited practice questions, mock exams, and detailed analytics.'
    }
  ];

  export  const quickActions = [
    {
      title: 'Start Practice',
      description: 'Begin practicing with questions from your selected subjects',
      icon: '📝',
      action: 'practice',
      href: '/practice'
    },
    {
      title: 'Take Mock Exam',
      description: 'Test your knowledge with a full JAMB simulation',
      icon: '🎯',
      action: 'mock-exam',
      href: '/mock-exam'
    },
    {
      title: 'View Progress',
      description: 'Check your performance analytics and improvement',
      icon: '📈',
      action: 'progress',
      href: '/dashboard'
    },
    {
      title: 'Contact Support',
      description: 'Get help from our support team',
      icon: '💬',
      action: 'contact',
      href: '/contact'
    }
  ];

  export const contactMethods = [
    {
      method: 'Email Support',
      value: 'support@jambprep.com',
      icon: '📧',
      description: 'Get help within 24 hours'
    },
    {
      method: 'WhatsApp',
      value: '+234 800 JAMB HELP',
      icon: '📱',
      description: 'Quick responses during business hours'
    },
    {
      method: 'Live Chat',
      value: 'Available 9AM - 6PM',
      icon: '💬',
      description: 'Instant support from our team'
    }
  ];


 export   const statss = [
    { number: "50,000+", label: "Questions Available" },
    { number: "98%", label: "Success Rate" },
    { number: "25,000+", label: "Students Helped" },
    { number: "2024", label: "Updated Content" }
  ];

 export const subjectss = [
    { name: "Mathematics", icon: "📊", color: "bg-blue-500" },
    { name: "English", icon: "📚", color: "bg-green-500" },
    { name: "Physics", icon: "⚛️", color: "bg-purple-500" },
    { name: "Chemistry", icon: "🧪", color: "bg-red-500" },
    { name: "Biology", icon: "🧬", color: "bg-emerald-500" },
    { name: "Literature", icon: "📖", color: "bg-orange-500" }
  ];

 export const features = [
    { icon: "🧠", title: "Smart Practice", desc: "AI-powered question selection based on your weak areas" },
    { icon: "🏆", title: "Track Progress", desc: "Detailed analytics and performance tracking" },
    { icon: "👥", title: "Community", desc: "Join thousands of students preparing together" },
    { icon: "📚", title: "Comprehensive", desc: "All JAMB subjects with detailed explanations" }
  ];





export type Option = {
  src: string;
  item: string;
};


