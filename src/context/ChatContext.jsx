import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem('chat_history');
    return savedChats ? JSON.parse(savedChats) : [];
  });
  const [currentChatId, setCurrentChatId] = useState(null);

  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(chats));
  }, [chats]);

  const createNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  };

  const selectChat = (id) => {
    setCurrentChatId(id);
  };

  const addMessage = (chatId, message) => {
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === chatId) {
          const updatedMessages = [...chat.messages, { ...message, id: Date.now().toString(), timestamp: Date.now() }];
          let updatedTitle = chat.title;
          if (chat.messages.length === 0 && message.role === 'user') {
            updatedTitle = message.content.substring(0, 30) + (message.content.length > 30 ? '...' : '');
          }
          return {
            ...chat,
            title: updatedTitle,
            messages: updatedMessages,
            updatedAt: Date.now(),
          };
        }
        return chat;
      })
    );
  };

  const updateMessage = (chatId, messageId, newContent) => {
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: chat.messages.map((msg) =>
              msg.id === messageId ? { ...msg, content: newContent } : msg
            ),
            updatedAt: Date.now(),
          };
        }
        return chat;
      })
    );
  };

  const deleteMessage = (chatId, messageId) => {
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: chat.messages.filter((msg) => msg.id !== messageId),
            updatedAt: Date.now(),
          };
        }
        return chat;
      })
    );
  };

  const deleteChat = (chatId) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChatId,
        createNewChat,
        selectChat,
        addMessage,
        updateMessage,
        deleteMessage,
        deleteChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
