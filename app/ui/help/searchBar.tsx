
/**
 * A SearchBar component for searching through help topics, questions, or keywords.
 *
 * @param {{searchQuery: string, setSearchQuery: (query: string) => void}} props
 * @returns {JSX.Element}
 */
export const SearchBar: React.FC<{
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for help topics, questions, or keywords..."
          className="w-full px-6 py-4 pl-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all text-white placeholder-gray-400"
        />
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"> </span>
      </div>
    </div>
  );
};
