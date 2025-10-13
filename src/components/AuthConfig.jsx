import { useState, useEffect } from "react";
import { Plus, X, Edit2 } from "react-feather";

function AuthConfig({ authType, authConfig, onChange, hasExistingAuth = false }) {
  const [config, setConfig] = useState(authConfig || {});
  const [isEditing, setIsEditing] = useState(!hasExistingAuth);

  // Update parent when config changes
  useEffect(() => {
    onChange(config);
  }, [config]);

  // Reset config when auth type changes
  useEffect(() => {
    if (authType === "none") {
      setConfig({});
      setIsEditing(true);
    } else if (authType === "api-key" && !config.headerName) {
      setConfig({ headerName: "X-API-Key", apiKey: "" });
      setIsEditing(!hasExistingAuth);
    } else if (authType === "bearer-token" && !config.token) {
      setConfig({ token: "" });
      setIsEditing(!hasExistingAuth);
    } else if (authType === "custom-headers" && !config.headers) {
      setConfig({ headers: {} });
      setIsEditing(!hasExistingAuth);
    }
  }, [authType]);

  const handleApiKeyChange = (field, value) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleTokenChange = (value) => {
    setConfig({ token: value });
  };

  const handleCustomHeaderAdd = () => {
    setConfig((prev) => ({
      ...prev,
      headers: { ...prev.headers, "": "" },
    }));
  };

  const handleCustomHeaderChange = (oldKey, newKey, value) => {
    setConfig((prev) => {
      const newHeaders = { ...prev.headers };
      if (oldKey !== newKey && oldKey !== "") {
        delete newHeaders[oldKey];
      }
      newHeaders[newKey] = value;
      return { ...prev, headers: newHeaders };
    });
  };

  const handleCustomHeaderRemove = (key) => {
    setConfig((prev) => {
      const newHeaders = { ...prev.headers };
      delete newHeaders[key];
      return { ...prev, headers: newHeaders };
    });
  };

  if (authType === "none" || !authType) {
    return null;
  }

  return (
    <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h3 className="text-sm font-medium text-black">Authentication Configuration</h3>

      {authType === "api-key" && (
        <div className="space-y-4">
          <div>
            <label htmlFor="headerName" className="block text-sm text-black mb-2">
              Header Name
            </label>
            <input
              type="text"
              id="headerName"
              value={config.headerName || "X-API-Key"}
              onChange={(e) => handleApiKeyChange("headerName", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black bg-white"
              placeholder="X-API-Key"
            />
            <p className="mt-1 text-xs text-gray-500">
              Common values: X-API-Key, X-API-Token, api-key
            </p>
          </div>
          <div>
            <label htmlFor="apiKey" className="block text-sm text-black mb-2">
              API Key *
            </label>
            {!isEditing && hasExistingAuth ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value="••••••••••••••••"
                  disabled
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-1 px-3 py-2 text-sm text-black border border-gray-300 hover:bg-gray-50 transition-colors rounded-md"
                >
                  <Edit2 size={14} />
                  Change
                </button>
              </div>
            ) : (
              <input
                type="password"
                id="apiKey"
                value={config.apiKey || ""}
                onChange={(e) => handleApiKeyChange("apiKey", e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black bg-white"
                placeholder="Enter your API key"
              />
            )}
          </div>
        </div>
      )}

      {authType === "bearer-token" && (
        <div>
          <label htmlFor="token" className="block text-sm text-black mb-2">
            Bearer Token *
          </label>
          {!isEditing && hasExistingAuth ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value="••••••••••••••••"
                  disabled
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-1 px-3 py-2 text-sm text-black border border-gray-300 hover:bg-gray-50 transition-colors rounded-md"
                >
                  <Edit2 size={14} />
                  Change
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Existing token is configured. Click "Change" to update it.
              </p>
            </div>
          ) : (
            <>
              <input
                type="password"
                id="token"
                value={config.token || ""}
                onChange={(e) => handleTokenChange(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black bg-white"
                placeholder="Enter your bearer token"
              />
              <p className="mt-1 text-xs text-gray-500">
                Will be sent as: Authorization: Bearer &lt;token&gt;
              </p>
            </>
          )}
        </div>
      )}

      {authType === "custom-headers" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm text-black">Custom Headers</label>
            {isEditing && (
              <button
                type="button"
                onClick={handleCustomHeaderAdd}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs text-black border border-gray-300 hover:bg-gray-100 transition-colors rounded-md"
              >
                <Plus size={14} />
                Add Header
              </button>
            )}
          </div>

          {!isEditing && hasExistingAuth ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-md">
                <span className="flex-1 text-sm text-gray-600">
                  Custom headers are configured
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-1 px-3 py-2 text-sm text-black border border-gray-300 hover:bg-gray-50 bg-white transition-colors rounded-md"
                >
                  <Edit2 size={14} />
                  Change
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Click "Change" to view and update custom headers.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                {config.headers &&
                  Object.entries(config.headers).map(([key, value], index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={key}
                        onChange={(e) =>
                          handleCustomHeaderChange(key, e.target.value, value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black bg-white"
                        placeholder="Header-Name"
                      />
                      <input
                        type="password"
                        value={value}
                        onChange={(e) =>
                          handleCustomHeaderChange(key, key, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black bg-white"
                        placeholder="Header value"
                      />
                      <button
                        type="button"
                        onClick={() => handleCustomHeaderRemove(key)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
              </div>

              {(!config.headers || Object.keys(config.headers).length === 0) && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No custom headers added. Click "Add Header" to add one.
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AuthConfig;
