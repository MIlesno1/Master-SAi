import React from 'react';

function Settings() {
  return (
    <div className="pt-8 pb-24">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="bg-white rounded-lg shadow divide-y">
        <div className="p-4">
          <h2 className="font-medium">Account</h2>
          <p className="text-sm text-gray-500">Manage your account settings</p>
        </div>
        <div className="p-4">
          <h2 className="font-medium">Preferences</h2>
          <p className="text-sm text-gray-500">Customize your learning experience</p>
        </div>
        <div className="p-4">
          <h2 className="font-medium">Notifications</h2>
          <p className="text-sm text-gray-500">Control your notification settings</p>
        </div>
      </div>
    </div>
  );
}

export default Settings