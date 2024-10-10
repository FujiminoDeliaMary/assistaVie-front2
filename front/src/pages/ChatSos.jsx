import React from 'react';
import SOS from '../assets/SOS.svg';
import SizeFont from '../components/SizeFont';
import Wave from 'react-wavify'
import { Pencil, X } from 'lucide-react';
import Chat from '../components/Chat';


const ChatSos = () => {
  return (
    <div className='h-screen pt-10'>
        <SizeFont className=''/>

        <img src={SOS} alt="Sos" className='mt-10 ml-7'/>

        <h1 className='font-bold text-2xl my-10 mx-7'>Appuyez sur ce bouton seulement en cas d'urgence.</h1>

        <h2 className='font-semibold text-lg mx-7'>Si vous avez un <span className='text-myCustomColor-sosC'>problème de santé sérieux</span> qui nécessite l'intervention immédiate d'un proche, d'une infirmière ou des secours, utilisez ce bouton. Nous sommes là pour vous aider en cas de besoin urgent.</h2>

        
        {/* CHAT ICI !!!!! */}
          <Chat typeChat="chat-sos"/>
        {/* ///////////////////////// */}

        <div className='flex justify-center items-center gap-10 absolute bottom-3 w-full font-bold text-lg z-10 mx-auto'>
          <div className='flex flex-col justify-center items-center gap-3'>
            <p className='bg-myCustomColor-primaryC px-5 py-5 rounded-full'>
              <Pencil size={30} color='white'/>
            </p>
            <p>Ecrire</p>
          </div>
          <div className='flex flex-col justify-center items-center gap-3'>
              <p className='bg-myCustomColor-sosC px-5 py-5 rounded-full'>
                <X size={30} color='white'/>
              </p>
              <p>Arrêtez de parler</p>
          </div>
        </div>
        
        <Wave 
        fill='#ffffff'
        className='absolute bottom-0 w-full blur-sm' // Positionnement en bas avec la classe Tailwind
        paused={false}
        style={{ 
            filter: 'drop-shadow(2px 4px 6px #FF8888)' 
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

export default ChatSos