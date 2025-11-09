import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { TbDeviceHeartMonitor } from "react-icons/tb";
import { Activity, Bell, BarChart2, Globe, ChevronRight } from "react-feather";
import { useSubscribeMutation } from "./api/apiSlice";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Landing from "./pages/Landing";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import OAuthCallback from "./pages/OAuthCallback/OAuthCallback";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Pricing from "./pages/Pricing/Pricing";
import Monitors from "./pages/Monitors/Monitors";
import AddMonitor from "./pages/Monitors/AddMonitor";
import EditMonitor from "./pages/Monitors/EditMonitor";
import Settings from "./pages/Settings/Settings";
import Feedback from "./pages/Feedback/Feedback";
import Documentation from "./pages/Documentation";
import Contact from "./pages/Contact/Contact";
import MonitorStatus from "./pages/MonitorStatus/MonitorStatus";
import { selectIsAuthenticated } from "./features/authSlice";

function MobilePlaceholder() {
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
      url: "https://api.example.com/mcp",
      status: "online",
      uptime: 99.98,
      checks: 1247,
      avgResponse: 145,
    },
    {
      id: 2,
      name: "Staging Server",
      url: "https://staging.example.com/mcp",
      status: "online",
      uptime: 99.85,
      checks: 892,
      avgResponse: 203,
    },
    {
      id: 3,
      name: "MCP Gateway",
      url: "https://mcp.example.com/mcp",
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

  const formatResponseTime = (ms) => {
    if (ms >= 1000) {
      return `${(ms / 1000).toFixed(2)}s`;
    }
    return `${ms}ms`;
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12 overflow-auto">
      <div className="max-w-md mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <TbDeviceHeartMonitor size={20} className="text-black" />
          <span className="text-lg font-medium text-black">MCPmon</span>
        </div>

        {/* Hero */}
        <div className="text-left mb-8">
          <h1 className="text-3xl font-bold text-black mb-4 leading-tight">
            Dead Simple Monitoring for MCP Servers
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Uptime monitoring built for remote MCP servers. Keep your AI
            integrations reliable. Free to use while in beta.
          </p>
        </div>

        {/* Mobile Notice */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center mb-8">
          <p className="text-sm text-gray-600 mb-2">
            Full mobile experience coming soon
          </p>
          <p className="text-xs text-gray-500">
            For now, please visit on desktop to create an account and start
            monitoring your MCP servers
          </p>
        </div>

        {/* How it Works - Compact */}
        <div className="mb-12">
          <div className="flex items-center justify-between text-center">
            <div>
              <div className="w-8 h-8 bg-white text-black border border-gray-200 rounded-lg flex items-center justify-center font-semibold text-sm mx-auto mb-2">
                1
              </div>
              <p className="text-xs text-gray-600">Create account</p>
            </div>
            <div className="text-gray-600">→</div>
            <div>
              <div className="w-8 h-8 bg-white text-black border border-gray-200 rounded-lg flex items-center justify-center font-semibold text-sm mx-auto mb-2">
                2
              </div>
              <p className="text-xs text-gray-600">Add first monitor</p>
            </div>
            <div className="text-gray-600">→</div>
            <div>
              <div className="w-8 h-8 bg-white text-black border border-gray-200 rounded-lg flex items-center justify-center font-semibold text-sm mx-auto mb-2">
                3
              </div>
              <p className="text-xs text-gray-600">Monitoring begins</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <div className="grid grid-cols-2 gap-2">
            <div className="border border-gray-200 rounded-lg p-3">
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

            <div className="border border-gray-200 rounded-lg p-3">
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

            <div className="border border-gray-200 rounded-lg p-3">
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

            <div className="border border-gray-200 rounded-lg p-3">
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
        </div>

        {/* Subscribe Section */}
        <div className="mb-12">
          <form onSubmit={handleSubscribe}>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email to subscribe"
                required
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
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

        {/* Example Monitors Section */}
        <div className="mb-12">
          <h2 className="text-xl font-medium text-black mb-2 text-left">
            See monitors at a glance
          </h2>
          <p className="text-sm text-gray-600 mb-6 text-left">
            Instant visibility into your MCP server status, uptime, and
            performance
          </p>
          <div className="space-y-3">
            {exampleMonitors.map((monitor) => (
              <div
                key={monitor.id}
                className="border border-gray-200 rounded-lg p-4 bg-white"
              >
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`w-5 h-3 rounded-full ${getStatusColor(monitor.status)}`}
                  ></span>
                </div>

                <h3 className="text-base font-medium text-black mb-1">
                  {monitor.name}
                </h3>
                <p className="text-xs text-black mb-3 truncate">
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
                      {formatResponseTime(monitor.avgResponse)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-black mb-3">
            Real-time Performance Metrics
          </h2>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Monitor your MCP server's health at a glance. Track uptime
            percentages, response times, and check history with an easy-to-read
            stats dashboard.
          </p>

          {/* Browser Mockup - Stats View */}
          <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white mb-4">
            {/* Browser Chrome */}
            <div className="bg-gray-50 border-b border-gray-300 px-3 py-2">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
              </div>
              <div className="bg-white border border-gray-300 rounded-md px-2 py-1 text-xs text-gray-600 font-mono">
                mcpmon.io/m/abc123
              </div>
            </div>

            {/* Stats Example */}
            <div className="bg-white p-4">
              <div className="mb-3">
                <span className="w-4 h-2.5 rounded-full inline-block bg-green-200 mb-2"></span>
                <h3 className="text-base font-medium text-black mb-1">
                  Production API Server
                </h3>
                <p className="text-xs text-gray-600 mb-1">
                  MCP server for production services
                </p>
                <p className="text-xs text-gray-600">
                  https://api.example.com/mcp
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="border border-gray-200 rounded p-2">
                  <div className="text-xs text-gray-600">Uptime</div>
                  <div className="text-sm font-medium text-black">99.98%</div>
                </div>
                <div className="border border-gray-200 rounded p-2">
                  <div className="text-xs text-gray-600">Checks</div>
                  <div className="text-sm font-medium text-black">1,247</div>
                </div>
                <div className="border border-gray-200 rounded p-2">
                  <div className="text-xs text-gray-600">Response</div>
                  <div className="text-sm font-medium text-black">145ms</div>
                </div>
                <div className="border border-gray-200 rounded p-2">
                  <div className="text-xs text-gray-600">Tools</div>
                  <div className="text-sm font-medium text-black">6</div>
                </div>
              </div>

              <div className="border border-gray-200 rounded p-2">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-gray-600">Last Checked</span>
                  <span className="font-medium text-black">
                    Today at 2:45 PM
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">Monitoring Since</span>
                  <span className="font-medium text-black">
                    Jan 15 at 9:30 AM
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            Share public status pages with your users to keep them informed
            about your server's availability and performance.
          </p>
        </div>

        {/* Tools Discovery Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-black mb-3">
            Discover Available Tools
          </h2>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Get complete visibility into your MCP server's capabilities. The
            tools view automatically discovers and displays all available tools
            exposed by your server.
          </p>

          {/* Browser Mockup - Tools View */}
          <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white mb-4">
            {/* Browser Chrome */}
            <div className="bg-gray-50 border-b border-gray-300 px-3 py-2">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
              </div>
              <div className="bg-white border border-gray-300 rounded-md px-2 py-1 text-xs text-gray-600 font-mono">
                mcpmon.io/m/abc123
              </div>
            </div>

            {/* Tools Example */}
            <div className="bg-white p-4">
              <div className="mb-3">
                <h3 className="text-sm font-medium text-black">
                  6 Tools Discovered
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="border border-gray-200 rounded p-2">
                  <h4 className="text-xs font-medium text-black truncate">
                    search_code
                  </h4>
                </div>
                <div className="border border-gray-200 rounded p-2">
                  <h4 className="text-xs font-medium text-black truncate">
                    read_file
                  </h4>
                </div>
                <div className="border border-gray-200 rounded p-2">
                  <h4 className="text-xs font-medium text-black truncate">
                    list_directory
                  </h4>
                </div>
                <div className="border border-gray-200 rounded p-2">
                  <h4 className="text-xs font-medium text-black truncate">
                    execute_command
                  </h4>
                </div>
                <div className="border border-gray-200 rounded p-2">
                  <h4 className="text-xs font-medium text-black truncate">
                    create_file
                  </h4>
                </div>
                <div className="border border-gray-200 rounded p-2">
                  <h4 className="text-xs font-medium text-black truncate">
                    update_file
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            Perfect for documentation and helping users understand what your MCP
            server can do. Each tool can be clicked to view detailed
            information.
          </p>
        </div>

        {/* CTA Section */}
        <div className="mb-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <h2 className="text-lg font-medium text-black mb-3">
              Building for the MCP Community
            </h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              MCPmon is free while we build and refine based on user feedback.
              We're focused on creating simple, reliable monitoring tools
              specifically for remote MCP servers.
            </p>
            <p className="text-xs text-gray-500">
              Building for the MCP community
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Show sidebar on protected routes when authenticated
  const protectedRoutes = ["/home", "/monitors", "/settings", "/feedback"];
  const showSidebar =
    isAuthenticated &&
    protectedRoutes.some(
      (route) =>
        location.pathname === route ||
        location.pathname.startsWith(route + "/"),
    );

  // Hide navbar on login/signup/pricing/documentation/contact pages and monitor status pages
  const authRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/pricing",
    "/documentation",
    "/contact",
  ];
  const hideNavbarRoutes = authRoutes.concat(["/verify-email", "/auth", "/m"]);
  const showNavbar =
    !showSidebar &&
    !hideNavbarRoutes.some(
      (route) =>
        location.pathname === route ||
        location.pathname.startsWith(route + "/"),
    );

  return (
    <div className="min-h-screen bg-white font-sans">
      {showNavbar && <Navbar />}
      {showSidebar && <Sidebar />}
      <main className={showSidebar ? "ml-64" : ""}>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Landing />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />
          <Route path="/auth/callback" element={<OAuthCallback />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/m/:monitorId" element={<MonitorStatus />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/monitors"
            element={
              <ProtectedRoute>
                <Monitors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/monitors/add"
            element={
              <ProtectedRoute>
                <AddMonitor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/monitors/edit/:id"
            element={
              <ProtectedRoute>
                <EditMonitor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <ProtectedRoute>
                <Feedback />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return <Router>{isMobile ? <MobilePlaceholder /> : <AppContent />}</Router>;
}

export default App;
