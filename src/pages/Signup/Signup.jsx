import { useState } from "react";
import { Link } from "react-router-dom";
import { TbDeviceHeartMonitor } from "react-icons/tb";
import { Mail, Check, X } from "react-feather";
import { useSignupMutation } from "../../api/apiSlice";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);
  const [isOAuthAccountExists, setIsOAuthAccountExists] = useState(false);

  const [signup, { isLoading }] = useSignupMutation();

  // Password validation rules
  const passwordRequirements = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsOAuthAccountExists(false);

    // Validate password before submission
    if (!isPasswordValid) {
      setError("Password does not meet all requirements");
      setShowPasswordRequirements(true);
      return;
    }

    try {
      const response = await signup({ name, email, password }).unwrap();
      // Backend returns { success: true, message: "...", data: { email } }
      setSuccess(true);
    } catch (err) {
      setError(err?.data?.message || "Failed to sign up. Please try again.");

      // Check if error is due to OAuth account already existing
      if (err?.data?.code === "OAUTH_ACCOUNT_EXISTS") {
        setIsOAuthAccountExists(true);
      }
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
              Create Account
            </h1>
            <p className="text-sm text-gray-600 mb-8">
              Create an account to start monitoring
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
                {error}
              </div>
            )}

            <div>
              <button
                onClick={() => {
                  window.location.href = `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/auth/github?t=${Date.now()}`;
                }}
                className="w-full border border-gray-300 px-6 py-2 text-sm text-black hover:bg-black hover:text-white transition-colors rounded-md flex items-center justify-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Sign up with GitHub</span>
              </button>
            </div>

            <div className="mt-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <div>
                <label htmlFor="name" className="block text-sm text-black mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-black mb-2"
                >
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
                <label
                  htmlFor="password"
                  className="block text-sm text-black mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setShowPasswordRequirements(true)}
                  onBlur={() => setShowPasswordRequirements(false)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
                  placeholder="Create a password"
                />

                {/* Password Requirements Display */}
                {showPasswordRequirements && (
                  <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-md">
                    <p className="text-xs font-medium text-gray-700 mb-2">
                      Password must contain:
                    </p>
                    <ul className="space-y-1">
                      <li className="flex items-center gap-2 text-xs">
                        {passwordRequirements.minLength ? (
                          <Check size={14} className="text-green-600" />
                        ) : (
                          <X size={14} className="text-gray-400" />
                        )}
                        <span
                          className={
                            passwordRequirements.minLength
                              ? "text-green-600"
                              : "text-gray-600"
                          }
                        >
                          At least 8 characters
                        </span>
                      </li>
                      <li className="flex items-center gap-2 text-xs">
                        {passwordRequirements.hasUpperCase ? (
                          <Check size={14} className="text-green-600" />
                        ) : (
                          <X size={14} className="text-gray-400" />
                        )}
                        <span
                          className={
                            passwordRequirements.hasUpperCase
                              ? "text-green-600"
                              : "text-gray-600"
                          }
                        >
                          One uppercase letter
                        </span>
                      </li>
                      <li className="flex items-center gap-2 text-xs">
                        {passwordRequirements.hasLowerCase ? (
                          <Check size={14} className="text-green-600" />
                        ) : (
                          <X size={14} className="text-gray-400" />
                        )}
                        <span
                          className={
                            passwordRequirements.hasLowerCase
                              ? "text-green-600"
                              : "text-gray-600"
                          }
                        >
                          One lowercase letter
                        </span>
                      </li>
                      <li className="flex items-center gap-2 text-xs">
                        {passwordRequirements.hasNumber ? (
                          <Check size={14} className="text-green-600" />
                        ) : (
                          <X size={14} className="text-gray-400" />
                        )}
                        <span
                          className={
                            passwordRequirements.hasNumber
                              ? "text-green-600"
                              : "text-gray-600"
                          }
                        >
                          One number
                        </span>
                      </li>
                      <li className="flex items-center gap-2 text-xs">
                        {passwordRequirements.hasSpecialChar ? (
                          <Check size={14} className="text-green-600" />
                        ) : (
                          <X size={14} className="text-gray-400" />
                        )}
                        <span
                          className={
                            passwordRequirements.hasSpecialChar
                              ? "text-green-600"
                              : "text-gray-600"
                          }
                        >
                          One special character (!@#$%^&*...)
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading || (password && !isPasswordValid)}
                  className="w-full border border-gray-300 px-6 py-2 text-sm text-black hover:bg-black hover:text-white transition-colors rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Creating account..." : "Sign up"}
                </button>
              </div>
            </form>

            <div className="mt-6 text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-black hover:underline">
                Log in
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Mail size={48} className="text-green-600" />
            </div>
            <h1 className="text-lg font-normal text-black">
              Check your email!
            </h1>
            <p className="text-sm text-gray-600">
              We've sent a verification link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-600">
              Please click the link in the email to verify your account and
              complete the signup process.
            </p>
            <div className="pt-4">
              <Link
                to="/login"
                className="inline-block px-6 py-2 border border-gray-300 text-sm text-black hover:bg-black hover:text-white transition-colors rounded-md"
              >
                Go to Login
              </Link>
            </div>
            <p className="text-xs text-gray-600 pt-2">
              Didn't receive the email? Check your spam folder or contact
              support.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;
