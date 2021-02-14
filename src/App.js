import React from 'react';

import Sidebar from './Sidebar';
import Chat from './Chat';

import './App.css';

function App() {
  return (
    <div className="app">
       {/* SideBar */}
       <Sidebar />
       {/* Chat */}
       <Chat />
    </div>
  );
}

export default App;
