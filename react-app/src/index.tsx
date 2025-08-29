import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './App';
import ArticlesPage from './pages/ArticlesPage';
import EvenDelegationPage from './pages/EventDelegationPage';
import MemoPage from './pages/MemoPage';
import RegisterFormPage from './pages/RegisterFormPage';
import reportWebVitals from './reportWebVitals';
import AutoCompletePage from './pages/AutoCompletePage';
import PostsPage from './pages/PostsPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/event-delegation" element={<EvenDelegationPage />} />
        <Route path="/memoize" element={<MemoPage />} />
        <Route path="/register" element={<RegisterFormPage />} />
        <Route path="/auto-complete" element={<AutoCompletePage />} />
        <Route path="/posts" element={<PostsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
