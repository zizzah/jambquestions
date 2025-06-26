
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-red-400">Something went wrong!</h2>
        <p className="text-gray-300">{error.message}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
