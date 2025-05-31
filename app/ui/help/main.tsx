interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface HelpSection {
  id: string;
  title: string;
}

interface MainProps {
  activeSection: string;
  helpSections: HelpSection[];
  filteredFAQs: FAQ[];
  toggleFAQ: (id: string) => void;
  openFAQ: string | null; // Add this missing prop
}

export const Main = ({ activeSection, helpSections, filteredFAQs, toggleFAQ, openFAQ }: MainProps) => (
  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">
        {activeSection === 'all' ? 'All Topics' : helpSections.find(s => s.id === activeSection)?.title}
      </h2>
      <span className="text-sm text-gray-300">
        {filteredFAQs.length} article{filteredFAQs.length !== 1 ? 's' : ''}
      </span>
    </div>

    <div className="space-y-4">
      {filteredFAQs.map((faq) => (
        <div
          key={faq.id}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleFAQ(faq.id)}
            className="w-full px-6 py-4 text-left hover:bg-white/10 transition-all flex items-center justify-between"
          >
            <span className="font-medium">{faq.question}</span>
            <span className={`transform transition-transform ${openFAQ === faq.id ? 'rotate-180' : ''}`}>
              ⌄
            </span>
          </button>
          {openFAQ === faq.id && (
            <div className="px-6 pb-4 text-gray-300 border-t border-white/10">
              <div className="pt-4">
                {faq.answer}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>

    {filteredFAQs.length === 0 && (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">No results found</h3>
        <p className="text-gray-300">
          Try adjusting your search or browse different categories
        </p>
      </div>
    )}
  </div>
);
