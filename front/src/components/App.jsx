import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import '../index.css';

const App = () => {
  return (
    <BrowserRouter>
        <Routes >
            <Route index element={<AuthPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App