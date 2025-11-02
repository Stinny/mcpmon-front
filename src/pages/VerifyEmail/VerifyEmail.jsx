import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { TbDeviceHeartMonitor } from "react-icons/tb";
import { CheckCircle, XCircle, Loader } from "react-feather";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        // Add small delay before showing error to prevent flash
        await new Promise((resolve) => setTimeout(resolve, 500));
        setStatus("error");
        setMessage("Invalid verification link");
        return;
      }

      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
        const response = await fetch(`${API_URL}/auth/verify-email/${token}`);
        const data = await response.json();

        if (response.ok && data.success) {
          setStatus("success");
          setMessage(data.message || "Email verified successfully!");

          // Redirect to login after 1.5 seconds (reduced from 3)
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        } else {
          // Add small delay before showing error to prevent flash
          await new Promise((resolve) => setTimeout(resolve, 500));
          setStatus("error");
          setMessage(data.message || "Verification failed");
        }
      } catch (error) {
        // Add small delay before showing error to prevent flash
        await new Promise((resolve) => setTimeout(resolve, 500));
        setStatus("error");
        setMessage("Failed to verify email. Please try again.");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="px-12 py-12 flex justify-center items-start min-h-screen">
      <div className="max-w-md w-full">
        <Link
          to="/"
          className="flex items-center justify-center space-x-0 mb-12"
        >
          <TbDeviceHeartMonitor size={20} className="text-black" />
          <span className="text-lg font-medium text-black">MCPmon</span>
        </Link>

        <div className="text-center">
          {status === "loading" && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <Loader size={48} className="text-black animate-spin" />
              </div>
              <h1 className="text-lg font-normal text-black">
                Verifying your email...
              </h1>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <CheckCircle size={48} className="text-green-600" />
              </div>
              <h1 className="text-lg font-normal text-black">
                Email Verified!
              </h1>
              <p className="text-sm text-gray-600">{message}</p>
              <p className="text-sm text-gray-500">
                Redirecting to login...
              </p>
              <Link
                to="/login"
                className="inline-block mt-6 px-6 py-2 border border-gray-300 text-sm text-black hover:bg-black hover:text-white transition-colors rounded-md"
              >
                Go to Login Now
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <XCircle size={48} className="text-red-600" />
              </div>
              <h1 className="text-lg font-normal text-black">
                Verification Failed
              </h1>
              <p className="text-sm text-gray-600">{message}</p>
              <div className="flex flex-col gap-3 mt-6">
                <Link
                  to="/resend-verification"
                  className="inline-block px-6 py-2 border border-gray-300 text-sm text-black hover:bg-black hover:text-white transition-colors rounded-md"
                >
                  Resend Verification Email
                </Link>
                <Link
                  to="/signup"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Back to Sign up
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
