import { Link } from "react-router-dom";
import { LogIn, Menu, X } from "react-feather";
import { TbDeviceHeartMonitor } from "react-icons/tb";
import { useState } from "react";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="pt-4 px-4 md:px-6 bg-white mb-12 md:mb-20">
      <nav className="max-w-5xl mx-auto border border-gray-200 bg-white rounded-lg shadow-sm">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-0">
              <TbDeviceHeartMonitor size={20} className="text-black" />
              <span className="text-lg font-medium text-black">MCPmon</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/documentation"
                className="text-sm text-black hover:text-gray-600 transition-colors"
              >
                Docs
              </Link>
              <Link
                to="/pricing"
                className="text-sm text-black hover:text-gray-600 transition-colors"
              >
                Pricing
              </Link>
              <Link
                to="/contact"
                className="text-sm text-black hover:text-gray-600 transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/login"
                className="px-2 py-2 text-sm text-black border border-gray-300 hover:bg-gray-50 transition-colors rounded-md flex items-center space-x-2"
              >
                <LogIn size={16} />
                <span>Log in</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-black hover:bg-gray-50 rounded-md"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              <div className="flex flex-col space-y-3">
                <Link
                  to="/documentation"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-black hover:text-gray-600 transition-colors py-2"
                >
                  Docs
                </Link>
                <Link
                  to="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-black hover:text-gray-600 transition-colors py-2"
                >
                  Pricing
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-black hover:text-gray-600 transition-colors py-2"
                >
                  Contact
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm text-black border border-gray-300 hover:bg-gray-50 transition-colors rounded-md flex items-center justify-center space-x-2"
                >
                  <LogIn size={16} />
                  <span>Log in</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
