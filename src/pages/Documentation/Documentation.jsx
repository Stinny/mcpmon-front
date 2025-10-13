import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Monitor,
  Bell,
  Activity,
  Settings,
  Lock,
  Code,
  Zap,
  CheckCircle,
  ExternalLink,
} from "react-feather";
import { TbDeviceHeartMonitor } from "react-icons/tb";

function Documentation() {
  const [activeSection, setActiveSection] = useState("introduction");

  const sections = [
    { id: "introduction", label: "Introduction", icon: Activity },
    { id: "getting-started", label: "Getting Started", icon: Zap },
    { id: "monitors", label: "Monitors", icon: Monitor },
    { id: "authentication", label: "Authentication", icon: Lock },
    { id: "alerts", label: "Alerts & Notifications", icon: Bell },
    { id: "api", label: "API Reference", icon: Code },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex gap-12">
          {/* Sidebar Navigation */}
          <aside className="w-64 flex-shrink-0 sticky top-12 h-fit">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-0 mb-8">
              <TbDeviceHeartMonitor size={20} className="text-black" />
              <span className="text-lg font-medium text-black">MCPmon</span>
            </Link>

            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
              Documentation
            </h2>
            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeSection === section.id
                        ? "bg-black text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={16} />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-3xl">
            {/* Introduction */}
            {activeSection === "introduction" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-black mb-4">
                    Welcome to MCPmon
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    MCPmon is a powerful monitoring solution for remote Model
                    Context Protocol (MCP) servers. Track uptime, monitor
                    performance, and receive instant alerts when issues arise.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <h3 className="text-lg font-semibold text-black mb-3">
                    What is MCP?
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    The Model Context Protocol (MCP) is an open standard that
                    enables AI models to securely connect to external data
                    sources and tools. MCP servers expose resources, tools, and
                    prompts that AI applications can discover and interact with.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    MCPmon helps you ensure your MCP servers are always
                    available and performing optimally.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">
                    Key Features
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle
                          size={20}
                          className="text-black flex-shrink-0 mt-0.5"
                        />
                        <div>
                          <h4 className="font-medium text-black mb-1">
                            Real-time Monitoring
                          </h4>
                          <p className="text-sm text-gray-600">
                            60-second health checks with instant status updates
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle
                          size={20}
                          className="text-black flex-shrink-0 mt-0.5"
                        />
                        <div>
                          <h4 className="font-medium text-black mb-1">
                            Flexible Authentication
                          </h4>
                          <p className="text-sm text-gray-600">
                            Support for API keys, Bearer tokens, and custom
                            headers
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle
                          size={20}
                          className="text-black flex-shrink-0 mt-0.5"
                        />
                        <div>
                          <h4 className="font-medium text-black mb-1">
                            Multi-channel Alerts
                          </h4>
                          <p className="text-sm text-gray-600">
                            Email and SMS notifications for downtime events
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle
                          size={20}
                          className="text-black flex-shrink-0 mt-0.5"
                        />
                        <div>
                          <h4 className="font-medium text-black mb-1">
                            Response Time Tracking
                          </h4>
                          <p className="text-sm text-gray-600">
                            Monitor performance and identify slowdowns
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Getting Started */}
            {activeSection === "getting-started" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-black mb-4">
                    Getting Started
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Start monitoring your MCP servers in just a few minutes.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="border-l-4 border-black pl-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        1
                      </div>
                      <h3 className="text-xl font-semibold text-black">
                        Create Your Account
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-3">
                      Sign up for a free MCPmon account. No credit card
                      required.
                    </p>
                    <Link
                      to="/signup"
                      className="inline-flex items-center gap-2 text-sm text-black hover:underline"
                    >
                      Create account →
                    </Link>
                  </div>

                  <div className="border-l-4 border-black pl-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        2
                      </div>
                      <h3 className="text-xl font-semibold text-black">
                        Add Your First Monitor
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-3">
                      Navigate to the Monitors page and click "Add Monitor".
                      Enter your MCP server URL and configure authentication if
                      needed.
                    </p>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-sm font-medium text-black mb-2">
                        Example:
                      </p>
                      <code className="text-sm text-gray-700">
                        https://your-mcp-server.com/sse
                      </code>
                    </div>
                  </div>

                  <div className="border-l-4 border-black pl-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        3
                      </div>
                      <h3 className="text-xl font-semibold text-black">
                        Configure Alerts
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Go to Settings to enable email or SMS notifications.
                      You'll be alerted immediately when your servers go down or
                      recover.
                    </p>
                  </div>

                  <div className="border-l-4 border-black pl-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        4
                      </div>
                      <h3 className="text-xl font-semibold text-black">
                        Monitor & Relax
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Your monitors will check your servers every 60 seconds.
                      View real-time status, uptime percentages, and response
                      times from your dashboard.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Monitors */}
            {activeSection === "monitors" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-black mb-4">
                    Monitors
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Configure and manage your MCP server monitors.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">
                    Creating a Monitor
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Each monitor tracks a single MCP server endpoint. You can
                    create unlimited monitors to track all your servers.
                  </p>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-black mb-2">
                        Monitor Name
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        A friendly name to identify your monitor (e.g.,
                        "Production MCP Server", "Development Environment").
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-black mb-2">
                        Server URL
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        The full URL to your MCP server endpoint. MCPmon
                        supports both HTTP/HTTPS and SSE (Server-Sent Events)
                        connections.
                      </p>
                      <div className="bg-gray-50 border border-gray-200 rounded p-3 mt-2">
                        <p className="text-xs font-medium text-black mb-1">
                          Supported formats:
                        </p>
                        <code className="text-xs text-gray-700 block">
                          https://mcp.example.com/sse
                        </code>
                        <code className="text-xs text-gray-700 block">
                          http://localhost:3000/mcp
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">
                    Monitor Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-black mb-1">
                          UP (Online)
                        </h4>
                        <p className="text-sm text-gray-600">
                          Server is responding normally and passing health
                          checks
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full mt-1 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-black mb-1">
                          DOWN (Offline)
                        </h4>
                        <p className="text-sm text-gray-600">
                          Server is unreachable or failing health checks
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 border border-gray-200 rounded-lg p-4">
                      <div className="w-3 h-3 bg-gray-400 rounded-full mt-1 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-black mb-1">PAUSED</h4>
                        <p className="text-sm text-gray-600">
                          Monitoring is temporarily disabled for this server
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">
                    Monitoring Intervals
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    MCPmon checks your servers every 60 seconds. Each check
                    includes:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="text-black mt-1 flex-shrink-0"
                      />
                      <span className="text-gray-600">
                        Connection validation to the server endpoint
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="text-black mt-1 flex-shrink-0"
                      />
                      <span className="text-gray-600">
                        Response time measurement
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="text-black mt-1 flex-shrink-0"
                      />
                      <span className="text-gray-600">
                        JSON-RPC 2.0 protocol validation
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="text-black mt-1 flex-shrink-0"
                      />
                      <span className="text-gray-600">
                        Authentication verification (if configured)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Authentication */}
            {activeSection === "authentication" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-black mb-4">
                    Authentication
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Secure your monitors with flexible authentication options.
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Security Note:</strong> All authentication
                    credentials are encrypted using AES-256-CBC before being
                    stored in our database.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-black mb-3">
                      None
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-3">
                      No authentication required. Use this for public MCP
                      servers or servers on private networks.
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-black mb-3">
                      API Key
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-3">
                      Add a custom API key header to your requests. You specify
                      both the header name and key value.
                    </p>
                    <div className="bg-gray-50 border border-gray-200 rounded p-3">
                      <p className="text-xs font-medium text-black mb-1">
                        Example:
                      </p>
                      <code className="text-xs text-gray-700 block">
                        X-API-Key: your-secret-key-here
                      </code>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-black mb-3">
                      Bearer Token
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-3">
                      Use OAuth 2.0 Bearer token authentication. MCPmon will add
                      the token to the Authorization header.
                    </p>
                    <div className="bg-gray-50 border border-gray-200 rounded p-3">
                      <p className="text-xs font-medium text-black mb-1">
                        Example:
                      </p>
                      <code className="text-xs text-gray-700 block">
                        Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
                      </code>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-black mb-3">
                      Custom Headers
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-3">
                      Add multiple custom headers to your requests. Useful for
                      complex authentication schemes or additional metadata.
                    </p>
                    <div className="bg-gray-50 border border-gray-200 rounded p-3">
                      <p className="text-xs font-medium text-black mb-1">
                        Example:
                      </p>
                      <code className="text-xs text-gray-700 block">
                        X-Service-ID: prod-mcp-001
                      </code>
                      <code className="text-xs text-gray-700 block">
                        X-Environment: production
                      </code>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">
                    Updating Authentication
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    You can update authentication settings at any time from the
                    monitor edit page. For security, existing credentials are
                    masked and must be re-entered to update.
                  </p>
                </div>
              </div>
            )}

            {/* Alerts */}
            {activeSection === "alerts" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-black mb-4">
                    Alerts & Notifications
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Stay informed about your server status with real-time
                    alerts.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">
                    Alert Channels
                  </h3>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start gap-3">
                        <Bell size={20} className="text-black mt-1" />
                        <div>
                          <h4 className="font-medium text-black mb-2">
                            Email Alerts
                          </h4>
                          <p className="text-gray-600 leading-relaxed mb-3">
                            Receive email notifications when your monitors go
                            down or recover. Configure from Settings → Alerts.
                          </p>
                          <div className="bg-gray-50 border border-gray-200 rounded p-3">
                            <p className="text-xs text-gray-600">
                              You'll receive an email immediately when a server
                              goes down, and another when it recovers.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start gap-3">
                        <Bell size={20} className="text-black mt-1" />
                        <div>
                          <h4 className="font-medium text-black mb-2">
                            SMS Alerts
                          </h4>
                          <p className="text-gray-600 leading-relaxed mb-3">
                            Get instant text messages for critical downtime
                            events. Add your phone number in Settings to enable
                            SMS alerts.
                          </p>
                          <div className="bg-gray-50 border border-gray-200 rounded p-3">
                            <p className="text-xs text-gray-600">
                              SMS alerts are sent for server downtime only to
                              avoid excessive messaging.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">
                    When Alerts are Sent
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-black mb-1">
                          Server Down
                        </h4>
                        <p className="text-sm text-gray-600">
                          Sent immediately when a monitor fails its health check
                          after retry attempts
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-black mb-1">
                          Server Recovered
                        </h4>
                        <p className="text-sm text-gray-600">
                          Sent when a previously down monitor successfully
                          passes its health check
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">
                    Managing Alert Preferences
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Control your notification settings from the Settings page:
                  </p>
                  <ol className="space-y-2 list-decimal list-inside text-gray-600">
                    <li>Navigate to Settings from the sidebar</li>
                    <li>Find the Alerts section</li>
                    <li>Click Edit to modify your preferences</li>
                    <li>Toggle Email or SMS alerts on/off</li>
                    <li>Click Save to apply changes</li>
                  </ol>
                </div>
              </div>
            )}

            {/* API Reference */}
            {activeSection === "api" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-black mb-4">
                    API Reference
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Programmatic access to your monitors and data.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Coming Soon:</strong> The MCPmon API is currently in
                    development. Full API documentation will be available when
                    the API launches.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">
                    Planned Endpoints
                  </h3>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <code className="text-sm font-medium text-black">
                        GET /api/monitors
                      </code>
                      <p className="text-sm text-gray-600 mt-2">
                        List all monitors for your account
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <code className="text-sm font-medium text-black">
                        GET /api/monitors/:id
                      </code>
                      <p className="text-sm text-gray-600 mt-2">
                        Get details for a specific monitor
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <code className="text-sm font-medium text-black">
                        POST /api/monitors
                      </code>
                      <p className="text-sm text-gray-600 mt-2">
                        Create a new monitor
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <code className="text-sm font-medium text-black">
                        GET /api/monitors/:id/stats
                      </code>
                      <p className="text-sm text-gray-600 mt-2">
                        Get uptime statistics and historical data
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Help */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-black mb-4">
                Need Help?
              </h3>
              <p className="text-gray-600 mb-4">
                Can't find what you're looking for? We're here to help.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/support"
                  className="px-4 py-2 text-sm border border-gray-300 text-black hover:bg-gray-50 transition-colors rounded-md"
                >
                  Contact Support
                </Link>
                <a
                  href="https://modelcontextprotocol.io/docs/getting-started/intro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 text-black hover:bg-gray-50 transition-colors rounded-md"
                >
                  MCP Specification
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Documentation;
