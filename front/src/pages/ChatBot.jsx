import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isVocal, setIsVocal] = useState(false);
  const [isSOS, setIsSOS] = useState(false); // État pour gérer le chatbot SOS

  // Fonction pour envoyer un message à l'API
  const sendMessage = async () => {
    const endpoint = isSOS ? 'chat-sos' : 'chat'; // Choisir l'endpoint en fonction du mode SOS ou non

    if (isVocal) {
      // Mode vocal activé
      await axios.post(`http://localhost:5000/${endpoint}`, {
        message: '',
        isVocal: true
      });
    } else if (input.trim() !== '') {
      // Mode texte
      const response = await axios.post(`http://localhost:5000/${endpoint}`, {
        message: input,
        isVocal: false
      });
      // Ajouter les messages à l'interface
      setMessages([...messages, { sender: 'user', text: input }, { sender: 'bot', text: response.data.response }]);
      setInput(''); // Réinitialiser l'input
    }
  };

  return (
    <div>
      <h1>ChatBot</h1>
      <div>
        {messages.map((message, index) => (
          <p key={index} className={message.sender}>
            {message.sender === 'user' ? 'You: ' : 'Bot: '}
            {message.text}
          </p>
        ))}
      </div>

      {!isVocal && (
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
      )}
      <button onClick={sendMessage}>Send</button>

      {/* Bouton pour activer/désactiver le mode vocal */}
      <button onClick={() => setIsVocal(!isVocal)}>
        {isVocal ? 'Mode Texte' : 'Mode Vocal'}
      </button>

      {/* Bouton pour choisir entre le chatbot standard et SOS */}
      <button onClick={() => setIsSOS(!isSOS)}>
        {isSOS ? 'Utiliser ChatBot Normal' : 'Utiliser ChatBot SOS'}
      </button>
    </div>
  );
};

export default ChatBot;