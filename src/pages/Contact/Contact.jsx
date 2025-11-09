import { useState } from "react";
import { Link } from "react-router-dom";
import { TbDeviceHeartMonitor } from "react-icons/tb";
import { SiSlack } from "react-icons/si";
import { useSubmitContactMutation } from "../../api/apiSlice";

function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [submitContact, { isLoading }] = useSubmitContactMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await submitContact({
        email,
        message,
      }).unwrap();

      setSuccess(
        response.message ||
          "Thank you for your message! We'll get back to you soon.",
      );
      setEmail("");
      setMessage("");
    } catch (err) {
      setError(
        err?.data?.message || "Failed to send message. Please try again.",
      );
    }
  };

  return (
    <div className="px-4 md:px-12 py-12 flex justify-center items-start min-h-screen">
      <div className="max-w-md w-full">
        <Link
          to="/"
          className="flex items-center justify-center space-x-0 mb-12"
        >
          <TbDeviceHeartMonitor size={20} className="text-black" />
          <span className="text-lg font-medium text-black">MCPmon</span>
        </Link>

        <h1 className="text-lg font-normal text-black mb-2">Get in touch</h1>
        <p className="text-sm text-gray-600 mb-6">
          Have questions, feedback, or feature requests? We'd love to hear from
          you.
        </p>

        {/* Slack Community Button */}
        <div className="mb-8">
          <a
            href="https://join.slack.com/t/mcpmon/shared_invite/zt-3h6r8moef-~Y2ja5cvu6j6ZMy9570uBQ"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-gray-300 text-black hover:bg-black hover:text-white transition-colors rounded-md text-sm font-medium"
          >
            <SiSlack size={18} />
            Join us on Slack
          </a>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-md">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm text-black mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm text-black mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              maxLength={300}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent resize-none"
              placeholder="Your message..."
            />
            <div className="mt-1 text-xs text-gray-500 text-right">
              {message.length}/300
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full border border-gray-300 px-6 py-2 text-sm text-black hover:bg-black hover:text-white transition-colors rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Send message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
