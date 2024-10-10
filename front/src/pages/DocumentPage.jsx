import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router';

const DocumentPage = () => {
  const navigate = useNavigate();
  return (
    
    <div className='h-screen px-8 py-10'>
        <div className='flex gap-2 items-center bg-myCustomColor-primaryC' onClick={()=>navigate(-1)}>
          <ArrowLeft />
          <p>Revenir en arrière</p>
        </div>

        <h1 className='text-2xl font-bold my-10'>Documents</h1>

        <div className='flex items-center px-3 gap-6 rounded-md border-2 border-myCustomColor-primaryC bg-myCustomColor-bleuC mt-8 font-bold my-3 py-4'>
          <p className='text-myCustomColor-primaryC rounded-full px-2 font-bold border-2 border-myCustomColor-primaryC bg-white'>0</p>
          <p>Ordonnances et Médicaments</p>
        </div>

        <div className='flex items-center px-3 gap-6 rounded-md border-2 border-myCustomColor-primaryC bg-myCustomColor-bleuC mt-7 font-bold my-3 py-4'>
          <p className='text-myCustomColor-primaryC rounded-full px-2 font-bold border-2 border-myCustomColor-primaryC bg-white'>0</p>
          <p>Bilans et analyse de santé</p>
        </div>

        <div className='flex items-center px-3 gap-6 rounded-md border-2 border-myCustomColor-primaryC bg-myCustomColor-bleuC mt-7 font-bold my-3 py-4'>
          <p className='text-myCustomColor-primaryC rounded-full px-2 font-bold border-2 border-myCustomColor-primaryC bg-white'>0</p>
          <p>Comptes-rendus médicaux</p>
        </div>

        <div className='flex  items-center px-3 gap-6 rounded-md border-2 border-myCustomColor-primaryC bg-myCustomColor-bleuC mt-7 font-bold my-3 py-4'>
          <p className='text-myCustomColor-primaryC rounded-full px-2 font-bold border-2 border-myCustomColor-primaryC bg-white'>0</p>
          <p>Documents administratifs et certificats</p>
        </div>

        <div className='flex  items-center px-3 gap-6 rounded-md border-2 border-myCustomColor-primaryC bg-myCustomColor-bleuC mt-7 font-bold my-3 py-4'>
          <p className='text-myCustomColor-primaryC rounded-full px-2 font-bold border-2 border-myCustomColor-primaryC bg-white'>0</p>
          <p>Plans de traitement et rééducation</p>
        </div>
    </div>
  )
}

export default DocumentPage