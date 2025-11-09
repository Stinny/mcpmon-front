import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Switch, Tabs, Modal } from "antd";
import { Edit2, X, Check, Lock, Zap, Send, AlertTriangle } from "react-feather";
import { SiSlack, SiDiscord } from "react-icons/si";
import {
  selectCurrentUser,
  updateUser,
  logout,
} from "../../features/authSlice";
import {
  useUpdateProfileMutation,
  useUpdateAlertPreferencesMutation,
  useDeleteAccountMutation,
  useSendPhoneVerificationMutation,
  useVerifyPhoneMutation,
  useResendPhoneVerificationMutation,
  useChangePasswordMutation,
} from "../../api/apiSlice";

function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const [updateAlertPreferences, { isLoading: isUpdatingAlerts }] =
    useUpdateAlertPreferencesMutation();
  const [deleteAccount, { isLoading: isDeletingAccount }] =
    useDeleteAccountMutation();
  const [sendPhoneVerification, { isLoading: isSendingVerification }] =
    useSendPhoneVerificationMutation();
  const [verifyPhone, { isLoading: isVerifying }] = useVerifyPhoneMutation();
  const [resendPhoneVerification, { isLoading: isResending }] =
    useResendPhoneVerificationMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  // Edit mode states
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingAlerts, setIsEditingAlerts] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // Error states
  const [accountError, setAccountError] = useState("");
  const [alertsError, setAlertsError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Success states
  const [accountSuccess, setAccountSuccess] = useState("");
  const [alertsSuccess, setAlertsSuccess] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Account form data
  const [accountData, setAccountData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  // Alerts data
  const [emailAlerts, setEmailAlerts] = useState(
    user?.emailAlertsEnabled ?? true,
  );
  const [smsAlerts, setSmsAlerts] = useState(user?.smsAlertsEnabled ?? false);

  // Password form data
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Delete account modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [confirmationString, setConfirmationString] = useState("");
  const [randomString, setRandomString] = useState("");
  const [userInput, setUserInput] = useState("");
  const [deleteError, setDeleteError] = useState("");

  // Phone verification modal
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [verifySuccess, setVerifySuccess] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

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

  // Countdown timer for resend button
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleOpenVerifyModal = () => {
    setVerificationCode("");
    setVerifyError("");
    setVerifySuccess("");
    setIsVerifyModalOpen(true);
  };

  const handleVerifyPhone = async () => {
    setVerifyError("");
    setVerifySuccess("");

    if (!verificationCode || verificationCode.length !== 6) {
      setVerifyError("Please enter a valid 6-digit code");
      return;
    }

    try {
      const response = await verifyPhone(verificationCode).unwrap();
      // Update Redux store with new user data
      dispatch(updateUser(response.data));

      setVerifySuccess("Phone number verified successfully!");
      setTimeout(() => {
        setIsVerifyModalOpen(false);
        setVerificationCode("");
        setVerifySuccess("");
      }, 1500);
    } catch (err) {
      setVerifyError(
        err?.data?.message || "Failed to verify code. Please try again.",
      );
    }
  };

  const handleResendCode = async () => {
    setVerifyError("");
    setVerifySuccess("");

    try {
      await resendPhoneVerification().unwrap();
      setVerifySuccess("New code sent to your phone!");
      setResendCountdown(60); // 60 second countdown
      setTimeout(() => setVerifySuccess(""), 3000);
    } catch (err) {
      if (err?.data?.secondsRemaining) {
        setResendCountdown(err.data.secondsRemaining);
        setVerifyError(err.data.message);
      } else {
        setVerifyError(
          err?.data?.message || "Failed to resend code. Please try again.",
        );
      }
    }
  };

  const handleCloseVerifyModal = () => {
    setIsVerifyModalOpen(false);
    setVerificationCode("");
    setVerifyError("");
    setVerifySuccess("");
  };

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

  const handleSavePassword = async () => {
    setPasswordError("");
    setPasswordSuccess("");

    // Validate passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    // Validate password length
    if (passwordData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }).unwrap();

      setPasswordSuccess("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsEditingPassword(false);

      // Clear success message after 3 seconds
      setTimeout(() => setPasswordSuccess(""), 3000);
    } catch (err) {
      setPasswordError(
        err?.data?.message || "Failed to change password. Please try again.",
      );
    }
  };

  const handleCancelPassword = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordError("");
    setPasswordSuccess("");
    setIsEditingPassword(false);
  };

  // Generate random 6-letter string
  const generateRandomString = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleDeleteAccountClick = () => {
    const random = generateRandomString();
    setRandomString(random);
    setConfirmationString(random);
    setUserInput("");
    setDeleteError("");
    setIsDeleteModalOpen(true);
  };

  const handleDeleteAccountConfirm = async () => {
    if (userInput !== confirmationString) {
      setDeleteError("The confirmation text doesn't match. Please try again.");
      return;
    }

    try {
      await deleteAccount().unwrap();

      // Logout and redirect to landing page
      dispatch(logout());
      navigate("/");
    } catch (err) {
      setDeleteError(
        err?.data?.message || "Failed to delete account. Please try again.",
      );
    }
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
    setUserInput("");
    setDeleteError("");
  };

  const tabItems = [
    {
      key: "general",
      label: "General",
      children: (
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
                <div className="flex items-center gap-2">
                  {accountData.phone && !user?.isPhoneVerified && (
                    <button
                      onClick={handleOpenVerifyModal}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-black hover:bg-gray-800 transition-colors rounded-md"
                    >
                      <Check size={14} />
                      Verify Phone
                    </button>
                  )}
                  <button
                    onClick={() => setIsEditingAccount(true)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-black border border-gray-300 hover:bg-gray-50 transition-colors rounded-md"
                  >
                    <Edit2 size={14} />
                    Edit
                  </button>
                </div>
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
                <label className="block text-sm text-gray-600 mb-1">
                  Email
                </label>
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
                <div className="flex items-center gap-2 mb-1">
                  <label className="block text-sm text-gray-600">
                    Phone Number
                  </label>
                  {accountData.phone && !isEditingAccount && (
                    <span
                      className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${
                        user?.isPhoneVerified
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {user?.isPhoneVerified ? "Verified" : "Unverified"}
                    </span>
                  )}
                </div>
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
                    backgroundColor: emailAlerts ? "#000000" : undefined,
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
                    backgroundColor: smsAlerts ? "#000000" : undefined,
                  }}
                />
                <div>
                  <h3 className="text-sm font-medium text-black mb-1">
                    SMS Alerts
                  </h3>
                  <p className="text-sm text-gray-500">
                    Receive text messages when your monitors go down or recover
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Section */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-medium text-black mb-4">Billing</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex flex-col items-center">
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Beta
                </span>
              </div>

              <p className="text-sm text-gray-500 w-96 text-center">
                MCPmon is currently free to use while in beta. Enjoy unlimited
                monitoring with no charge.
              </p>
            </div>
          </div>

          {/* Delete Account Section */}
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={20} className="text-red-600" />
              <h2 className="text-lg font-medium text-black">Danger Zone</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-black mb-1">
                  Delete Account
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Once you delete your account, there is no going back. All your
                  monitors and data will be permanently deleted.
                </p>
              </div>
              <button
                onClick={handleDeleteAccountClick}
                className="px-4 py-2 text-sm bg-red-600 text-white hover:bg-red-700 transition-colors rounded-md font-medium"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "integrations",
      label: "Integrations",
      children: (
        <div className="max-w-2xl">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                <Zap size={20} className="text-black" />
              </div>
              <h2 className="text-lg font-medium text-black">Integrations</h2>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Connect MCPmon with your favorite apps
            </p>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <SiSlack size={16} className="text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-black mb-2">
                      Slack
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">
                      Receive monitor alerts directly in your Slack channels.
                    </p>
                    <button
                      disabled
                      className="px-3 py-1.5 text-xs border border-gray-300 text-gray-500 bg-white rounded-md cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <SiDiscord size={16} className="text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-black mb-2">
                      Discord
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">
                      Get notifications in your Discord server when monitors
                      change status.
                    </p>
                    <button
                      disabled
                      className="px-3 py-1.5 text-xs border border-gray-300 text-gray-500 bg-white rounded-md cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Send size={16} className="text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-black mb-2">
                      Webhook
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">
                      Send custom webhooks to any endpoint when events occur.
                    </p>
                    <button
                      disabled
                      className="px-3 py-1.5 text-xs border border-gray-300 text-gray-500 bg-white rounded-md cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "security",
      label: "Security",
      children: (
        <div className="max-w-2xl">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                <Lock size={20} className="text-black" />
              </div>
              <h2 className="text-lg font-medium text-black">Security</h2>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Manage your account security and authentication settings.
            </p>

            <div className="space-y-4">
              {user?.authProvider === "github" ? (
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <h3 className="text-sm font-medium text-black mb-2">
                    Change Password
                  </h3>
                  <p className="text-xs text-gray-500">
                    You signed in with GitHub. Password management is handled through your GitHub account.
                  </p>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg p-4 bg-white">
                  {passwordError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
                      {passwordError}
                    </div>
                  )}
                  {passwordSuccess && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-md">
                      {passwordSuccess}
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-black mb-1">
                        Change Password
                      </h3>
                      <p className="text-xs text-gray-500">
                        Update your password to keep your account secure.
                      </p>
                    </div>
                    {!isEditingPassword ? (
                      <button
                        onClick={() => setIsEditingPassword(true)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-black border border-gray-300 hover:bg-gray-50 transition-colors rounded-md"
                      >
                        <Edit2 size={14} />
                        Edit
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCancelPassword}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-black border border-gray-300 hover:bg-gray-50 transition-colors rounded-md"
                        >
                          <X size={14} />
                          Cancel
                        </button>
                        <button
                          onClick={handleSavePassword}
                          disabled={isChangingPassword}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-black hover:bg-gray-800 transition-colors rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Check size={14} />
                          {isChangingPassword ? "Saving..." : "Save"}
                        </button>
                      </div>
                    )}
                  </div>

                  {isEditingPassword && (
                    <div className="space-y-4 mt-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              currentPassword: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                          placeholder="Enter current password"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              newPassword: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                          placeholder="Enter new password"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="text-sm font-medium text-black mb-2">
                  Two-Factor Authentication
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  Add an extra layer of security to your account with 2FA.
                </p>
                <button
                  disabled
                  className="px-3 py-1.5 text-xs border border-gray-300 text-gray-500 bg-white rounded-md cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="text-sm font-medium text-black mb-2">
                  API Keys
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  Generate and manage API keys for programmatic access.
                </p>
                <button
                  disabled
                  className="px-3 py-1.5 text-xs border border-gray-300 text-gray-500 bg-white rounded-md cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="text-sm font-medium text-black mb-2">
                  Active Sessions
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  View and manage your active login sessions.
                </p>
                <button
                  disabled
                  className="px-3 py-1.5 text-xs border border-gray-300 text-gray-500 bg-white rounded-md cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="px-4 md:px-20 py-20">
      <h1 className="text-2xl font-normal text-black mb-8">Settings</h1>
      <Tabs
        defaultActiveKey="general"
        items={tabItems}
        className="settings-tabs"
      />

      {/* Delete Account Confirmation Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-600" />
            <span>Delete Account</span>
          </div>
        }
        open={isDeleteModalOpen}
        onOk={handleDeleteAccountConfirm}
        onCancel={handleDeleteModalCancel}
        okText="Delete Account"
        cancelText="Cancel"
        okButtonProps={{
          danger: true,
          loading: isDeletingAccount,
          disabled: userInput !== confirmationString,
        }}
      >
        <div className="space-y-4 py-4">
          <p className="text-sm text-gray-700">
            This action <strong>cannot be undone</strong>. This will permanently
            delete your account and remove all your monitors and data.
          </p>

          {deleteError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
              {deleteError}
            </div>
          )}

          <div>
            <p className="text-sm text-gray-700 mb-2">
              Please type{" "}
              <strong className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                {confirmationString}
              </strong>{" "}
              to confirm:
            </p>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              placeholder="Type the confirmation text"
              autoComplete="off"
            />
          </div>
        </div>
      </Modal>

      {/* Phone Verification Modal */}
      <Modal
        title="Verify Phone Number"
        open={isVerifyModalOpen}
        onOk={handleVerifyPhone}
        onCancel={handleCloseVerifyModal}
        okText={isVerifying ? "Verifying..." : "Verify"}
        cancelText="Cancel"
        okButtonProps={{
          loading: isVerifying,
          disabled: !verificationCode || verificationCode.length !== 6,
          style: {
            backgroundColor: !verificationCode || verificationCode.length !== 6 ? "#e5e7eb" : "#000000",
            borderColor: !verificationCode || verificationCode.length !== 6 ? "#e5e7eb" : "#000000",
            color: !verificationCode || verificationCode.length !== 6 ? "#9ca3af" : "#ffffff",
            cursor: !verificationCode || verificationCode.length !== 6 ? "not-allowed" : "pointer",
          },
        }}
        cancelButtonProps={{
          style: {
            color: "#000000",
            borderColor: "#d1d5db",
          },
        }}
      >
        <div className="space-y-4 py-4">
          <p className="text-sm text-gray-700">
            A 6-digit verification code has been sent to{" "}
            <strong>{user?.phone}</strong>. Please enter it below:
          </p>

          {verifyError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
              {verifyError}
            </div>
          )}

          {verifySuccess && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-md">
              {verifySuccess}
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                setVerificationCode(value);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent text-center tracking-widest font-mono"
              placeholder="000000"
              maxLength={6}
              autoComplete="off"
            />
            <p className="text-xs text-gray-500 mt-1">
              Code expires in 10 minutes
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={handleResendCode}
              disabled={resendCountdown > 0 || isResending}
              className="text-sm text-black hover:underline disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed"
            >
              {isResending
                ? "Sending..."
                : resendCountdown > 0
                  ? `Resend code in ${resendCountdown}s`
                  : "Resend code"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Settings;
