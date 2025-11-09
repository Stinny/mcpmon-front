import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Trash2,
  Pause,
  Play,
  Edit2,
  MoreVertical,
  AlertTriangle,
  ExternalLink,
} from "react-feather";
import { useCallback, useState } from "react";
import { Dropdown, Modal, Tooltip } from "antd";
import {
  useGetMonitorsQuery,
  useDeleteMonitorMutation,
  usePauseMonitorMutation,
  useResumeMonitorMutation,
  useUpdateMonitorCacheMutation,
} from "../../api/apiSlice";
import { useWebSocket } from "../../hooks/useWebSocket";

function Monitors() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetMonitorsQuery();
  const [deleteMonitor, { isLoading: isDeletingMonitor }] =
    useDeleteMonitorMutation();
  const [pauseMonitor] = usePauseMonitorMutation();
  const [resumeMonitor] = useResumeMonitorMutation();
  const [updateMonitorCache] = useUpdateMonitorCacheMutation();

  // Delete monitor modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [monitorToDelete, setMonitorToDelete] = useState(null);
  const [confirmationString, setConfirmationString] = useState("");
  const [userInput, setUserInput] = useState("");
  const [deleteError, setDeleteError] = useState("");

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

  // Generate random 6-letter string for confirmation
  const generateRandomString = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleDeleteClick = (id, name) => {
    const random = generateRandomString();
    setMonitorToDelete({ id, name });
    setConfirmationString(random);
    setUserInput("");
    setDeleteError("");
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (userInput !== confirmationString) {
      setDeleteError("The confirmation text doesn't match. Please try again.");
      return;
    }

    try {
      await deleteMonitor(monitorToDelete.id).unwrap();
      setIsDeleteModalOpen(false);
      setMonitorToDelete(null);
      setUserInput("");
      setDeleteError("");
    } catch (err) {
      setDeleteError("Failed to delete monitor. Please try again.");
    }
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
    setMonitorToDelete(null);
    setUserInput("");
    setDeleteError("");
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
        return "This MCP server is online";
      case "down":
      case "offline":
        return "This MCP server is offline";
      case "paused":
        return "This MCP server is paused";
      default:
        return "This MCP server status is unknown";
    }
  };

  const formatResponseTime = (ms) => {
    if (ms >= 1000) {
      return `${(ms / 1000).toFixed(2)}s`;
    }
    return `${ms}ms`;
  };

  const getMenuItems = (monitor) => [
    {
      key: "edit",
      label: (
        <div className="flex items-center gap-2">
          <Edit2 size={14} />
          <span>Edit</span>
        </div>
      ),
      onClick: () => navigate(`/monitors/edit/${monitor._id}`),
    },
    {
      key: "status",
      label: (
        <div className="flex items-center gap-2">
          <ExternalLink size={14} />
          <span>View</span>
        </div>
      ),
      onClick: () => window.open(`/m/${monitor._id}`, "_blank"),
    },
    {
      key: monitor.status === "paused" ? "resume" : "pause",
      label: (
        <div className="flex items-center gap-2">
          {monitor.status === "paused" ? (
            <>
              <Play size={14} />
              <span>Resume</span>
            </>
          ) : (
            <>
              <Pause size={14} />
              <span>Pause</span>
            </>
          )}
        </div>
      ),
      onClick: () =>
        monitor.status === "paused"
          ? handleResume(monitor._id)
          : handlePause(monitor._id),
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      label: (
        <div className="flex items-center gap-2 text-red-600">
          <Trash2 size={14} />
          <span>Delete</span>
        </div>
      ),
      onClick: () => handleDeleteClick(monitor._id, monitor.name),
    },
  ];

  if (isLoading) {
    return (
      <div className="px-4 md:px-12 py-16 md:py-12">
        <div className="text-center py-12">
          <p className="text-gray-500">Loading monitors...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-4 md:px-12 py-16 md:py-12">
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
    <div className="px-4 md:px-20 py-16 md:py-20">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
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
        <div className="text-center py-44">
          <p className="text-gray-500 mb-4">
            You are not monitoring any MCP servers yet
          </p>
          <Link
            to="/monitors/add"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm text-black hover:bg-black hover:text-white transition-colors rounded-md"
          >
            <Plus size={16} />
            Add your first monitor
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {monitors.map((monitor) => (
            <div
              key={monitor._id}
              className="border border-gray-200 rounded-lg p-6 bg-white hover:border-gray-300 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <Tooltip
                  title={getStatusTooltip(monitor.status)}
                  color="#ffffff"
                >
                  <span
                    className={`w-5 h-3 rounded-full cursor-pointer ${getStatusColor(
                      monitor.status,
                    )}`}
                  ></span>
                </Tooltip>
                <Dropdown
                  menu={{ items: getMenuItems(monitor) }}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <button className="p-1 text-gray-600 hover:text-black transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </Dropdown>
              </div>

              <h3 className="text-lg font-medium text-black mb-2">
                {monitor.name}
              </h3>
              <p
                className="text-sm text-black mb-4 truncate"
                title={monitor.url}
              >
                {monitor.url}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Uptime</span>
                  <span className="font-medium text-black">
                    {monitor.uptimePercentage.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Checks</span>
                  <span className="font-medium text-black">
                    {monitor.totalChecks}
                  </span>
                </div>
                {monitor.averageResponseTime > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Response</span>
                    <span className="font-medium text-black">
                      {formatResponseTime(monitor.averageResponseTime)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Monitor Confirmation Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-600" />
            <span>Delete Monitor</span>
          </div>
        }
        open={isDeleteModalOpen}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteModalCancel}
        okText="Delete Monitor"
        cancelText="Cancel"
        okButtonProps={{
          danger: true,
          loading: isDeletingMonitor,
          disabled: userInput !== confirmationString,
        }}
      >
        <div className="space-y-4 py-4">
          <p className="text-sm text-gray-700">
            This action <strong>cannot be undone</strong>. This will permanently
            delete the monitor <strong>{monitorToDelete?.name}</strong> and all
            its associated data.
          </p>

          {deleteError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
              {deleteError}
            </div>
          )}

          <div>
            <p className="text-sm text-gray-700 mb-2">
              Please type{" "}
              <strong className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                {confirmationString}
              </strong>{" "}
              to confirm:
            </p>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              placeholder="Type the confirmation text"
              autoComplete="off"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Monitors;
