import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import bridge from '@vkontakte/vk-bridge';
import './index.css';

bridge.send('VKWebAppInit');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
