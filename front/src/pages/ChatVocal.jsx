import React, { useCallback, useEffect, useState } from 'react';
import doctorM from '../assets/icons/man2Doctor.svg';
import SizeFont from '../components/SizeFont';
import Wave from 'react-wavify';
import { Pencil, X } from 'lucide-react';
import axios from 'axios';
import Chat from '../components/Chat';

const ChatVocal = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isVocal, setIsVocal] = useState(false);
  const [isSOS, setIsSOS] = useState(false); // État pour gérer le chatbot SOS

    const sendMessage = useCallback(async () => {
      const endpoint = 'chat' // Choisir l'endpoint en fonction du mode SOS ou non
      console.log(endpoint);

      try {
          if (isVocal) {
              // Mode vocal activé
              const response = await fetch(`http://127.0.0.1:5000/${endpoint}`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      message: '',
                      isVocal: true
                  })
              });

              const data = await response.json(); // Récupérer la réponse JSO
              // Ajouter la réponse du bot
              setMessages([...messages, { sender: 'bot', text: data.response }]);
              console.log('dans le vocal');
          } else if (input.trim() !== '') {
              // Mode texte
              const response = await fetch(`http://127.0.0.1:5000/${endpoint}`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      message: input,
                      isVocal: false
                  })
              });

              const data = await response.json(); // Récupérer la réponse JSON
              console.log('pas de vocal');
              // Ajouter les messages à l'interface
              setMessages([...messages, { sender: 'user', text: input }, { sender: 'bot', text: data.response }]);
              setInput(''); // Réinitialiser l'input
          }

          // Un autre test avec une autre requête
          const testResponse = await fetch(`http://127.0.0.1:5000/${endpoint}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  message: 'chui tombée',
                  isVocal: true
              })
          });

          const testData = await testResponse.json(); // Récupérer la réponse JSON
          console.log(testData, 'test');
      } catch (error) {
          console.error('Erreur lors de l\'appel à l\'API:', error);
      }
  }, [isSOS, isVocal, input, messages]); // Dépendances mises à jour



  useEffect(() => {
    sendMessage();
  }, [sendMessage, input, isVocal]);

  
  const handleWriteClick = () => {
    setIsVocal(false);
    setInput(''); // Réinitialiser l'input si nécessaire
  };

 

  const handleStopSpeakingClick = () => {
    setIsVocal(true);
    // Ici vous pouvez appeler une fonction pour gérer le chat vocal
  };

  return (
    <div className='h-screen pt-10'>
      <div className='flex justify-between items-center px-8'>
        <img src={doctorM} alt="Doctor Icon" />
        <SizeFont />
      </div>

      <h1 className='my-10 px-8 text-2xl font-bold'>Bonjour !</h1>

      <p className='font-semibold px-8 text-lg'>Je suis votre assistant, Robert, prêt à vous écouter. Si vous avez un souci de santé, une question...
        N&apos;hésitez pas à me consulter.</p>

      {/* CHAT ICI !!!!! */}

      <Chat typeChat="chat"/>

      {/*  */}
      <div className='flex flex-col'>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      <div className='flex justify-center items-center gap-10 absolute bottom-3 w-full font-bold text-lg z-10 mx-auto'>
        <div className='flex flex-col justify-center items-center gap-3' onClick={handleWriteClick}>
          <p className='bg-myCustomColor-primaryC px-5 py-5 rounded-full'>
            <Pencil size={30} color='white' />
          </p>
          <p>Ecrire</p>
        </div>
        <div className='flex flex-col justify-center items-center gap-3' onClick={handleStopSpeakingClick}>
          <p className='bg-myCustomColor-sosC px-5 py-5 rounded-full'>
            <X size={30} color='white' />
          </p>
          <p>Arrêtez de parler</p>
        </div>
      </div>

      <Wave 
        fill='#ffffff'
        className='absolute bottom-0 w-full blur-sm'
        paused={false}
        style={{ 
            filter: 'drop-shadow(2px 4px 6px #9EC0FF)' 
        }}
        options={{
            height: 1,
            amplitude: 10,
            speed: 1,
            points: 10
        }}
      />
    </div>
  )
}

export default ChatVocal;
