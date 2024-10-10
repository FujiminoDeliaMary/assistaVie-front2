import React from 'react';
import { ArrowLeft, Bell, ChevronRight, Eye, HeartPulse, LogOut, Pencil, User } from 'lucide-react';
import { useNavigate } from 'react-router';

const ParamPage = () => {
    const navigate = useNavigate();
  return (
    <div className='h-screen px-8 py-10 '>
        <div className='flex gap-2 items-center text-myCustomColor-primaryC' onClick={()=>navigate(-1)}>
            <ArrowLeft />
            <p>Revenir en arrière</p>
        </div>

        <h1 className='text-2xl font-bold my-10'>Paramètres</h1>

        <section className='flex flex-col gap-5 font-medium'>
            <h2 className='text-lg font-semibold text-myCustomColor-primaryC'>Compte</h2>

            <div className='flex justify-between items-center'>
                <div className='flex gap-3 justify-center items-center'>
                     <User />
                     <p>Profil et informations personnelles.</p>
                </div>
                <Pencil className="text-myCustomColor-primaryC"/>

            </div>

            <div className='flex justify-between items-center'>
                <div className='flex gap-3 justify-center items-center'>
                    <HeartPulse />
                    <p>Santé et suivi médical</p>
                </div>
                <Pencil className="text-myCustomColor-primaryC"/>

            </div>

            <div className='flex justify-between items-center'>
                <div className='flex gap-3 justify-center items-center'>
                    <Bell />
                    <p>Notifications et rappels.</p>
                </div>
                <Pencil className="text-myCustomColor-primaryC"/>

            </div>

            <div className='flex justify-between items-center'>
                <div className='flex gap-3 justify-center items-center'>
                    <Eye />
                    <p>Accessibilité.</p>
                </div>
                <Pencil className="text-myCustomColor-primaryC"/>

            </div>

            <div className='flex justify-between items-center'>
                <div className='flex gap-3 justify-center items-center'>
                     <User />
                     <p>Assistance et support</p>
                </div>
                <Pencil className="text-myCustomColor-primaryC"/>

            </div>

            <div className='flex justify-between items-center'>
                <div className='flex gap-3 justify-center items-center'>
                     <User />
                     <p>Paramètres du bouton SOS</p>
                </div>
                <Pencil className="text-myCustomColor-primaryC"/>

            </div>
        </section>
       
        <section className='flex flex-col gap-5 mt-10 mb-12 font-medium'>
            <h2 className='text-lg font-semibold text-myCustomColor-primaryC'>Confidentialité</h2>

            <div className='flex justify-between items-center'>
                  <p>Mes préférences</p>
                <Pencil className="text-myCustomColor-primaryC"/>
            </div>

            <div className='flex justify-between items-center'>
                <p>Informations légales</p>
                <ChevronRight className="text-myCustomColor-primaryC"/>

            </div>

            <div className='flex justify-between items-center text-myCustomColor-sosC'>
                <p>Supprimer le compte</p>
                <ChevronRight />
            </div>


        </section>

        <div className='flex gap-3 items-center text-white bg-myCustomColor-sosC px-3 py-2' onClick={navigate('/')}>
            <LogOut />
            <p>Déconnexion</p>
        </div>
    </div>
  )
}

export default ParamPage