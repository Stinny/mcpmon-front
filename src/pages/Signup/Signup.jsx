import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSignupMutation } from "../../api/apiSlice";
import { setCredentials } from "../../features/authSlice";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup, { isLoading }] = useSignupMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await signup({ name, email, password }).unwrap();
      // Backend returns { success: true, data: { id, email, token } }
      const { token, ...user } = response.data;
      dispatch(setCredentials({ user, token }));
      navigate("/home");
    } catch (err) {
      setError(err?.data?.message || "Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="px-12 py-12 flex justify-center items-start min-h-screen">
      <div className="max-w-md w-full">
        <h1 className="text-lg font-normal text-black mb-8">
          Create your account
        </h1>

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
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-black mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              placeholder="Create a password"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full border border-gray-300 px-6 py-2 text-sm text-black hover:bg-black hover:text-white transition-colors rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-black hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
