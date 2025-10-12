import { Link } from "react-router-dom";
import { Plus, Trash2, Pause, Play, Edit2 } from "react-feather";
import { useCallback } from "react";
import {
  useGetMonitorsQuery,
  useDeleteMonitorMutation,
  usePauseMonitorMutation,
  useResumeMonitorMutation,
  useUpdateMonitorCacheMutation,
} from "../../api/apiSlice";
import { useWebSocket } from "../../hooks/useWebSocket";

function Monitors() {
  const { data, isLoading, isError, error } = useGetMonitorsQuery();
  const [deleteMonitor] = useDeleteMonitorMutation();
  const [pauseMonitor] = usePauseMonitorMutation();
  const [resumeMonitor] = useResumeMonitorMutation();
  const [updateMonitorCache] = useUpdateMonitorCacheMutation();

  // Handle WebSocket messages
  const handleWebSocketMessage = useCallback(
    (message) => {
      if (message.type === "monitor_update" && message.data) {
        console.log("Received monitor update via WebSocket:", message.data._id);
        updateMonitorCache(message.data);
      }
    },
    [updateMonitorCache],
  );

  // Connect to WebSocket
  const { isConnected } = useWebSocket(handleWebSocketMessage);

  const monitors = data?.data || [];

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteMonitor(id).unwrap();
      } catch (err) {
        alert("Failed to delete monitor");
      }
    }
  };

  const handlePause = async (id) => {
    try {
      await pauseMonitor(id).unwrap();
    } catch (err) {
      alert("Failed to pause monitor");
    }
  };

  const handleResume = async (id) => {
    try {
      await resumeMonitor(id).unwrap();
    } catch (err) {
      alert("Failed to resume monitor");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "up":
      case "online":
        return "bg-green-100 text-green-800";
      case "down":
      case "offline":
        return "bg-red-100 text-red-800";
      case "paused":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (isLoading) {
    return (
      <div className="px-12 py-12">
        <div className="text-center py-12">
          <p className="text-gray-500">Loading monitors...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-12 py-12">
        <div className="text-center py-12">
          <p className="text-red-500 mb-2">
            Error loading monitors:{" "}
            {error?.data?.message || error?.error || "Unknown error"}
          </p>
          <p className="text-xs text-gray-500">
            Status: {error?.status} | {JSON.stringify(error)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-12 py-12">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-normal text-black">Monitors</h1>
        </div>
        <Link
          to="/monitors/add"
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm text-black hover:bg-black hover:text-white transition-colors rounded-md"
        >
          <Plus size={16} />
          Add Monitor
        </Link>
      </div>

      {monitors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No monitors yet</p>
          <Link
            to="/monitors/add"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm text-black hover:bg-black hover:text-white transition-colors rounded-md"
          >
            <Plus size={16} />
            Add your first monitor
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {monitors.map((monitor) => (
            <div
              key={monitor._id}
              className="border border-gray-200 rounded-md p-4 hover:border-gray-300 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-base font-medium text-black mb-1">
                    {monitor.name}
                  </h3>
                  <p className="text-sm text-gray-600">{monitor.url}</p>
                  <div className="flex gap-4 mt-2 text-xs text-gray-500">
                    <span>Uptime: {monitor.uptimePercentage.toFixed(2)}%</span>
                    <span>Checks: {monitor.totalChecks}</span>
                    {monitor.averageResponseTime > 0 && (
                      <span>Avg Response: {monitor.averageResponseTime}ms</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${getStatusColor(
                      monitor.status,
                    )}`}
                  >
                    {monitor.status}
                  </span>
                  <Link
                    to={`/monitors/edit/${monitor._id}`}
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    title="Edit monitor"
                  >
                    <Edit2 size={16} />
                  </Link>
                  {monitor.status === "paused" ? (
                    <button
                      onClick={() => handleResume(monitor._id)}
                      className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                      title="Resume monitoring"
                    >
                      <Play size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePause(monitor._id)}
                      className="p-2 text-gray-600 hover:text-yellow-600 transition-colors"
                      title="Pause monitoring"
                    >
                      <Pause size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(monitor._id, monitor.name)}
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                    title="Delete monitor"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Monitors;
