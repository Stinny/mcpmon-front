import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/authSlice";

function Settings() {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="px-12 py-12">
      <h1 className="text-2xl font-normal text-black mb-8">Settings</h1>

      <div className="max-w-2xl space-y-8">
        {/* Account Section */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-medium text-black mb-4">Account</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <p className="text-sm text-black">{user?.email || "Not available"}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">User ID</label>
              <p className="text-sm text-black font-mono">{user?.id || "Not available"}</p>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-medium text-black mb-4">Preferences</h2>
          <p className="text-sm text-gray-500">
            More settings coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
