import React from 'react';
import { useTheme } from '../context/ThemeContext';

function Settings() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div className="pt-8 pb-24">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Settings</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow divide-y dark:divide-gray-700">
        <div className="p-4">
          <h2 className="font-medium dark:text-white">Theme</h2>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Dark Mode</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                darkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
        <div className="p-4">
          <h2 className="font-medium dark:text-white">Account</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your account settings</p>
        </div>
        <div className="p-4">
          <h2 className="font-medium dark:text-white">Notifications</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Control your notification settings</p>
        </div>
        <div className="p-4">
          <h2 className="font-medium dark:text-white">Language</h2>
          <select className="mt-2 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Chinese</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Settings;