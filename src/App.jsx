import React from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <ChatWindow />
      </main>
    </div>
  );
}

export default App;
