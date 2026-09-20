import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { timelineEngine } from './engine/timelineEngine';
import { soundEngine } from './audio/soundEngine';

// Expose timelineEngine & soundEngine on window for browser test automation & developer console
if (typeof window !== 'undefined') {
  (window as any).timelineEngine = timelineEngine;
  (window as any).soundEngine = soundEngine;
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
