import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { TbDeviceHeartMonitor } from "react-icons/tb";
import { Tooltip, Modal, Pagination, Tabs } from "antd";
import { BarChart2, Tool, Lock } from "react-feather";

const MonitorStatus = () => {
  const { monitorId } = useParams();
  const [monitor, setMonitor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const toolsPerPage = 12;

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

  const getStatusTooltip = (status) => {
    switch (status) {
      case "up":
      case "online":
        return "MCP server is online";
      case "down":
      case "offline":
        return "MCP server is offline";
      case "paused":
        return "Monitoring is paused";
      default:
        return "MCP server status unknown";
    }
  };

  const formatDate = (date, showToday = false) => {
    if (!date) return "Never";
    const d = new Date(date);
    const now = new Date();

    // Get time
    const time = d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // Check if date is today
    const isToday =
      showToday &&
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear();

    if (isToday) {
      return `Today at ${time}`;
    }

    // Get month name
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[d.getMonth()];

    // Get day with ordinal suffix
    const day = d.getDate();
    const getOrdinal = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return `${month} ${getOrdinal(day)} at ${time}`;
  };

  const formatResponseTime = (ms) => {
    if (ms >= 1000) {
      return `${(ms / 1000).toFixed(2)}s`;
    }
    return `${ms}ms`;
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

  // Calculate pagination
  const totalTools = monitor?.tools?.length || 0;
  const startIndex = (currentPage - 1) * toolsPerPage;
  const endIndex = startIndex + toolsPerPage;
  const paginatedTools = monitor?.tools?.slice(startIndex, endIndex) || [];

  const tabItems = [
    {
      key: "stats",
      label: (
        <div className="flex items-center gap-2">
          <BarChart2 size={16} />
          <span>Stats</span>
        </div>
      ),
      children: (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <div className="text-xs text-gray-600 mb-1">Uptime</div>
              <div className="text-xl font-medium text-black">
                {monitor.uptimePercentage?.toFixed(2) || 0}%
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <div className="text-xs text-gray-600 mb-1">Total Checks</div>
              <div className="text-xl font-medium text-black">
                {monitor.totalChecks || 0}
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <div className="text-xs text-gray-600 mb-1">Avg Response</div>
              <div className="text-xl font-medium text-black">
                {monitor.averageResponseTime > 0
                  ? formatResponseTime(monitor.averageResponseTime)
                  : "N/A"}
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <div className="text-xs text-gray-600 mb-1">Tools</div>
              <div className="text-xl font-medium text-black">{totalTools}</div>
            </div>
          </div>

          {/* Dates Box */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Last Checked</span>
              <span className="text-sm font-medium text-black">
                {formatDate(monitor.lastCheckedAt, true)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Monitoring Since</span>
              <span className="text-sm font-medium text-black">
                {formatDate(monitor.createdAt)}
              </span>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "tools",
      label: (
        <div className="flex items-center gap-2">
          <Tool size={16} />
          <span>Tools</span>
        </div>
      ),
      children: (
        <div>
          {totalTools === 0 ? (
            // No tools placeholder
            <div className="border border-gray-200 rounded-lg p-8 bg-gray-50 text-center">
              <p className="text-gray-600 text-sm">
                No tools discovered on this MCP server
              </p>
            </div>
          ) : (
            <>
              {/* Tools Heading and Pagination */}
              <div className="flex items-end justify-between mb-2">
                {/* Tools Heading - Right Side */}
                <div className="text-left">
                  <h2 className="text-md font-medium text-black">
                    {totalTools} {totalTools === 1 ? "Tool" : "Tools"}{" "}
                    Discovered
                  </h2>
                </div>

                {/* Pagination - Left Side */}
                {totalTools > toolsPerPage && (
                  <Pagination
                    current={currentPage}
                    total={totalTools}
                    pageSize={toolsPerPage}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false}
                    size="small"
                    simple
                  />
                )}
                {totalTools <= toolsPerPage && <div></div>}
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {paginatedTools.map((tool, index) => (
                  <div
                    key={startIndex + index}
                    onClick={() => setSelectedTool(tool)}
                    className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:border-gray-400 transition-colors cursor-pointer"
                  >
                    <h3 className="text-sm font-medium text-black truncate">
                      {tool.name}
                    </h3>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Main Info Box */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm mb-4 relative">
          {/* Auth Badge */}
          {monitor.authType && monitor.authType !== "none" && (
            <div className="absolute top-4 right-4">
              <Tooltip
                title="MCP server requires authentication"
                color="#ffffff"
              >
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-100 border border-gray-300 rounded-md">
                  <Lock size={14} className="text-gray-700" />
                  <span className="text-xs font-medium text-gray-700">
                    Auth Required
                  </span>
                </div>
              </Tooltip>
            </div>
          )}

          <div className="flex flex-col items-start gap-2 mb-6">
            {/* Status Dot */}
            <div className="flex-shrink-0 mt-1">
              <Tooltip title={getStatusTooltip(monitor.status)} color="#ffffff">
                <span
                  className={`w-6 h-4 rounded-full cursor-pointer inline-block ${getStatusColor(
                    monitor.status,
                  )}`}
                ></span>
              </Tooltip>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h1 className="text-2xl font-medium text-black mb-2">
                {monitor.name}
              </h1>

              {monitor.description && (
                <p className="text-sm text-gray-600 mb-2">
                  {monitor.description}
                </p>
              )}

              <a
                href={monitor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-800 underline break-all"
              >
                {monitor.url}
              </a>
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            defaultActiveKey="stats"
            items={tabItems}
            className="status-tabs"
          />
        </div>

        {/* Tool Modal */}
        <Modal
          title={
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium text-black">
                {selectedTool?.name}
              </span>
            </div>
          }
          open={selectedTool !== null}
          onCancel={() => setSelectedTool(null)}
          footer={null}
          width={600}
          centered
        >
          {selectedTool && (
            <div className="py-4">
              {selectedTool.description ? (
                <div>
                  <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-3">
                    Description
                  </h3>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {selectedTool.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                  <p className="text-sm text-gray-600">
                    No description available for this tool
                  </p>
                </div>
              )}
            </div>
          )}
        </Modal>

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
