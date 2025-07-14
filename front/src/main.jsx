// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css'; // 👈 Required for message/notification
import { AuthProvider } from './context/AuthContext.jsx';
import { DarkModeProvider } from './context/DarkModeContext.jsx'; // ✅ Import DarkModeProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider>
        <AuthProvider>
          <DarkModeProvider> {/* ✅ Wrap App with DarkModeProvider */}
            <App />
          </DarkModeProvider>
        </AuthProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
