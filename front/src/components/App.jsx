import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import '../index.css';
import HomePage from '../pages/HomePage';
import ChatVocal from '../pages/ChatVocal';
import ChatSos from '../pages/ChatSos';
import DocumentPage from '../pages/DocumentPage';
import ParamPage from '../pages/ParamPage';
import ChatBot from '../pages/ChatBot';
import VoiceToText from '../pages/VoiceToText';

const App = () => {
  return (
    <BrowserRouter>
        <Routes >
            <Route index element={<VoiceToText />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/vocal' element={<ChatVocal />} />
            <Route path='/sos' element={<ChatSos />} />
            <Route path='/documents' element={<DocumentPage />} />
            <Route path='/settings' element={<ParamPage />} />

        </Routes>
    </BrowserRouter>
  )
}

export default App