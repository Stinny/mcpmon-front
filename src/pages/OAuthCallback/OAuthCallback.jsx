import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TbDeviceHeartMonitor } from "react-icons/tb";
import { setCredentials } from "../../features/authSlice";

function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(true);
  const [isLocalAccountExists, setIsLocalAccountExists] = useState(false);

  useEffect(() => {
    const processCallback = () => {
      const success = searchParams.get("success");
      const errorParam = searchParams.get("error");
      const data = searchParams.get("data");

      if (errorParam) {
        // Handle error
        const decodedError = decodeURIComponent(errorParam);
        setError(decodedError);

        // Check if error is about existing local account
        if (decodedError.includes("Please login with your email and password")) {
          setIsLocalAccountExists(true);
        }

        setIsProcessing(false);
        return;
      }

      if (success === "true" && data) {
        try {
          // Parse user data and token from URL
          const userData = JSON.parse(decodeURIComponent(data));
          const { token, ...user } = userData;

          // Save credentials to Redux store
          dispatch(setCredentials({ user, token }));

          // Redirect to home/dashboard
          navigate("/home");
        } catch (err) {
          console.error("Failed to parse OAuth callback data:", err);
          setError("Failed to process authentication. Please try again.");
          setIsProcessing(false);
        }
      } else {
        setError("Invalid callback data. Please try again.");
        setIsProcessing(false);
      }
    };

    processCallback();
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="px-4 md:px-12 py-12 flex justify-center items-start min-h-screen">
      <div className="max-w-sm w-full">
        <div className="flex items-center justify-center space-x-0 mb-12">
          <TbDeviceHeartMonitor size={20} className="text-black" />
          <span className="text-lg font-medium text-black">MCPmon</span>
        </div>

        {isProcessing ? (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
            <h1 className="text-lg font-normal text-black">
              Completing sign in...
            </h1>
            <p className="text-sm text-gray-600">
              Please wait while we log you in.
            </p>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <h1 className="text-lg font-normal text-black">
              Authentication Failed
            </h1>
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
              {error}
            </div>
            <div className="pt-4 space-y-3">
              {isLocalAccountExists ? (
                <>
                  <a
                    href="/login"
                    className="block px-6 py-2 border border-gray-300 text-sm text-black hover:bg-black hover:text-white transition-colors rounded-md"
                  >
                    Login with Email/Password
                  </a>
                  <p className="text-xs text-gray-500">
                    This email is already registered with a password.
                  </p>
                </>
              ) : (
                <>
                  <a
                    href="/login"
                    className="block px-6 py-2 border border-gray-300 text-sm text-black hover:bg-black hover:text-white transition-colors rounded-md"
                  >
                    Try Again
                  </a>
                  <a
                    href="/signup"
                    className="block px-6 py-2 text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    Create a new account
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OAuthCallback;
