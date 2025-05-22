import React from 'react';

const subjects = [
  { id: 'cs', name: 'Computer Science', icon: '💻' },
  { id: 'eng', name: 'Engineering', icon: '⚙️' },
  { id: 'physics', name: 'Physics', icon: '⚛️' },
  { id: 'math', name: 'Mathematics', icon: '📐' },
  { id: 'chemistry', name: 'Chemistry', icon: '🧪' },
  { id: 'biology', name: 'Biology', icon: '🧬' }
];

function Subjects() {
  return (
    <div className="pt-8 pb-24">
      <h1 className="text-2xl font-bold mb-6">My Subjects</h1>
      <div className="grid grid-cols-2 gap-4">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">{subject.icon}</div>
            <h3 className="font-medium">{subject.name}</h3>
            <p className="text-sm text-gray-500 mt-1">
              Learn from expert mentors
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subjects