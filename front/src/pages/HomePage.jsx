import React from 'react';

import logoBlue from '../assets/logo.png';
import SizeFont from '../components/SizeFont';
import calendarIcon from '../assets/icons/calendarIcon.svg';
import microIcon from '../assets/icons/microIcon.svg';
import notificationIcon from '../assets/icons/notificationIcon.svg';
import documentIcon from '../assets/icons/documentsIcon.svg';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import SosWhite from '../assets/SOSWhite.svg'


const HomePage = () => {
  return (
    <div className='h-screen px-8 py-10'>
        <div className='flex justify-between'>
          <div className='flex gap-4'>
            <Link to='/settings'className='px-4 py-2 rounded-md bg-myCustomColor-primaryC'>
              {/* <img src={paramIcon} alt="ParamIcon" className='px-5 py-3 rounded-md bg-myCustomColor-primaryC'/> */}
              <Settings className='text-white'/>
            </Link>
            <img src={logoBlue} alt="Logo" className='w-24 object-contain'/>
          </div>
          <SizeFont />
        </div>

        {/* Rappel de rendez-vous(donnée dynamique) */}
        <div className='flex justify-center items-center gap-6 rounded-md border-2 border-myCustomColor-primaryC bg-myCustomColor-bleuC mt-16 font-bold my-3'>
          <img src={calendarIcon} alt="Calendrier" />
          <div >
            <p className='text-lg'>Prochain rendez-vous</p>
            <p>Lundi 14h chez le médecin</p> {/* Donnée dynamique */}
          </div>
        </div>

        {/* Bouton d'aide */}
        <Link to='/vocal' className='px-5 py-8 mx-auto bg-myCustomColor-primaryC flex flex-col justify-center items-center rounded-full w-60 h-56 gap-4 mt-10 text-white'>
          <img src={microIcon} alt="Micro" />
          <p className='text-center'>Besoin d&apos;aide ? <br></br> Discuter de ses problèmes ?</p>
        </Link>

        {/* Boutons SOS */}
        <Link to='/sos' className='bg-myCustomColor-sosC rounded-full flex flex-col text-center text-white justify-center items-center gap-5 mt-10 p-10 py-10 h-48'>
            <img src={SosWhite} alt="" />
            <p>Ne pas utiliser n&apos;importe comment</p>
            <p>Cliquez plein de fois pour activer un appel des urgences</p>
        </Link>


        {/* Boutons du bas */}
        <div className='flex gap-5 justify-between items-center mt-14'>
            <div className='flex flex-col justify-center items-center'>
              <img src={notificationIcon} alt="Notification" className='bg-myCustomColor-primaryC px-2 py-3 rounded-full flex flex-col'/>
              <p>Rappels</p>
            </div>

            <div className='flex flex-col justify-center items-center'>
              <img src={calendarIcon} alt="Calendrier" className='bg-myCustomColor-primaryC px-3 py-3 rounded-full'/>
              <p>Calendrier</p>
            </div>

            <div className='flex flex-col justify-center items-center'>
              <Link to='/documents' >
                <img src={documentIcon} alt="Documents" className='bg-myCustomColor-primaryC px-3 py-3 rounded-full'/>
              </Link>
              <p>Documents</p>
            </div>
        </div>
    </div>
  )
}

export default HomePage