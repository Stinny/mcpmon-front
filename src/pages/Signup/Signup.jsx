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

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
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
