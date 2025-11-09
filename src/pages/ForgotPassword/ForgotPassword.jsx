import { useState } from "react";
import { Link } from "react-router-dom";
import { TbDeviceHeartMonitor } from "react-icons/tb";
import { Mail } from "react-feather";
import { useForgotPasswordMutation } from "../../api/apiSlice";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await forgotPassword(email).unwrap();
      setSuccess(true);
    } catch (err) {
      setError(
        err?.data?.message || "Failed to send reset email. Please try again.",
      );
    }
  };

  return (
    <div className="px-4 md:px-12 py-12 flex justify-center items-start min-h-screen">
      <div className="max-w-sm w-full">
        <Link
          to="/"
          className="flex items-center justify-center space-x-0 mb-12"
        >
          <TbDeviceHeartMonitor size={20} className="text-black" />
          <span className="text-lg font-medium text-black">MCPmon</span>
        </Link>

        {!success ? (
          <>
            <h1 className="text-lg font-normal text-black mb-2">
              Reset Password
            </h1>
            <p className="text-sm text-gray-600 mb-8">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
                {error}
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
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full border border-gray-300 px-6 py-2 text-sm text-black hover:bg-black hover:text-white transition-colors rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </form>

            <div className="mt-6 text-sm text-gray-600 text-center">
              <Link to="/login" className="text-black hover:underline">
                Back to Login
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Mail size={48} className="text-green-600" />
            </div>
            <h1 className="text-lg font-normal text-black">Check your email!</h1>
            <p className="text-sm text-gray-600">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-600">
              Please click the link in the email to reset your password. The
              link will expire in 1 hour.
            </p>
            <div className="pt-4">
              <Link
                to="/login"
                className="inline-block px-6 py-2 border border-gray-300 text-sm text-black hover:bg-black hover:text-white transition-colors rounded-md"
              >
                Back to Login
              </Link>
            </div>
            <p className="text-xs text-gray-600 pt-2">
              Didn't receive the email? Check your spam folder or try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
