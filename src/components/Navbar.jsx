import { Link } from "react-router-dom";
import { Activity, Eye } from "react-feather";

function Navbar() {
  return (
    <nav className="border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Eye size={20} className="text-black" />
            <span className="text-lg font-medium text-black">MCPmon</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-sm text-black hover:text-gray-600 transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm text-white bg-black hover:bg-gray-800 transition-colors rounded-md"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
