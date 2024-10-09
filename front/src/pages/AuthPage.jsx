import React from 'react'
import nurseW from '../assets/icons/nurseWoman.svg';
import nurseM from '../assets/icons/manNurse.svg';
import doctorM from '../assets/icons/manDoctor.svg';
import doctorW from '../assets/icons/womanDoctor.svg'
import hospital from '../assets/icons/hospital.svg'
import logo from '../assets/logo.svg'

const AuthPage = () => {
  return (
    <div className='relative w-screen mx-auto h-screen bg-myCustomColor-primaryC pt-56'> {/* Ajout de w-full */}
        <h1 className='text-center text-2xl text-white font-bold flex justify-center items-center gap-2'>Bienvenue sur <img src={logo} alt="Logo" /></h1>
        <h2 className='text-center font-semibold text-xl px-24 mt-7 mb-20 text-white'>
            Toujours là pour veiller sur vous.
        </h2>

        <div className="flex flex-col gap-7 justify-center items-center">
             <p className='px-7 text-2xl py-2 bg-white rounded-md text-myCustomColor-primaryC'><a href="/">Connexion</a></p>
            <p><a href="/" className='px-7 text-2xl py-2 bg-white rounded-md text-myCustomColor-primaryC'>Inscription</a></p>
        </div>
       

        <div className='flex flex-row justify-center items-center w-full gap-5 absolute bottom-16 '>
            <img src={doctorM} alt="" />
            <img src={doctorW} alt="" />
            <img src={nurseW} alt="" />  
            <img src={nurseM} alt="" />
            <img src={hospital} alt="" />
        </div>
        <div className="w-screen bg-white h-8 absolute bottom-0"></div>
    </div>
  )
}

export default AuthPage

