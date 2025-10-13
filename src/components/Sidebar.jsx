import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Home, Monitor, Settings, LogOut } from "react-feather";
import { TbDeviceHeartMonitor } from "react-icons/tb";
import { logout } from "../features/authSlice";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-200">
        <Link to="/home" className="flex items-center space-x-0">
          <TbDeviceHeartMonitor size={20} className="text-black" />
          <span className="text-lg font-medium text-black">MCPmon</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <Link
          to="/home"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
            isActive("/home")
              ? "bg-black text-white"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          <Home size={20} />
          <span className="text-sm font-medium">Home</span>
        </Link>
        <Link
          to="/monitors"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
            isActive("/monitors")
              ? "bg-black text-white"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          <Monitor size={20} />
          <span className="text-sm font-medium">Monitors</span>
        </Link>
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 px-3 py-4 space-y-1">
        <Link
          to="/settings"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
            isActive("/settings")
              ? "bg-black text-white"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          <Settings size={20} />
          <span className="text-sm font-medium">Settings</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-gray-700 hover:bg-gray-50 w-full"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
