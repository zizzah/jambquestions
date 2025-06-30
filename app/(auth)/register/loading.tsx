export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-yellow-400"></div>
      <p className="mt-6 text-lg text-gray-300 animate-pulse">Loading your JAMB Dashboard...</p>
    </div>
  );
}