import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { TbDeviceHeartMonitor } from "react-icons/tb";
import { Tooltip } from "antd";

const MonitorStatus = () => {
  const { monitorId } = useParams();
  const [monitor, setMonitor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonitorStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/monitors/public/${monitorId}`,
        );
        if (response.data.success) {
          setMonitor(response.data.data);
        } else {
          setError("Monitor not found");
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load monitor status",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMonitorStatus();
  }, [monitorId]);

  const getStatusColor = (status) => {
    switch (status) {
      case "up":
      case "online":
        return "bg-green-200 text-green-800";
      case "down":
      case "offline":
        return "bg-red-200 text-red-800";
      case "paused":
        return "bg-blue-200 text-blue-800";
      default:
        return "bg-yellow-200 text-yellow-800";
    }
  };

  const formatDate = (date) => {
    if (!date) return "Never";
    return new Date(date).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading monitor status...</div>
      </div>
    );
  }

  if (error || !monitor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Monitor not found"}</p>
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-black underline"
          >
            Go to MCPmon
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="border border-gray-200 rounded-lg p-8 bg-white shadow-sm">
          {/* Status Badge */}
          <div className="flex justify-center mb-6">
            <Tooltip
              title={
                monitor.status.charAt(0).toUpperCase() + monitor.status.slice(1)
              }
              color="#000000"
            >
              <span
                className={`w-4 h-4 rounded-full cursor-pointer ${getStatusColor(
                  monitor.status,
                )}`}
              ></span>
            </Tooltip>
          </div>

          {/* Monitor Name */}
          <h1 className="text-3xl font-medium text-black text-center mb-2">
            {monitor.name}
          </h1>

          {/* Description */}
          {monitor.description && (
            <p className="text-gray-600 text-center mb-6">
              {monitor.description}
            </p>
          )}

          {/* URL */}
          <div className="text-center mb-8">
            <a
              href={monitor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 underline break-all"
            >
              {monitor.url}
            </a>
          </div>

          {/* Stats */}
          <div className="space-y-4 border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Uptime</span>
              <span className="text-lg font-medium text-black">
                {monitor.uptimePercentage?.toFixed(2) || 0}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Checks</span>
              <span className="text-lg font-medium text-black">
                {monitor.totalChecks || 0}
              </span>
            </div>
            {monitor.averageResponseTime > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Response Time</span>
                <span className="text-lg font-medium text-black">
                  {monitor.averageResponseTime}ms
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Last Checked</span>
              <span className="text-sm font-medium text-black">
                {formatDate(monitor.lastCheckedAt)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Monitoring Since</span>
              <span className="text-sm font-medium text-black">
                {formatDate(monitor.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Powered by MCPmon */}
        <div className="text-center mt-8 mx-auto flex items-center w-full justify-center">
          <div className="text-sm text-gray-500 flex items-center gap-1">
            Powered by{" "}
            <span className="font-medium">
              <Link to="/" className="flex items-center space-x-0">
                <TbDeviceHeartMonitor size={18} className="text-black" />
                <span className="text-md font-medium text-black">MCPmon</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorStatus;
