import { useState } from "react";
import { Switch } from "antd";
import { useSubmitFeedbackMutation } from "../../api/apiSlice";

function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [allowResponse, setAllowResponse] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [submitFeedback, { isLoading }] = useSubmitFeedbackMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await submitFeedback({
        feedback,
        allowResponse,
      }).unwrap();

      setSuccess(response.message || "Thank you for your feedback!");
      setFeedback("");
      setAllowResponse(true);
    } catch (err) {
      setError(
        err?.data?.message || "Failed to submit feedback. Please try again.",
      );
    }
  };

  return (
    <div className="px-20 py-20">
      <h1 className="text-2xl font-normal text-black mb-8">Feedback</h1>

      <div className="max-w-2xl">
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
            <textarea
              id="feedback"
              name="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              maxLength={300}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black resize-none"
              placeholder="Tell us what you think..."
            />
            <div className="mt-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch
                  checked={allowResponse}
                  onChange={setAllowResponse}
                  size="small"
                  style={{
                    backgroundColor: allowResponse ? "#000000" : undefined,
                  }}
                />
                <label className="text-sm text-black">
                  Allow response via email
                </label>
              </div>
              <div className="text-xs text-gray-500">{feedback.length}/300</div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="border border-gray-300 px-6 py-2 text-sm text-black hover:bg-black hover:text-white transition-colors rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
