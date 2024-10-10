import React from 'react';
import doctorM from '../assets/icons/man2Doctor.svg'
import SizeFont from '../components/SizeFont';
import Wave from 'react-wavify';
import { Pencil, X } from 'lucide-react';

const ChatVocal = () => {
  return (
    <div className='h-screen  pt-10'>
        <div className='flex justify-between items-center px-8'>
            <img src={doctorM} alt="Doctor Icon" />
            <SizeFont />
        </div>

        <h1 className='my-10 px-8 text-2xl font-bold'>Bonjour !</h1>

        <p className='font-semibold px-8 text-lg'>Je suis votre assistant, Robert, prêt à vous écouter. Si vous avez un souci de santé, une question...
        N&apos;hésitez pas à me consulter.</p>

        {/* CHAT ICI !!!!! */}

        <div className='flex justify-center items-center gap-10 absolute bottom-3 w-full font-bold text-lg z-10 mx-auto '>
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

export default ChatVocal