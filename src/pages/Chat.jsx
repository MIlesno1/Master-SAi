import React, { useState, useEffect } from 'react';
import { SensayClient } from '@sensay/chat-client';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedMentor, setSelectedMentor] = useState('general');

  const mentors = {
    general: 'General Academic Advisor',
    cs: 'Computer Science Expert',
    engineering: 'Engineering Master',
    science: 'Science Specialist'
  };

  const sensayClient = new SensayClient({
    apiKey: process.env.VITE_SENSAY_API_KEY
  });

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, newMessage]);
    setInput('');

    try {
      const response = await sensayClient.chat({
        message: input,
        persona: selectedMentor
      });

      setMessages(msgs => [...msgs, {
        text: response.text,
        sender: 'ai',
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="pt-8 pb-24">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <select
            value={selectedMentor}
            onChange={(e) => setSelectedMentor(e.target.value)}
            className="w-full rounded-md border-gray-300"
          >
            {Object.entries(mentors).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>

        <div className="h-[calc(100vh-300px)] overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask your question..."
              className="flex-1 rounded-md border-gray-300"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat