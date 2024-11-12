// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import GoogleLoginPage from './components/GoogleLoginPage';
import ChatApp from './components/ChatApp';
import ChatWidget from './components/ChatWidget';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GoogleLoginPage />} />
        <Route path="/chat" element={<ChatApp />} />
        {/* Redirect any unknown routes to the login page */}
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/chatwidget" element={<ChatWidget/>}/>
      </Routes>
    </Router>
  );
}

export default App;
