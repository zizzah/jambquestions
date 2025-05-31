const StatusBanner = () => {
  return (
    <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-8">
      <div className="flex items-center justify-center space-x-3">
        <span className="text-green-400 text-xl">✓</span>
        <span className="text-green-300 font-medium">All</span>
        <span className="text-green-300 font-medium">Questions</span>
        <span className="text-green-300 font-medium">Answered</span>
      </div>
    </div>    
  );}

export default StatusBanner