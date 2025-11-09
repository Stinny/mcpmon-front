import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import { Switch } from "antd";
import Select from "react-select";
import {
  useGetMonitorQuery,
  useUpdateMonitorMutation,
} from "../../api/apiSlice";

function EditMonitor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading: isLoadingMonitor, isError } = useGetMonitorQuery(id);
  const [updateMonitor, { isLoading: isUpdating }] = useUpdateMonitorMutation();

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [authType, setAuthType] = useState("none");
  const [authToken, setAuthToken] = useState("");
  const [authHeaderName, setAuthHeaderName] = useState("X-API-Key");
  const [toolsSyncEnabled, setToolsSyncEnabled] = useState(true);
  const [error, setError] = useState("");

  const authTypeOptions = [
    { value: "none", label: "None" },
    { value: "bearer", label: "Bearer Token" },
    { value: "apikey", label: "API Key" },
  ];

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#000000" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 1px #000000" : "none",
      "&:hover": {
        borderColor: state.isFocused ? "#000000" : "#d1d5db",
      },
      fontSize: "0.875rem",
      minHeight: "38px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#000000"
        : state.isFocused
          ? "#f3f4f6"
          : "white",
      color: state.isSelected ? "white" : "#000000",
      fontSize: "0.875rem",
      "&:active": {
        backgroundColor: "#000000",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000000",
      fontSize: "0.875rem",
    }),
  };

  // Populate form when monitor data is loaded
  useEffect(() => {
    if (data?.data) {
      setName(data.data.name);
      setUrl(data.data.url);
      setDescription(data.data.description || "");
      setAuthType(data.data.authType || "none");
      setAuthHeaderName(data.data.authHeaderName || "X-API-Key");
      setToolsSyncEnabled(data.data.toolsSyncEnabled !== false);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const monitorData = {
        id,
        name,
        url,
        description,
        authType,
        authHeaderName: authType === "apikey" ? authHeaderName : undefined,
        toolsSyncEnabled,
      };

      // Only include authToken if it's been changed (not empty)
      if (authToken) {
        monitorData.authToken = authToken;
      }

      await updateMonitor(monitorData).unwrap();
      navigate("/monitors");
    } catch (err) {
      setError(
        err?.data?.message || "Failed to update monitor. Please try again.",
      );
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
          Monitors
        </Link>

        <h1 className="text-2xl font-normal text-black mb-8">Edit Monitor</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm text-black mb-2">
              Name
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
            <label
              htmlFor="description"
              className="block text-sm text-black mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={150}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black resize-none"
              placeholder="Brief description of this monitor (optional)"
            />
            <p className="mt-1 text-xs text-gray-500">
              {description.length}/150
            </p>
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

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-normal text-black mb-4">
              Authentication
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="authType"
                  className="block text-sm text-black mb-2"
                >
                  Authentication Type
                </label>
                <Select
                  inputId="authType"
                  name="authType"
                  value={authTypeOptions.find(
                    (option) => option.value === authType,
                  )}
                  onChange={(option) => setAuthType(option.value)}
                  options={authTypeOptions}
                  styles={customSelectStyles}
                  isSearchable={false}
                />
              </div>

              {authType !== "none" && (
                <div>
                  <label
                    htmlFor="authToken"
                    className="block text-sm text-black mb-2"
                  >
                    {authType === "bearer" ? "Bearer Token" : "API Key"}
                  </label>
                  <input
                    type="password"
                    id="authToken"
                    name="authToken"
                    value={authToken}
                    onChange={(e) => setAuthToken(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    placeholder={
                      authToken
                        ? "Enter new token to update"
                        : authType === "bearer"
                          ? "Enter bearer token"
                          : "Enter API key"
                    }
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Leave blank to keep existing token
                  </p>
                </div>
              )}

              {authType === "apikey" && (
                <div>
                  <label
                    htmlFor="authHeaderName"
                    className="block text-sm text-black mb-2"
                  >
                    API Key Header Name
                  </label>
                  <input
                    type="text"
                    id="authHeaderName"
                    name="authHeaderName"
                    value={authHeaderName}
                    onChange={(e) => setAuthHeaderName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    placeholder="X-API-Key"
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <Switch
                  id="toolsSyncEnabled"
                  checked={toolsSyncEnabled}
                  onChange={(checked) => setToolsSyncEnabled(checked)}
                  size="small"
                  style={{
                    backgroundColor: toolsSyncEnabled ? "#000000" : undefined,
                  }}
                />
                <label
                  htmlFor="toolsSyncEnabled"
                  className="text-sm text-black"
                >
                  Enable tool discovery
                </label>
              </div>
            </div>
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
