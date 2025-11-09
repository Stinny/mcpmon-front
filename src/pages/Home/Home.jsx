import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Plus,
  Activity,
  TrendingUp,
  Monitor,
  CheckCircle,
} from "react-feather";
import { selectCurrentUser } from "../../features/authSlice";
import { useGetDashboardStatsQuery } from "../../api/apiSlice";

function Home() {
  const user = useSelector(selectCurrentUser);
  const { data, isLoading, isError } = useGetDashboardStatsQuery();

  // Extract stats from API response or use default values
  const stats = {
    avgResponseTime: data?.data?.avgResponseTime ?? "---",
    avgUptime: data?.data?.avgUptime ?? "---",
    totalMonitors: data?.data?.totalMonitors ?? "---",
    activeMonitors: data?.data?.activeMonitors ?? "---",
  };

  const formatResponseTime = (ms) => {
    if (ms >= 1000) {
      return `${(ms / 1000).toFixed(2)}s`;
    }
    return `${ms}ms`;
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="px-4 md:px-20 py-16 md:py-20">
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="px-4 md:px-20 py-16 md:py-20">
        <div className="flex items-center justify-center py-12">
          <p className="text-red-500">Failed to load dashboard statistics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-20 py-16 md:py-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-normal text-black mb-2">
            Welcome back{user?.name ? `, ${user.name}` : ""}!
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Monitor your MCP servers and track their performance
          </p>
        </div>
        <Link
          to="/monitors/add"
          className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-sm text-black hover:bg-black hover:text-white transition-colors rounded-md whitespace-nowrap"
        >
          <Plus size={16} />
          Add Monitor
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Average Response Time */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <p className="text-sm text-gray-600 mb-1">Average Response</p>
          <p className="text-2xl font-semibold text-black">
            {stats.avgResponseTime === "---"
              ? stats.avgResponseTime
              : formatResponseTime(stats.avgResponseTime)}
          </p>
        </div>

        {/* Average Uptime */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <p className="text-sm text-gray-600 mb-1">Average Uptime</p>
          <p className="text-2xl font-semibold text-black">
            {stats.avgUptime === "---"
              ? stats.avgUptime
              : `${stats.avgUptime}%`}
          </p>
        </div>

        {/* Total Monitors */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <p className="text-sm text-gray-600 mb-1">Total Monitors</p>
          <p className="text-2xl font-semibold text-black">
            {stats.totalMonitors}
          </p>
        </div>

        {/* Active Monitors */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <p className="text-sm text-gray-600 mb-1">Active Monitors</p>
          <p className="text-2xl font-semibold text-black">
            {stats.activeMonitors}
          </p>
        </div>
      </div>

      {/* Placeholder Section */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-20 flex flex-col items-center justify-center h-96">
          <p className="text-sm text-black">More stuff on the way!</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
