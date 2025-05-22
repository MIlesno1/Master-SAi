import React, { useState, useEffect } from 'react';
import { SensayClient } from '@sensay/chat-client';
import { supabase } from '../utils/supabase';
import { fieldThemes } from '../utils/themes';
import { academicFields } from '../utils/fields';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedMentor, setSelectedMentor] = useState('general');
  const [chatHistory, setChatHistory] = useState([]);

  const sensayClient = new SensayClient({
    apiKey: import.meta.env.VITE_SENSAY_API_KEY
  });

  useEffect(() => {
    loadChatHistory();
  }, [selectedMentor]);

  const loadChatHistory = async () => {
    const { data, error } = await supabase
      .from('chat_history')
      .select('*')
      .eq('mentor_type', selectedMentor)
      .order('created_at', { ascending: true });

    if (data) {
      setMessages(data);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = {
      text: input,
      sender: 'user',
      mentor_type: selectedMentor,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('chat_history')
      .insert([newMessage])
      .select();

    if (data) {
      setMessages([...messages, data[0]]);
    }

    setInput('');

    try {
      const response = await sensayClient.chat({
        message: input,
        persona: selectedMentor
      });

      const aiMessage = {
        text: response.text,
        sender: 'ai',
        mentor_type: selectedMentor,
        created_at: new Date().toISOString()
      };

      const { data: aiData } = await supabase
        .from('chat_history')
        .insert([aiMessage])
        .select();

      if (aiData) {
        setMessages(msgs => [...msgs, aiData[0]]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const theme = fieldThemes[selectedMentor] || fieldThemes.default;

  return (
    <div className="pt-8 pb-24">
      <div className={`bg-white rounded-lg shadow ${theme.accent}`}>
        <div className={`p-4 border-b ${theme.secondary}`}>
          <select
            value={selectedMentor}
            onChange={(e) => setSelectedMentor(e.target.value)}
            className="w-full rounded-md border-gray-300"
          >
            {Object.entries(academicFields).map(([key, value]) => (
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
                    ? theme.primary + ' text-white'
                    : theme.secondary + ' ' + theme.text
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
              className={`px-4 py-2 ${theme.primary} text-white rounded-md hover:opacity-90`}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;