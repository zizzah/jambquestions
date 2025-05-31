
export const  Sidebar=({ 
  setActiveSection, 
  helpSections, 
  activeSection 
}: {
  setActiveSection: (section: string) => void
  helpSections: Array<{ id: string; emoji: string; title: string; }>
  activeSection: string
})=> {

  return (
    <div className="lg:col-span-1">
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 sticky top-6">
        <h3 className="font-semibold mb-4">Help Topics</h3>
        <div className="space-y-2">
          <button
            onClick={() => setActiveSection('all')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center space-x-3 ${
              activeSection === 'all' 
                ? 'bg-yellow-400/20 border border-yellow-400/30 text-yellow-400' 
                : 'hover:bg-white/10'
            }`}
          >
            <span>📋</span>
            <span>All Topics</span>
          </button>
          {helpSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center space-x-3 ${
                activeSection === section.id 
                  ? 'bg-yellow-400/20 border border-yellow-400/30 text-yellow-400' 
                  : 'hover:bg-white/10'
              }`}
            >
              <span>{section.emoji}</span>
              <span className="text-sm">{section.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}