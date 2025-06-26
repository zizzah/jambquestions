
export function DashboardSkeleton() {
  return (
    <div className="w-full h-full animate-pulse">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-8 w-48 bg-gray-200 rounded"></div>
      </div>

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow">
            <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Recent Activity skeleton */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="h-6 w-48 bg-gray-200 rounded mb-6"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Chart skeleton */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="h-6 w-36 bg-gray-200 rounded mb-6"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100">
      <td className="py-3">
        <div className="h-6 w-32 bg-gray-200 rounded"></div>
      </td>
      <td className="py-3">
        <div className="h-6 w-24 bg-gray-200 rounded"></div>
      </td>
      <td className="py-3">
        <div className="h-6 w-16 bg-gray-200 rounded"></div>
      </td>
      <td className="py-3">
        <div className="h-6 w-24 bg-gray-200 rounded"></div>
      </td>
      <td className="py-3">
        <div className="h-6 w-20 bg-gray-200 rounded"></div>
      </td>
    </tr>
  );
}

export function TableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <table className="min-w-full text-gray-900">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium">
                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium">
                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium">
                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium">
                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium">
                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {[...Array(5)].map((_, i) => (
                  <TableRowSkeleton key={i} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
