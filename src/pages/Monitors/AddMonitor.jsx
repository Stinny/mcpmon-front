import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import { useCreateMonitorMutation } from "../../api/apiSlice";
import AuthConfig from "../../components/AuthConfig";

function AddMonitor() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [serverType, setServerType] = useState("http-jsonrpc");
  const [authType, setAuthType] = useState("none");
  const [authConfig, setAuthConfig] = useState({});
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [createMonitor, { isLoading }] = useCreateMonitorMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const monitorData = {
        name,
        url,
        serverType,
        authType,
        authConfig: authType !== "none" ? authConfig : null,
      };
      await createMonitor(monitorData).unwrap();
      navigate("/monitors");
    } catch (err) {
      setError(err?.data?.message || "Failed to create monitor. Please try again.");
    }
  };

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
          Add New Monitor
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

          <div>
            <label htmlFor="serverType" className="block text-sm text-black mb-2">
              Server Type
            </label>
            <select
              id="serverType"
              name="serverType"
              value={serverType}
              onChange={(e) => setServerType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            >
              <option value="http-jsonrpc">HTTP JSON-RPC</option>
              <option value="sse">SSE (Server-Sent Events)</option>
              <option value="sse-session">SSE with Session (e.g., GitHub Copilot)</option>
            </select>
            <p className="mt-1 text-xs text-gray-500">
              Choose the type of MCP server you're monitoring
            </p>
          </div>

          <div>
            <label htmlFor="authType" className="block text-sm text-black mb-2">
              Authentication Type
            </label>
            <select
              id="authType"
              name="authType"
              value={authType}
              onChange={(e) => setAuthType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            >
              <option value="none">None</option>
              <option value="api-key">API Key</option>
              <option value="bearer-token">Bearer Token</option>
              <option value="custom-headers">Custom Headers</option>
            </select>
          </div>

          <AuthConfig
            authType={authType}
            authConfig={authConfig}
            onChange={setAuthConfig}
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 border border-gray-300 text-sm text-black hover:bg-black hover:text-white transition-colors rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Adding..." : "Add Monitor"}
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

export default AddMonitor;
