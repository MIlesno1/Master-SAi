import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="pt-8 pb-24">
      <div className="text-center mb-8">
        <img
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
          alt="AI Mentor"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-900">Welcome to Master SAi</h1>
        <p className="mt-2 text-gray-600">Your AI Mentor for personalized learning</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/subjects"
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <BookOpenIcon className="h-8 w-8 text-blue-600" />
              <span className="mt-2 text-sm font-medium">My Subjects</span>
            </Link>
            <Link
              to="/chat"
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <ChatBubbleLeftIcon className="h-8 w-8 text-blue-600" />
              <span className="mt-2 text-sm font-medium">Start Learning</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Featured Mentors</h2>
          <div className="space-y-4">
            {['Computer Science', 'Engineering', 'Physics', 'Mathematics'].map((field) => (
              <div key={field} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <AcademicCapIcon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium">{field} Expert</h3>
                  <p className="text-xs text-gray-500">Specialized in {field.toLowerCase()} education</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home