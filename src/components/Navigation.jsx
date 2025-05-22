import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, ChatBubbleLeftIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

function Navigation() {
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Subjects', href: '/subjects', icon: BookOpenIcon },
    { name: 'AI Mentor', href: '/chat', icon: ChatBubbleLeftIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex flex-col items-center p-4 ${
                location.pathname === item.href ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation