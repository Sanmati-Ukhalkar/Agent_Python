import React from 'react';
import { useChat } from '../context/ChatContext';

const Sidebar = () => {
  const { chats, currentChatId, createNewChat, selectChat, deleteChat } = useChat();

  return (
    <aside className="sidebar">
      <button className="new-chat-btn" onClick={createNewChat}>
        + New Chat
      </button>
      <div className="chat-history">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item ${chat.id === currentChatId ? 'active' : ''}`}
            onClick={() => selectChat(chat.id)}
          >
            <span className="chat-title">{chat.title}</span>
            <button
              className="delete-chat-btn"
              onClick={(e) => {
                e.stopPropagation();
                deleteChat(chat.id);
              }}
              title="Delete chat"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
