import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Activity,
  Bell,
  BarChart2,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "react-feather";
import { Tooltip } from "antd";
import { useSubscribeMutation } from "../../api/apiSlice";

function Landing() {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const [subscribe, { isLoading }] = useSubscribeMutation();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        const response = await subscribe(email).unwrap();
        setSubscribeStatus(response.message || "Thanks for subscribing!");
        setIsError(false);
        setEmail("");
      } catch (error) {
        setSubscribeStatus(
          error?.data?.message || "Failed to subscribe. Please try again.",
        );
        setIsError(true);
      }
    }
  };

  // Placeholder monitor data
  const exampleMonitors = [
    {
      id: 1,
      name: "Production API",
      url: "https://api.example.com",
      status: "online",
      uptime: 99.98,
      checks: 1247,
      avgResponse: 145,
    },
    {
      id: 2,
      name: "Staging Server",
      url: "https://staging.example.com",
      status: "online",
      uptime: 99.85,
      checks: 892,
      avgResponse: 203,
    },
    {
      id: 3,
      name: "MCP Gateway",
      url: "https://mcp.example.com",
      status: "down",
      uptime: 93.24,
      checks: 2104,
      avgResponse: 98,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-200 text-green-800";
      case "down":
        return "bg-red-200 text-red-800";
      case "paused":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="min-h-screen overflow-auto flex items-center justify-center bg-white px-4 md:px-6 py-8">
      <div className="max-w-5xl w-full">
        {/* Hero and Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-12 md:mb-8 items-center">
          {/* Hero Text */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 md:mb-6 leading-tight">
              Dead Simple Monitoring for MCP Servers
            </h1>
            <p className="text-sm md:text-md text-gray-600 mb-6 md:mb-8">
              Uptime monitoring built for remote MCP servers. Keep your AI
              integrations reliable. Free to use while in beta.
            </p>
            <div className="flex items-center gap-2 mb-8">
              <Link
                to="/signup"
                className="px-6 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 transition-colors rounded-lg"
              >
                Start Monitoring
              </Link>
              <Link
                to="/documentation"
                className="px-6 py-2 text-sm font-medium text-black border border-gray-300 hover:bg-gray-50 transition-colors rounded-lg"
              >
                Read Docs
              </Link>
            </div>
            {/* How it Works - Compact */}
            <div className="w-full">
              <div className="flex items-center justify-start gap-6 text-center">
                <div className="">
                  <div className="w-8 h-8 bg-white text-black border border-gray-200 rounded-lg flex items-center justify-center font-semibold text-sm mx-auto mb-2">
                    1
                  </div>
                  <p className="text-xs text-gray-600">Create account</p>
                </div>
                <div className="text-gray-600">→</div>
                <div className="">
                  <div className="w-8 h-8 bg-white text-black border border-gray-200 rounded-lg flex items-center justify-center font-semibold text-sm mx-auto mb-2">
                    2
                  </div>
                  <p className="text-xs text-gray-600">Add MCP server</p>
                </div>
                <div className="text-gray-600">→</div>
                <div className="">
                  <div className="w-8 h-8 bg-white text-black border border-gray-200 rounded-lg flex items-center justify-center font-semibold text-sm mx-auto mb-2">
                    3
                  </div>
                  <p className="text-xs text-gray-600">Monitoring begins</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <Activity className="text-black" size={20} />
                </div>
                <h3 className="text-sm font-semibold text-black mb-1">
                  Real-time Monitoring
                </h3>
                <p className="text-xs text-gray-600">
                  24/7 automated health checks
                </p>
              </div>

              <div className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <Bell className="text-black" size={20} />
                </div>
                <h3 className="text-sm font-semibold text-black mb-1">
                  Instant Alerts
                </h3>
                <p className="text-xs text-gray-600">
                  Email, SMS, or webhook notifications
                </p>
              </div>

              <div className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <BarChart2 className="text-black" size={20} />
                </div>
                <h3 className="text-sm font-semibold text-black mb-1">
                  Performance Insights
                </h3>
                <p className="text-xs text-gray-600">
                  Track uptime and response times
                </p>
              </div>

              <div className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <Globe className="text-black" size={20} />
                </div>
                <h3 className="text-sm font-semibold text-black mb-1">
                  Status Pages
                </h3>
                <p className="text-xs text-gray-600">
                  Share status with your users
                </p>
              </div>
            </div>
            {/* Subscribe Section */}
            <div className="w-full mx-auto">
              <form onSubmit={handleSubscribe}>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email to subscribe"
                    required
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 transition-colors rounded-lg whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
                {subscribeStatus && (
                  <p
                    className={`mt-2 text-xs ${isError ? "text-red-600" : "text-green-600"}`}
                  >
                    {subscribeStatus}
                  </p>
                )}
              </form>
              <p className="text-xs text-gray-500 mt-1">
                Stay updated with the latest news, we respect your privacy.
              </p>
            </div>
          </div>
        </div>

        {/* Example Monitors Section */}
        <div className="mt-20">
          <h2 className="text-lg font-medium text-black text-center">
            See monitors at a glance
          </h2>
          <p className="text-sm text-gray-600 mb-8 text-center">
            Instant visibility into your MCP server status, uptime, and
            performance
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleMonitors.map((monitor) => (
              <div
                key={monitor.id}
                className="border border-gray-200 rounded-lg p-4 bg-white hover:border-gray-300 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <Tooltip
                    title={
                      monitor.status.charAt(0).toUpperCase() +
                      monitor.status.slice(1)
                    }
                    color="#000000"
                  >
                    <span
                      className={`w-3 h-3 rounded-full cursor-pointer ${getStatusColor(monitor.status)}`}
                    ></span>
                  </Tooltip>
                </div>

                <h3 className="text-base font-medium text-black mb-1">
                  {monitor.name}
                </h3>
                <p
                  className="text-xs text-gray-600 mb-3 truncate"
                  title={monitor.url}
                >
                  {monitor.url}
                </p>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Uptime</span>
                    <span className="font-medium text-black">
                      {monitor.uptime.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Checks</span>
                    <span className="font-medium text-black">
                      {monitor.checks}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Avg Response</span>
                    <span className="font-medium text-black">
                      {monitor.avgResponse}ms
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Browser Mockup Section */}
        <div className="mt-20">
          <h2 className="text-lg font-medium text-black text-center">
            Public status pages
          </h2>
          <p className="text-sm text-gray-600 mb-8 text-center">
            Give users confidence on the status of your servers
          </p>
          <div className="max-w-3xl mx-auto">
            {/* Browser Frame */}
            <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg bg-white">
              {/* Browser Chrome */}
              <div className="bg-gray-50 border-b border-gray-300 px-4 py-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs text-gray-600 font-mono">
                  mcpmon.io/m/abc123xyz
                </div>
              </div>

              {/* Mock Status Page Content */}
              <div className="bg-white p-8">
                <div className="max-w-xl mx-auto">
                  {/* Status Badge */}
                  <div className="flex justify-center mb-6">
                    <Tooltip title="Online" color="#000000">
                      <span className="w-4 h-4 rounded-full cursor-pointer bg-green-200"></span>
                    </Tooltip>
                  </div>

                  {/* Monitor Name */}
                  <h1 className="text-2xl font-medium text-black text-center mb-2">
                    Production API
                  </h1>
                  <p className="text-sm text-gray-600 mb-1 text-center">
                    MCP server to access the production API of our services
                  </p>

                  {/* URL */}
                  <div className="text-center mb-6">
                    <span className="text-sm text-blue-600 break-all">
                      https://api.example.com
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3 border-t border-gray-200 pt-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Uptime</span>
                      <span className="font-medium text-black">99.98%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Total Checks</span>
                      <span className="font-medium text-black">1,247</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">
                        Average Response Time
                      </span>
                      <span className="font-medium text-black">145ms</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Last Checked</span>
                      <span className="font-medium text-black">
                        2 minutes ago
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Monitoring Since</span>
                      <span className="font-medium text-black">
                        Jan 15, 2025
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 mb-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <h2 className="text-xl font-medium text-black mb-4">
              Building for the MCP Community
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed">
              MCPmon is free while we build and refine based on user feedback.
              We're focused on creating simple, reliable monitoring tools
              specifically for remote MCP servers. Help us build what you need
              by sharing your thoughts and feature requests.
            </p>
            <Link
              to="/contact"
              className="inline-block px-6 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 transition-colors rounded-lg"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
