import { useState } from 'react';
import { useScanChannelMutation } from '../../api/apiSlice';

function Scan() {
  const [channelId, setChannelId] = useState('');
  const [affiliateId, setAffiliateId] = useState('');
  const [scanChannel, { isLoading, isSuccess, isError, error }] = useScanChannelMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await scanChannel({ channelId, affiliateId }).unwrap();
    } catch (err) {
      console.error('Failed to scan channel:', err);
    }
  };

  return (
    <div className="px-12 py-12">
      <div className="max-w-lg">
        <h1 className="text-lg font-normal text-black mb-2">Scan Channel</h1>
        <p className="text-sm text-gray-600 mb-8">
          Enter your details to scan for broken Amazon affiliate links across your entire YouTube channel
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="channelId"
              className="block text-sm text-black mb-2"
            >
              YouTube Channel ID
            </label>
            <input
              type="text"
              id="channelId"
              name="channelId"
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 text-sm text-black focus:outline-none focus:border-black rounded-md"
              placeholder="Enter your channel ID"
              required
            />
          </div>

          <div>
            <label
              htmlFor="affiliateId"
              className="block text-sm text-black mb-2"
            >
              Amazon Associate ID
            </label>
            <input
              type="text"
              id="affiliateId"
              name="affiliateId"
              value={affiliateId}
              onChange={(e) => setAffiliateId(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 text-sm text-black focus:outline-none focus:border-black rounded-md"
              placeholder="Enter your associate ID"
              required
            />
          </div>

          {isError && (
            <div className="text-sm text-red-600">
              {error?.data?.message || 'Failed to start scan. Please try again.'}
            </div>
          )}

          {isSuccess && (
            <div className="text-sm text-green-600">
              Scan started successfully!
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="border border-gray-300 px-6 py-2 text-sm text-black hover:bg-black hover:text-white transition-colors rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Starting Scan...' : 'Start Scan - $19'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Scan;
