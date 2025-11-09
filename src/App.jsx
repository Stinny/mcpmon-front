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

  return (
    <div className="min-h-screen bg-white px-6 py-12 overflow-auto">
      <div className="max-w-md mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <TbDeviceHeartMonitor size={20} className="text-black" />
          <span className="text-lg font-medium text-black">MCPmon</span>
        </div>

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-black mb-4 leading-tight">
            Dead Simple Monitoring for MCP Servers
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Uptime monitoring built for remote MCP servers. Keep your AI
            integrations reliable. Free to use while in beta.
          </p>
        </div>

        {/* Features */}
        <div className="mb-12">
          <div className="grid grid-cols-2 gap-2">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-3">
                <Activity className="text-black" size={20} />
              </div>
              <h3 className="text-sm font-semibold text-black mb-1">
                Real-time Monitoring
              </h3>
              <p className="text-xs text-gray-600">
                24/7 automated health checks for your MCP servers
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-3">
                <Bell className="text-black" size={20} />
              </div>
              <h3 className="text-sm font-semibold text-black mb-1">
                Instant Alerts
              </h3>
              <p className="text-xs text-gray-600">
                Get notified immediately when servers go down
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-3">
                <BarChart2 className="text-black" size={20} />
              </div>
              <h3 className="text-sm font-semibold text-black mb-1">
                Performance Insights
              </h3>
              <p className="text-xs text-gray-600">
                Track uptime percentages and response times
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-3">
                <Globe className="text-black" size={20} />
              </div>
              <h3 className="text-sm font-semibold text-black mb-1">
                Status Pages
              </h3>
              <p className="text-xs text-gray-600">
                Share public status pages with your users
              </p>
            </div>
          </div>
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

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Building for the MCP community
          </p>
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
