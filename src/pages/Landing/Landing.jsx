import { Link } from "react-router-dom";
import {
  Activity,
  Bell,
  BarChart2,
  Clock,
  CheckCircle,
  Zap,
} from "react-feather";

function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h1 className="text-6xl font-bold text-black mb-6 leading-tight">
          The easiest way to monitor your remote MCP servers
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Keep your remote MCP servers online with reliable uptime monitoring,
          instant alerts, and comprehensive performance tracking
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Link
            to="/signup"
            className="px-8 py-3 text-base font-medium text-white bg-black hover:bg-gray-800 transition-colors rounded-lg"
          >
            Get Started
          </Link>
          <Link
            to="/documentation"
            className="px-8 py-3 text-base font-medium text-black border border-gray-300 hover:bg-gray-50 transition-colors rounded-lg"
          >
            Read Docs
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
              <Activity className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-black mb-3">
              Real-time Monitoring
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Monitor your MCP servers 24/7 with automated health checks every
              minute. Get instant visibility into server status and
              availability.
            </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
              <Bell className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-black mb-3">
              Instant Alerts
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Receive immediate notifications via email, SMS, or webhook when
              your servers go down. Never miss a critical outage again.
            </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
              <BarChart2 className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-black mb-3">
              Performance Insights
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Track uptime percentages, response times, and historical data.
              Analyze trends and optimize your server performance.
            </p>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">
            Start monitoring in minutes
          </h2>
          <p className="text-lg text-gray-600">
            Simple setup, powerful monitoring
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-semibold">
              1
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">
                Create your account
              </h3>
              <p className="text-gray-600">
                Sign up for free and access your monitoring dashboard in
                seconds.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-semibold">
              2
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">
                Add your MCP servers
              </h3>
              <p className="text-gray-600">
                Configure your server endpoints and set your monitoring
                preferences.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-semibold">
              3
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">
                Relax and monitor
              </h3>
              <p className="text-gray-600">
                We'll handle the rest. Get alerts when issues arise and view
                detailed analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-black text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">
            Ready to keep your servers online?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join developers who trust MCPmon for reliable uptime monitoring
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-3 text-base font-medium text-black bg-white hover:bg-gray-100 transition-colors rounded-lg"
          >
            Start Monitoring Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Landing;
