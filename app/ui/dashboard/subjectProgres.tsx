'use client';

import { Subject } from "@/app/types/dashbord";

interface SubjectProgressProps {
  subjects: Subject[];
  selectedSubject: string;
  onSubjectChange: (subject: string) => void;
}

export function SubjectProgress({ subjects, selectedSubject, onSubjectChange }: SubjectProgressProps) {
  const filteredSubjects = subjects.filter(subject => {
    if (selectedSubject === 'all') return true;
    if (selectedSubject === 'weak') return subject.progress < 50;
    if (selectedSubject === 'strong') return subject.progress >= 80;
    return true;
  });

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Subject Progress</h3>
        <select 
          value={selectedSubject}
          onChange={(e) => onSubjectChange(e.target.value)}
          className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-sm text-white"
        >
          <option value="all" className="bg-gray-800">All Subjects</option>
          <option value="weak" className="bg-gray-800">Weak Areas</option>
          <option value="strong" className="bg-gray-800">Strong Areas</option>
        </select>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {filteredSubjects.map((subject) => (
          <div key={subject.id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all group cursor-pointer">
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
  );
}