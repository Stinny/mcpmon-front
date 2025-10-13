import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch } from "antd";
import { Edit2, X, Check } from "react-feather";
import { selectCurrentUser, updateUser } from "../../features/authSlice";
import {
  useUpdateProfileMutation,
  useUpdateAlertPreferencesMutation,
} from "../../api/apiSlice";

function Settings() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const [updateAlertPreferences, { isLoading: isUpdatingAlerts }] =
    useUpdateAlertPreferencesMutation();

  // Edit mode states
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingAlerts, setIsEditingAlerts] = useState(false);

  // Error states
  const [accountError, setAccountError] = useState("");
  const [alertsError, setAlertsError] = useState("");

  // Success states
  const [accountSuccess, setAccountSuccess] = useState("");
  const [alertsSuccess, setAlertsSuccess] = useState("");

  // Account form data
  const [accountData, setAccountData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  // Alerts data
  const [emailAlerts, setEmailAlerts] = useState(user?.emailAlertsEnabled ?? true);
  const [smsAlerts, setSmsAlerts] = useState(user?.smsAlertsEnabled ?? false);

  // Update state when user data changes
  useEffect(() => {
    if (user) {
      setAccountData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
      setEmailAlerts(user.emailAlertsEnabled ?? true);
      setSmsAlerts(user.smsAlertsEnabled ?? false);
    }
  }, [user]);

  const handleSaveAccount = async () => {
    setAccountError("");
    setAccountSuccess("");

    try {
      const response = await updateProfile(accountData).unwrap();

      // Update Redux store with new user data
      dispatch(updateUser(response.data));

      setAccountSuccess("Profile updated successfully");
      setIsEditingAccount(false);

      // Clear success message after 3 seconds
      setTimeout(() => setAccountSuccess(""), 3000);
    } catch (err) {
      setAccountError(
        err?.data?.message || "Failed to update profile. Please try again.",
      );
    }
  };

  const handleCancelAccount = () => {
    // Reset to original values
    setAccountData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
    setAccountError("");
    setAccountSuccess("");
    setIsEditingAccount(false);
  };

  const handleSaveAlerts = async () => {
    setAlertsError("");
    setAlertsSuccess("");

    try {
      const response = await updateAlertPreferences({
        emailAlertsEnabled: emailAlerts,
        smsAlertsEnabled: smsAlerts,
      }).unwrap();

      // Update Redux store with new user data
      dispatch(updateUser(response.data));

      setAlertsSuccess("Alert preferences updated successfully");
      setIsEditingAlerts(false);

      // Clear success message after 3 seconds
      setTimeout(() => setAlertsSuccess(""), 3000);
    } catch (err) {
      setAlertsError(
        err?.data?.message ||
          "Failed to update alert preferences. Please try again.",
      );
    }
  };

  const handleCancelAlerts = () => {
    // Reset to original values from backend
    setEmailAlerts(user?.emailAlertsEnabled ?? true);
    setSmsAlerts(user?.smsAlertsEnabled ?? false);
    setAlertsError("");
    setAlertsSuccess("");
    setIsEditingAlerts(false);
  };

  return (
    <div className="px-12 py-12">
      <h1 className="text-2xl font-normal text-black mb-8">Settings</h1>

      <div className="max-w-2xl space-y-8">
        {/* Account Section */}
        <div className="border border-gray-200 rounded-lg p-6">
          {accountError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
              {accountError}
            </div>
          )}
          {accountSuccess && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-md">
              {accountSuccess}
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-black">Account</h2>
            {!isEditingAccount ? (
              <button
                onClick={() => setIsEditingAccount(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-black border border-gray-300 hover:bg-gray-50 transition-colors rounded-md"
              >
                <Edit2 size={14} />
                Edit
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancelAccount}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-black border border-gray-300 hover:bg-gray-50 transition-colors rounded-md"
                >
                  <X size={14} />
                  Cancel
                </button>
                <button
                  onClick={handleSaveAccount}
                  disabled={isUpdatingProfile}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-black hover:bg-gray-800 transition-colors rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Check size={14} />
                  {isUpdatingProfile ? "Saving..." : "Save"}
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              {isEditingAccount ? (
                <input
                  type="text"
                  value={accountData.name}
                  onChange={(e) =>
                    setAccountData({ ...accountData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  placeholder="Your name"
                />
              ) : (
                <p className="text-sm text-black">
                  {accountData.name || "Not set"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              {isEditingAccount ? (
                <input
                  type="email"
                  value={accountData.email}
                  onChange={(e) =>
                    setAccountData({ ...accountData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  placeholder="your@email.com"
                />
              ) : (
                <p className="text-sm text-black">
                  {accountData.email || "Not available"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Phone Number
              </label>
              {isEditingAccount ? (
                <input
                  type="tel"
                  value={accountData.phone}
                  onChange={(e) =>
                    setAccountData({ ...accountData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  placeholder="+1 (555) 123-4567"
                />
              ) : (
                <p className="text-sm text-black">
                  {accountData.phone || "Not set"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                User ID
              </label>
              <p className="text-sm text-black font-mono">
                {user?.id || "Not available"}
              </p>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="border border-gray-200 rounded-lg p-6">
          {alertsError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
              {alertsError}
            </div>
          )}
          {alertsSuccess && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-md">
              {alertsSuccess}
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-black">Alerts</h2>
            {!isEditingAlerts ? (
              <button
                onClick={() => setIsEditingAlerts(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-black border border-gray-300 hover:bg-gray-50 transition-colors rounded-md"
              >
                <Edit2 size={14} />
                Edit
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancelAlerts}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-black border border-gray-300 hover:bg-gray-50 transition-colors rounded-md"
                >
                  <X size={14} />
                  Cancel
                </button>
                <button
                  onClick={handleSaveAlerts}
                  disabled={isUpdatingAlerts}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-black hover:bg-gray-800 transition-colors rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Check size={14} />
                  {isUpdatingAlerts ? "Saving..." : "Save"}
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Switch
                checked={emailAlerts}
                onChange={setEmailAlerts}
                disabled={!isEditingAlerts}
                size="small"
                style={{
                  backgroundColor: emailAlerts ? '#000000' : undefined,
                }}
              />
              <div>
                <h3 className="text-sm font-medium text-black mb-1">
                  Email Alerts
                </h3>
                <p className="text-sm text-gray-500">
                  Receive email notifications when your monitors go down or
                  recover
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Switch
                checked={smsAlerts}
                onChange={setSmsAlerts}
                disabled={!isEditingAlerts}
                size="small"
                style={{
                  backgroundColor: smsAlerts ? '#000000' : undefined,
                }}
              />
              <div>
                <h3 className="text-sm font-medium text-black mb-1">
                  SMS Alerts
                </h3>
                <p className="text-sm text-gray-500">
                  Get instant text messages for critical downtime events
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Section */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-medium text-black mb-4">Billing</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <div className="mb-3">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Free Plan
              </span>
            </div>
            <h3 className="text-base font-medium text-black mb-2">
              You're on the free plan
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              MCPmon is currently free to use. Enjoy unlimited monitoring with
              no charge.
            </p>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-medium text-black mb-4">Preferences</h2>
          <p className="text-sm text-gray-500">More settings coming soon...</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
