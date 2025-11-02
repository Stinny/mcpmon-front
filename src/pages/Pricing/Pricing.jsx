import { Link } from "react-router-dom";
import { TbDeviceHeartMonitor } from "react-icons/tb";
import { Check } from "react-feather";

function Pricing() {
  const features = [
    "Unlimited monitors",
    "Email & SMS alerts",
    "Status pages",
    "60 second monitoring intervals",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-center space-x-0 mb-12"
        >
          <TbDeviceHeartMonitor size={20} className="text-black" />
          <span className="text-lg font-medium text-black">MCPmon</span>
        </Link>

        {/* Pricing Card */}
        <div className="border border-gray-200 rounded-lg p-8 text-center">
          <h1 className="text-2xl font-normal text-black mb-2">Pricing</h1>
          <p className="text-sm text-gray-500 mb-8">
            Simple, transparent pricing
          </p>

          {/* Price Badge */}
          <div className="mb-8">
            <div className="inline-block px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
              Beta
            </div>
            <div className="text-4xl font-normal text-black mb-2">TBA</div>
            <p className="text-sm text-gray-500">per month</p>
          </div>

          {/* Features List */}
          <div className="space-y-3 mb-8 text-left">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check size={16} className="text-black flex-shrink-0" />
                <span className="text-sm text-black">{feature}</span>
              </div>
            ))}
          </div>

          {/* TBA Notice */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-600">
              <span className="font-medium text-black">Pricing: TBA</span>
              <br />
              MCPmon is currently free to use while we onboard early users.
              Enjoy unlimited monitoring with no charge.
            </p>
          </div>

          {/* CTA Button */}
          <Link
            to="/signup"
            className="block w-full px-6 py-2.5 bg-black text-white text-sm hover:bg-gray-800 transition-colors rounded-md text-center"
          >
            Get Started Free
          </Link>

          <p className="text-xs text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-black hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
