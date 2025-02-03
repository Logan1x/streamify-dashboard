import React, { Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load components
const KeyMetrics = React.lazy(() => import("./components/KeyMetrics"));
const UserGrowthChart = React.lazy(
  () => import("./components/UserGrowthChart")
);
const RevenueDistribution = React.lazy(
  () => import("./components/RevenueDistribution")
);
const TopStreamedSongs = React.lazy(
  () => import("./components/TopStreamedSongs")
);
const RecentStreamsTable = React.lazy(
  () => import("./components/RecentStreamsTable")
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Streamify Analytics Dashboard
      </h1>

      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            <div className="col-span-1 lg:col-span-2 xl:col-span-3 bg-white p-2 lg:p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white lg:p-4 rounded-lg shadow-md">
                  <UserGrowthChart />
                </div>
                <div className="bg-white lg:p-4 rounded-lg shadow-md">
                  <RevenueDistribution />
                </div>
              </div>
            </div>

            <div className="col-span-1 bg-white p-6 rounded-lg shadow-md">
              <KeyMetrics />
            </div>
            <div className="col-span-1 lg:col-span-2 xl:col-span-2 bg-white lg:p-6 rounded-lg shadow-md">
              <TopStreamedSongs />
            </div>

            <div className="col-span-1 xl:col-span-3 bg-white p-6 rounded-lg shadow-md">
              <RecentStreamsTable />
            </div>
          </div>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default App;
