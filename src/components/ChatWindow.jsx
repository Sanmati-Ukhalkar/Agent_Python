import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';
import MessageItem from './MessageItem';

const ChatWindow = () => {
  const { currentChatId, chats, addMessage } = useChat();
  const [input, setInput] = useState('');

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !currentChatId) return;

    addMessage(currentChatId, {
      role: 'user',
      content: input,
    });
    const userMsg = input;
    setInput('');

    // Simulate assistant response
    setTimeout(() => {
        addMessage(currentChatId, {
            role: 'assistant',
            content: `This is a simulated response to: "${userMsg}"`,
        });
    }, 1000);
  };

  if (!currentChatId) {
    return (
      <div className="chat-window-empty">
        <h2>Select a chat or start a new one</h2>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <header className="chat-header">
        <h2>{currentChat?.title}</h2>
      </header>
      <div className="messages-list">
        {currentChat?.messages.map((msg) => (
          <MessageItem key={msg.id} message={msg} chatId={currentChatId} />
        ))}
      </div>
      <form className="message-input-form" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatWindow;
