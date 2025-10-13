import { Link } from "react-router-dom";
import { LogIn } from "react-feather";
import { TbDeviceHeartMonitor } from "react-icons/tb";

function Navbar() {
  return (
    <div className="pt-4 px-6 bg-white">
      <nav className="max-w-6xl mx-auto border border-gray-200 bg-white rounded-lg shadow-sm">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-0">
              <TbDeviceHeartMonitor size={20} className="text-black" />
              <span className="text-lg font-medium text-black">MCPmon</span>
            </Link>

            <div className="flex items-center space-x-6">
              <Link
                to="/documentation"
                className="text-sm text-black hover:text-gray-600 transition-colors"
              >
                Documentation
              </Link>
              <Link
                to="/pricing"
                className="text-sm text-black hover:text-gray-600 transition-colors"
              >
                Pricing
              </Link>
            </div>

            <div className="flex items-center space-x-6">
              <Link
                to="/login"
                className="px-4 py-2 text-sm text-black border border-gray-300 hover:bg-gray-50 transition-colors rounded-md flex items-center space-x-2"
              >
                <LogIn size={16} />
                <span>Log in</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
