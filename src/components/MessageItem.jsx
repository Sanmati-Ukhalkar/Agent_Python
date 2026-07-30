import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useChat } from '../context/ChatContext';

const MessageItem = ({ message, chatId }) => {
  const { updateMessage, deleteMessage } = useChat();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);

  const handleUpdate = () => {
    updateMessage(chatId, message.id, editContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditContent(message.content);
    setIsEditing(false);
  };

  return (
    <div className={`message-item ${message.role}`}>
      {isEditing ? (
        <div className="edit-message">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="edit-textarea"
          />
          <div className="edit-actions">
            <button onClick={handleUpdate}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="message-content">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
          <div className="message-actions">
            <button onClick={() => setIsEditing(true)} title="Edit">
              ✏️
            </button>
            <button onClick={() => deleteMessage(chatId, message.id)} title="Delete">
              🗑️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MessageItem;
