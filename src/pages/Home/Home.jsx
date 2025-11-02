import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Plus,
  Activity,
  TrendingUp,
  Monitor,
  CheckCircle,
  Bell,
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
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
              <Activity size={18} className="text-black" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Avg Response Time</p>
          <p className="text-2xl font-semibold text-black">
            {stats.avgResponseTime === "---"
              ? stats.avgResponseTime
              : `${stats.avgResponseTime} ms`}
          </p>
        </div>

        {/* Average Uptime */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
              <TrendingUp size={18} className="text-black" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Avg Uptime</p>
          <p className="text-2xl font-semibold text-black">
            {stats.avgUptime === "---"
              ? stats.avgUptime
              : `${stats.avgUptime}%`}
          </p>
        </div>

        {/* Total Monitors */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
              <Monitor size={18} className="text-black" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Monitors</p>
          <p className="text-2xl font-semibold text-black">
            {stats.totalMonitors}
          </p>
        </div>

        {/* Active Monitors */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
              <CheckCircle size={18} className="text-black" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Active Monitors</p>
          <p className="text-2xl font-semibold text-black">
            {stats.activeMonitors}
          </p>
        </div>
      </div>

      {/* Quick Actions / Recent Activity Section (Optional) */}
      <div className="border border-gray-200 rounded-lg p-6 bg-white">
        <h2 className="text-lg font-medium text-black mb-4">Quick Actions</h2>
        <div className="flex flex-col gap-3">
          <Link
            to="/monitors"
            className="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Monitor size={18} className="text-gray-600" />
            <div>
              <p className="text-sm font-medium text-black">
                View All Monitors
              </p>
              <p className="text-xs text-gray-500">
                Manage and monitor your MCP servers
              </p>
            </div>
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Bell size={18} className="text-gray-600" />
            <div>
              <p className="text-sm font-medium text-black">Configure Alerts</p>
              <p className="text-xs text-gray-500">
                Set up email and SMS notifications
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
