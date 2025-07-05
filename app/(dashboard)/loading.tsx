// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10">
        <main className="container mx-auto px-6 py-8">
          {/* Loading animation */}
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-16 h-16 border-4 border-white/20 border-t-yellow-400 rounded-full animate-spin mb-4"></div>
            <h2 className="text-2xl font-bold mb-2">Loading Dashboard...</h2>
            <p className="text-gray-300">Preparing your personalized JAMB preparation data</p>
          </div>

          {/* Loading skeleton */}
          <div className="animate-pulse">
            {/* Welcome Section Skeleton */}
            <div className="mb-8">
              <div className="h-8 bg-white/10 rounded-lg w-1/3 mb-2"></div>
              <div className="h-4 bg-white/10 rounded-lg w-1/2"></div>
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg"></div>
                  </div>
                  <div className="h-8 bg-white/20 rounded w-16 mb-2"></div>
                  <div className="h-4 bg-white/20 rounded w-24 mb-1"></div>
                  <div className="h-3 bg-white/20 rounded w-12"></div>
                </div>
              ))}
            </div>

            {/* Main Content Skeleton */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Subject Progress Skeleton */}
                <div className="bg-white/10 rounded-xl p-6">
                  <div className="h-6 bg-white/20 rounded w-48 mb-6"></div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white/20 rounded-lg"></div>
                            <div>
                              <div className="h-4 bg-white/20 rounded w-20 mb-1"></div>
                              <div className="h-3 bg-white/20 rounded w-16"></div>
                            </div>
                          </div>
                          <div className="h-6 bg-white/20 rounded w-12"></div>
                        </div>
                        <div className="h-2 bg-white/20 rounded mb-2"></div>
                        <div className="flex justify-between">
                          <div className="h-3 bg-white/20 rounded w-16"></div>
                          <div className="h-3 bg-white/20 rounded w-12"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity Skeleton */}
                <div className="bg-white/10 rounded-xl p-6">
                  <div className="h-6 bg-white/20 rounded w-36 mb-6"></div>
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
                        <div className="w-10 h-10 bg-white/20 rounded-lg"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-white/20 rounded w-32 mb-1"></div>
                          <div className="h-3 bg-white/20 rounded w-24"></div>
                        </div>
                        <div className="h-6 bg-white/20 rounded w-12"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Quick Actions Skeleton */}
                <div className="bg-white/10 rounded-xl p-6">
                  <div className="h-5 bg-white/20 rounded w-32 mb-4"></div>
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-12 bg-white/20 rounded-lg"></div>
                    ))}
                  </div>
                </div>

                {/* Goals Skeleton */}
                <div className="bg-white/10 rounded-xl p-6">
                  <div className="h-5 bg-white/20 rounded w-28 mb-4"></div>
                  <div className="space-y-4">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="bg-white/5 rounded-lg p-4">
                        <div className="flex justify-between mb-2">
                          <div className="h-4 bg-white/20 rounded w-32"></div>
                          <div className="h-4 bg-white/20 rounded w-12"></div>
                        </div>
                        <div className="h-2 bg-white/20 rounded mb-2"></div>
                        <div className="flex justify-between">
                          <div className="h-3 bg-white/20 rounded w-16"></div>
                          <div className="h-3 bg-white/20 rounded w-12"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Streak Skeleton */}
                <div className="bg-white/10 rounded-xl p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-2"></div>
                    <div className="h-6 bg-white/20 rounded w-32 mx-auto mb-2"></div>
                    <div className="h-4 bg-white/20 rounded w-40 mx-auto mb-4"></div>
                    <div className="flex justify-center space-x-1">
                      {[...Array(7)].map((_, i) => (
                        <div key={i} className="w-6 h-6 bg-white/20 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}