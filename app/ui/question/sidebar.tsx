// components/ui/question/Sidebar.tsx
import React, { useState } from 'react';
import { Target } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface SidebarProps {
  subjects: Subject[];
  onSubjectChange: (subjectId: string) => void;
  selectedSubject?: string;
}

/**
 * Sidebar component for filtering content by subject.
 *
 * @param {Object} props
 * @param {Array<{ id: string, name: string, icon: string, count: number }>} props.subjects
 *   An array of subject objects to display in the sidebar.
 * @param {function} props.onSubjectChange
 *   Callback function invoked when a subject is selected.
 * @param {string} [props.selectedSubject="All Subjects"]
 *   The initially selected subject.
 *
 * @returns {JSX.Element} The rendered Sidebar component.
 */

const Sidebar: React.FC<SidebarProps> = ({ 
  subjects, 
  onSubjectChange, 
  selectedSubject = "All Subjects" 
}) => {
  const [activeSubject, setActiveSubject] = useState<string>(selectedSubject);

  const handleSubjectClick = (subjectId: string) => {
    setActiveSubject(subjectId);
    onSubjectChange(subjectId);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 sticky top-6">
      <h3 className="font-semibold text-lg mb-4 flex items-center">
        <Target className="w-5 h-5 mr-2 text-yellow-400" />
        Filter by Subject
      </h3>
      <ul className="space-y-2">
        {subjects.map((subject) => (
          <li key={subject.id}>
            <button
              onClick={() => handleSubjectClick(subject.id)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center justify-between ${
                activeSubject === subject.id
                  ? "bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30"
                  : "hover:bg-white/10"
              }`}
            >
              <div className="flex items-center">
                <span className="text-lg mr-3">{subject.icon}</span>
                <span className="text-sm font-medium">{subject.name}</span>
              </div>
              <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                {subject.count.toLocaleString()}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;