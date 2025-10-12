import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import { useGetMonitorQuery, useUpdateMonitorMutation } from "../../api/apiSlice";

function EditMonitor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading: isLoadingMonitor, isError } = useGetMonitorQuery(id);
  const [updateMonitor, { isLoading: isUpdating }] = useUpdateMonitorMutation();

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  // Populate form when monitor data is loaded
  useEffect(() => {
    if (data?.data) {
      setName(data.data.name);
      setUrl(data.data.url);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await updateMonitor({ id, name, url }).unwrap();
      navigate("/monitors");
    } catch (err) {
      setError(err?.data?.message || "Failed to update monitor. Please try again.");
    }
  };

  if (isLoadingMonitor) {
    return (
      <div className="px-12 py-12">
        <div className="text-center py-12">
          <p className="text-gray-500">Loading monitor...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-12 py-12">
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">Failed to load monitor</p>
          <Link
            to="/monitors"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black"
          >
            <ArrowLeft size={16} />
            Back to Monitors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-12 py-12">
      <div className="max-w-2xl">
        <Link
          to="/monitors"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft size={16} />
          Back to Monitors
        </Link>

        <h1 className="text-2xl font-normal text-black mb-8">
          Edit Monitor
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm text-black mb-2">
              Monitor Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              placeholder="My MCP Server"
            />
          </div>

          <div>
            <label htmlFor="url" className="block text-sm text-black mb-2">
              Server URL
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              placeholder="https://mcp.example.com"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isUpdating}
              className="px-6 py-2 border border-gray-300 text-sm text-black hover:bg-black hover:text-white transition-colors rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? "Updating..." : "Update Monitor"}
            </button>
            <Link
              to="/monitors"
              className="px-6 py-2 text-sm text-gray-600 hover:text-black transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMonitor;
