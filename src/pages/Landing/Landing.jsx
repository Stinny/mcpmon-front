import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-black mb-6">
          Monitor your MCP servers with confidence
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          MCPmon keeps your Model Context Protocol servers online with reliable
          uptime monitoring and instant alerts
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Link
            to="/signup"
            className="px-6 py-3 text-base text-white bg-black hover:bg-gray-800 transition-colors rounded-md"
          >
            Get Started
          </Link>
          <Link
            to="/documentation"
            className="px-6 py-3 text-base text-black border border-gray-300 hover:bg-gray-50 transition-colors rounded-md"
          >
            Learn more
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-20">
        <div className="text-center">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-lg font-semibold text-black mb-2">
            Real-time monitoring
          </h3>
          <p className="text-gray-600">
            Get instant alerts when your MCP servers go down
          </p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-black mb-2">
            Simple dashboard
          </h3>
          <p className="text-gray-600">
            Track uptime and performance at a glance
          </p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-4">💰</div>
          <h3 className="text-lg font-semibold text-black mb-2">
            Transparent pricing
          </h3>
          <p className="text-gray-600">
            No hidden fees, no surprises - just simple monitoring
          </p>
        </div>
      </div>
    </div>
  );
}

export default Landing;
