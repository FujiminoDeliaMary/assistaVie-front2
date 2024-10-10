import React, { useCallback, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Chat = (props) => {

  const {typeChat} = props

  const conversations = ["salut 1", "salut 2", "salut 3", "salut 4", "salut 5", "salut6"];
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isVocal, setIsVocal] = useState(false);
  const [isSOS, setIsSOS] = useState(false); // État pour gérer le chatbot SOS



  const sendMessage = useCallback(async () => {
    const endpoint = typeChat // Choisir l'endpoint en fonction du mode SOS ou non
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

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );

  // return (
  //   <ul className='w-full mt-7 flex flex-col gap-7 px-8 h-96 overflow-y-auto custom-scroll'>
  //     {conversations.map((sentence, index) => {
  //       // Détermine la classe en fonction de l'index (pair ou impair)
  //       const isEven = index % 2 === 0;
        
  //       // Si l'index est pair, message à gauche, sinon à droite
  //       const listItemClass = isEven
  //         ? "self-start bg-myCustomColor-violet"
  //         : "self-end bg-myCustomColor-bleuC";

  //       return (
  //         <li
  //           key={index}
  //           className={`${listItemClass} max-w-[70%] px-4 py-5 rounded-md font-medium text-white`}
  //         >
  //           {sentence}
  //         </li>
  //       );
  //     })}
  //   </ul>

  
  // )
}

export default Chat